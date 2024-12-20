export default function decorate(block) {
  const h1 = block.querySelector('h1');
  const img = block.querySelector('img');

  // mj-hero has an issue with outlook in mode='fluid-height' https://github.com/mjmlio/mjml/issues/1253
  // the recommendation is to use a section instead
  // the 2nd column is used to give the section a min-height

  return `
    <mj-wrapper padding-bottom="0">
        <mj-section mj-class="mj-hero"  >
            <mj-column width="100%" align="center">
                <mj-text mj-class="mj-hero-text" padding-bottom="40px" align="center">${h1.outerHTML}</mj-text>
                <mj-image mj-class="mj-hero-logo" align="center" src="${img.src}" />
                <mj-text  mj-class="mj-hero-logo-text" align="center">Illustration by <b>Giorgia Fiscaletti</b></mj-text>
            </mj-column>
        </mj-section>
        <mj-section mj-class="mj-hero-violator">
            <mj-column width="100%" align="center">
                <mj-text mj-class="mj-hero-violator-text" align="center"><b>ADOBE CONFIDENTIAL</b> FOR INTERNAL USE ONLY</mj-text>
            </mj-column>        
        </mj-section>
    </mj-wrapper>
    `;
}
