export default async function decorate(block) {
  const rows = [...block.children];
  const imagesRow = rows[0];
  const pricesRow = rows[1];
  const ctasRow = rows[2];
  const height = Array.from(block.classList).includes('tall') ? 250 : 125;

  const columns = [...ctasRow.children].map((cta, i) => {
    const { href, textContent: ctaText } = cta.firstElementChild;
    const imageCell = imagesRow.children[i];
    const { src } = imageCell.querySelector('img');

    return `
            <mj-column mj-class="mj-product-columns-container${
  i === ctasRow.children.length - 1
    ? ' mj-product-columns-container-last'
    : ''
}">
                <mj-image href="${href}" mj-class="mj-product-columns-img" src="${src}"/>
                <mj-text mj-class="mj-product-columns-text"><div class="product-columns-text-wrapper" style="height: ${height}px">${
  pricesRow.children[i].innerHTML
}</div></mj-text>
                <mj-button mj-class="mj-product-columns-button" href="${href}">${ctaText}</mj-button>
            </mj-column>
        `;
  });

  return `
        <mj-section mj-class="mj-product-columns">
            ${columns.join('')}
        </mj-section>
    `;
}
