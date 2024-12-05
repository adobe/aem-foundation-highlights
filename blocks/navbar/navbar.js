export default async function decorate(block) {
  const container = block.closest('.navbar-container');
  const img = container.querySelector('img');

  // Collect navigation items
  const navigationItems = [...block.querySelectorAll('div[data-valign="middle"] > a')]
    .map((link) => {
      const { href, textContent } = link;
      return `<mj-navbar-link href="${href}" target="_self">${textContent}</mj-navbar-link>`;
    });

  return `
        <mj-section mj-class="mj-navbar-container">
            <mj-column mj-class="mj-navbar-column">
                <mj-image mj-class="mj-navbar-logo" src="${img.src}" />
                <mj-navbar hamburger="none">
                    ${navigationItems.join('')}
                </mj-navbar>
            </mj-column>
        </mj-section>
    `;
}
