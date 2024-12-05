import ffetch from '../../scripts/ffetch.js'

async function buildAnnouncementSummary() {
  const result = await ffetch('/query-index.json').sheet("articles").all();
  const announcementsByMonthYear = new Map();

  result.forEach((n) => {
    // Parse creationDate in DD/MM/YYYY format
    const [day, month, year] = n.creationDate.split("/").map(Number);
    const creationDate = new Date(year, month - 1, day); // JavaScript months are 0-based

    const monthName = creationDate.toLocaleString("en-US", { month: "long" });
    const monthYear = `${monthName} ${year}`;

    if (!announcementsByMonthYear.has(monthYear)) {
        announcementsByMonthYear.set(monthYear, []);
    }
    announcementsByMonthYear.get(monthYear).push(n);
  });

  // Sort announcements within each month-year group by day in descending order
  announcementsByMonthYear.forEach((announcements) => {
    announcements.sort((a, b) => {
      const [dayA, monthA, yearA] = a.creationDate.split("/").map(Number);
      const [dayB, monthB, yearB] = b.creationDate.split("/").map(Number);
      return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
    });
  });

  // Convert Map to Array and sort by month-year in descending order
  const sortedMonthYears = Array.from(announcementsByMonthYear).sort(
    (a, b) => new Date(b[0]) - new Date(a[0])
  );

  // Convert back to a Map to preserve order
  return new Map(sortedMonthYears);
}

async function renderAnnouncementList() {
  const announcementsByMonthYear = await buildAnnouncementSummary();
  let mjml = ``;

  announcementsByMonthYear.forEach((announcements, monthYear) => {
    mjml += `<mj-section padding-bottom="10px" mj-class="mj-announcement-section">
          <mj-column>
          <mj-text mj-class="mj-month-title">${monthYear}</mj-text>
    ${announcements.map((n) => {
      const authors = Array.isArray(n.authors) ? n.authors.join(', ') : n.authors;
      return `
      <mj-section mj-class="mj-card" padding-left="70px" padding-right="70px" background-color="#FFFFFF">
          <mj-column width="100%" align="left" mj-class="mj-card">
              <mj-text mj-class="mj-card-title">${n.title}</mj-text>
              <mj-text mj-class="mj-card-meta">${authors}</mj-text>
              <mj-text mj-class="mj-card-description">${n.description}</mj-text>
              <mj-text mj-class="mj-card-link">
                  <a href="${n.path}" mj-class="mj-announcement-link">Read More...</a>
              </mj-text>
          </mj-column>
      </mj-section>`;
    }).join('')}
          </mj-column>
      </mj-section>`;
  });

  return mjml;
}

export default function decorate() {
  return renderAnnouncementList();
}
