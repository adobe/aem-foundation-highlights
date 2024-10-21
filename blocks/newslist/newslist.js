import ffetch from '../../scripts/ffetch.js';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function buildNewsletterSummary() {
  const result = await ffetch('/query-index.json').all();
  const newslettersByYear = new Map();

  // Reduce the fetched data into a structured Map grouped by year.
  result.forEach((n) => {
    const yearMatch = n.path.match(/^\/(\d{4})\//);
    if (yearMatch) {
      const year = yearMatch[1];
      if (!newslettersByYear.has(year)) {
        newslettersByYear.set(year, []);
      }
      newslettersByYear.get(year).push(n);
    }
  });

  // Sort newsletters within each year by month in descending order.
  newslettersByYear.forEach((newsletters) => {
    newsletters.sort((a, b) => {
      const monthNames = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
      ];
      const aMonth = monthNames.indexOf(a.path.split('/')[2].toLowerCase());
      const bMonth = monthNames.indexOf(b.path.split('/')[2].toLowerCase());
      return bMonth - aMonth;
    });
  });

  // Convert Map to Array and sort by year in descending order
  const sortedYears = Array.from(newslettersByYear).sort(
    (a, b) => parseInt(b[0], 10) - parseInt(a[0], 10),
  );

  // Convert back to a Map to preserve order
  return new Map(sortedYears);
}

async function renderNewsletterList() {
  const newslettersByYear = await buildNewsletterSummary();
  let mjml = `<mj-section mj-class="mj-newsletter-header">
      <mj-column>
          <mj-text mj-class="mj-header-title">Latest Updates from Our Team</mj-text>
      </mj-column>
      </mj-section>`;

  newslettersByYear.forEach((newsletters, year) => {
    mjml += `<mj-section mj-class="mj-newsletter-section">
          <mj-column>
          <mj-text mj-class="mj-newsletter-title">${year}</mj-text>
    ${newsletters.map((n) => {
    const monthName = n.path.split('/')[2];
    return `
      <mj-text mj-class="mj-newsletter-item">
          <a href="${n.path}" target="_blank" mj-class="mj-newsletter-link">
          ${capitalize(monthName)} ${year}
          </a>
      </mj-text>`;
  }).join('<mj-spacer height="10px"/>')}
          </mj-column>
      </mj-section>`;
  });

  return mjml;
}

export default function decorate() {
  return renderNewsletterList();
}
