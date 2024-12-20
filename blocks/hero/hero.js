export default function decorate (block) {
  const h1 = block.querySelector('h1')
  const img = block.querySelector('img')

  // get all paragraphs inside, except the first one
  const paragraphs = [...block.querySelectorAll('p')].slice(1).map(p => {
    return `<mj-text mj-class="mj-hero-violator-text" align="center">${p.innerHTML}</mj-text>`
  })

  // mj-hero has an issue with outlook in mode='fluid-height' https://github.com/mjmlio/mjml/issues/1253
  // the recommendation is to use a section instead
  // the 2nd column is used to give the section a min-height

  // if the h1 includes "AEM Cloud Infrastructure Blog" the max-width is set to 600px, otherwise it's 800px
  // this is to make sure the h1 doesn't get too wide
  let max_width = '650px'
  if (h1.textContent.includes('AEM Cloud Infrastructure Blog')) {
    max_width = '500px'
  }

  if (!img) {
    return `
    <mj-wrapper padding-bottom="0">
        <mj-section mj-class="mj-hero"  >
            <mj-column width="100%" align="center">
                <mj-text mj-class="mj-hero-text" padding-bottom="40px" align="center">${
                  h1.outerHTML
                }</mj-text>
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
                <mj-text mj-class="mj-hero-text" padding-bottom="40px" align="center">${
                  h1.outerHTML
                }</mj-text>
                <mj-image mj-class="mj-hero-logo" width="${max_width}" align="center" src="${
    img.src
  }" />
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
