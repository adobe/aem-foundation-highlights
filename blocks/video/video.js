function createVideoControl(imgHeight, imgWidth) {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');

  c.height = imgHeight;
  c.width = imgWidth;

  const centerX = c.width / 2;
  const centerY = c.height / 2;

  // add a transparent gray layer
  ctx.globalAlpha = 0.4;
  const grd = ctx.createRadialGradient(centerX, centerY, 500, centerX, centerY, 900);
  grd.addColorStop(0, 'white');
  grd.addColorStop(1, 'grey');

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.globalAlpha = 1.0;

  // draw the arrow
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 15;

  const radius = 100;
  ctx.fillStyle = 'transparent';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#555';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(centerX - 35, centerY - 60);
  ctx.lineTo(centerX - 35, centerY + 60);
  ctx.lineTo(centerX + 60, centerY);
  ctx.fill();
  ctx.closePath();

  ctx.fill();

  return c.toDataURL('image/png');
}

export default function decorate(block) {
  const img = block.querySelector('img');
  const a = block.querySelector('a');

  const imgHeight = img.height;
  const imgWidth = img.width;

  const videoControlData = createVideoControl(imgHeight, imgWidth);
  return `
    <mj-raw mj-class="mj-video" >
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;margin-top:-20px">
        <tbody>
          <tr>
            <td style="padding-right:70px;padding-left:70px;width:610px;padding-bottom:40px">
              <a href="${a.href}" target="_blank" rel="noopener noreferrer">        
                <img src="${img.src}"  class="video" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:14px;" width="610" />   
                <img src="${videoControlData}" class="video-control" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:14px;position:relative;margin-top:-${(610 * imgHeight) / imgWidth}px" width="610"/>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
   
    </mj-raw>
    
  `;
}
