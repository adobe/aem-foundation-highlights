export default function decorate(block) {
  const h1 = block.querySelector('h1');

  // mj-hero has an issue with outlook in mode='fluid-height' https://github.com/mjmlio/mjml/issues/1253
  // the recommendation is to use a section instead
  // the 2nd column is used to give the section a min-height

  const logoUrl = new window.URL(`${window.hlx.codeBasePath}/icons/adobe-red.png`, window.location.href);

  return `
    <mj-wrapper padding-bottom="0">
        <mj-section mj-class="mj-hero"  >
            <mj-column width="100%" align="left">
                <mj-image mj-class="mj-hero-logo" align="left" src="${logoUrl}" />
                <mj-text  mj-class="mj-hero-text">${h1.outerHTML}</mj-text>
            </mj-column>
            <mj-column width="0%">
                <mj-spacer mj-class="mj-hero-min-height" />
            </mj-column>        
        </mj-section>
        <mj-section mj-class="mj-hero-violator">
            <mj-column width="100%" align="left">
                <mj-text mj-class="mj-hero-violator-text"><b>ADOBE CONFIDENTIAL</b> FOR INTERNAL USE ONLY</mj-text>
            </mj-column>        
        </mj-section>
    </mj-wrapper>
    `;
}
