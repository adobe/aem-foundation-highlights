import { readBlockConfig } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  const text = await resp.text();

  const footerBlock = new DOMParser().parseFromString(text, 'text/html');

  const paragraphs = footerBlock.getElementsByTagName('p');

  Array.from(paragraphs).reverse().forEach((p) => {
    const div = footerBlock.createElement('div');
    while (p.firstChild) {
      div.appendChild(p.firstChild);
    }
    p.replaceWith(div);
  });

  const currentYear = new Date().getFullYear(); // Get the current year
  const footerText = footerBlock.body.innerHTML.replace(
    '{copyright}',
    `© ${currentYear} Adobe. All Rights Reserved.`,
  );

  const logoUrl = new window.URL(
    `${window.hlx.codeBasePath}/icons/logo2.png`,
    window.location.href,
  );

  return `
    <mj-section mj-class="mj-footer">
        <mj-column width="100%" align="left">
            <mj-image mj-class="mj-footer-logo" align="left" src="${logoUrl}" />
            <mj-text color="#959595" font-family="Adobe Clean" font-size="11px">${footerText}</mj-text>
        </mj-column>
        <mj-column width="0%">
            <mj-spacer mj-class="mj-footer-min-height" />
        </mj-column>        
    </mj-section>
    `;
}
