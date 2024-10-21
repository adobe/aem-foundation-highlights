import { decorateDefaultContent } from '../../scripts/functions.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  let mjml = `<mj-section mj-class="mj-column-section mj-columns-cols-${cols.length}">`;
  cols.forEach((div, index) => {
    let col = '';
    if (index === 0) {
      col = 'first';
    } else if (index === cols.length - 1) {
      col = 'last';
    }
    mjml += `
      <mj-column mj-class="mj-columns-col mj-columns-col-${index + 1} mj-columns-col-${col}">
        ${decorateDefaultContent(div)}
      </mj-column>
    `;
  });
  mjml += '</mj-section>';
  return mjml;
}
