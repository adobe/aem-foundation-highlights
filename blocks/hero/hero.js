export default function decorate (block) {
  const img = block.querySelector('img')

  // get all paragraphs inside, except the first one
  const paragraphs = [...block.querySelectorAll('p')].slice(1).map(p => {
    return `<mj-text mj-class="mj-hero-violator-text" align="center">${p.innerHTML}</mj-text>`
  })

  // mj-hero has an issue with outlook in mode='fluid-height' https://github.com/mjmlio/mjml/issues/1253
  // the recommendation is to use a section instead
  // the 2nd column is used to give the section a min-height

  if (!img) {
    return `
    <mj-wrapper padding-bottom="0">
        <mj-section mj-class="mj-hero"  >
            <mj-column width="100%" align="center">
                <mj-text mj-class="mj-hero-text" align="center" font-weight="lighter">
                    <div class="header-h1">Scaling the Skyline</div>
                </mj-text>
                <mj-text mj-class="mj-hero-text" align="center" font-weight="bold">
                    <div class="header-h2" font-weight="bold">AEM Cloud Services Journal</div> 
                </mj-text>
            </mj-column>
        </mj-section>
        <mj-section mj-class="mj-hero-violator">
            <mj-column width="100%" align="center">
                ${paragraphs.join('')}
            </mj-column>        
        </mj-section>
    </mj-wrapper>
    `
  }

  return `
    <mj-wrapper padding-bottom="0">
        <mj-section mj-class="mj-hero"  >
            <mj-column width="100%" align="center">
                <mj-text mj-class="mj-hero-text" align="center" font-weight="lighter">
                    <div class="header-h1">Scaling the Skyline</div>
                </mj-text>
                <mj-text mj-class="mj-hero-text" align="center" font-weight="bold">
                    <div class="header-h2" font-weight="bold">AEM Cloud Services Journal</div> 
                </mj-text>
                <mj-image mj-class="mj-hero-logo" width="550px" align="center" src="${
    img.src
  }" alt="AEM Cloud Logo"
    border="0"
    padding="0"
    style="display: block; outline: none; text-decoration: none; max-width: 100%; height: auto; background: white;"
    />
            </mj-column>
        </mj-section>
        <mj-section mj-class="mj-hero-violator">
            <mj-column width="100%" align="center">
                ${paragraphs.join('')}
            </mj-column>        
        </mj-section>
    </mj-wrapper>
    `
}
