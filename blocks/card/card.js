export default function decorate(block) {
  return `
        <mj-section mj-class="mj-card"  padding-left="70px" padding-right="70px" background-color="#FFFFFF"   >
            <mj-column width="100%" align="left" mj-class="mj-card">
            <mj-text>${block.innerHTML}</mj-text>
            </mj-column>   
        </mj-section>
      `;
}
