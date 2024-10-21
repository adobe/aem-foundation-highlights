export default async function decorate(block) {
  const [imgContainer, textContainer] = block.firstElementChild.children;
  const img = imgContainer.querySelector('img');
  const buttonContainer = textContainer.querySelector('.button-container');
  buttonContainer.remove();

  const { href: buttonHref } = buttonContainer.firstElementChild;

  return `
        <mj-section mj-class="mj-teaser-section">
            <mj-column mj-class="mj-teaser-image-column">
                <mj-image src="${img.src}"/>
            </mj-column>
            <mj-column mj-class="mj-teaser-text-column">
                <mj-text mj-class="mj-teaser-text">${textContainer.innerHTML}</mj-text>
                <mj-button mj-class="mj-teaser-button" href="${buttonHref}">
                    ${buttonContainer.firstElementChild.textContent}
                </mj-button>
            </mj-column>
        </mj-section>
    `;
}
