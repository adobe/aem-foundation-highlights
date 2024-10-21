export default function decorate(block) {
  const links = block.querySelectorAll('li');
  links.forEach((element) => {
    element?.firstChild?.setAttribute('target', '_blank');
  });
  return `
        <mj-section padding-left="70px" padding-right="70px" background-color="#FFFFFF"   >
            <mj-column width="100%" align="left" mj-class="mj-link">
            <mj-text>${block.innerHTML}</mj-text>
            </mj-column>   
        </mj-section>
      `;
}
