console.log('Print Watermark content script loaded');

let watermarkElement = null;
let watermarkStyle = null;

function createWatermark(settings) {
  console.log('Creating watermark:', settings);
  removeWatermark();
  
  if (!settings.watermarkText) return;
  
  watermarkElement = document.createElement('div');
  watermarkElement.id = 'print-watermark-overlay';
  
  const isTiled = settings.layout === 'tiled';
  const posX = settings.posX || 50;
  const posY = settings.posY || 50;
  const rotation = settings.rotation || -45;
  const spacing = settings.spacing || '100px';
  const fontColor = settings.fontColor || '#808080';
  
  if (isTiled) {
    const repeats = 50;
    for (let i = 0; i < repeats; i++) {
      const span = document.createElement('span');
      span.textContent = settings.watermarkText;
      watermarkElement.appendChild(span);
    }
  } else {
    watermarkElement.textContent = settings.watermarkText;
  }
  
  watermarkStyle = document.createElement('style');
  watermarkStyle.id = 'print-watermark-style';
  
  if (isTiled) {
    watermarkStyle.textContent = `
      #print-watermark-overlay {
        position: fixed;
        top: ${posY}%;
        left: ${posX}%;
        transform: translate(-50%, -50%) rotate(${rotation}deg);
        pointer-events: none;
        z-index: 2147483647;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        font-family: ${settings.fontFamily};
        font-size: ${settings.fontSize};
        color: ${fontColor};
        opacity: ${settings.opacity};
        text-transform: uppercase;
        letter-spacing: 15px;
        font-weight: bold;
        text-align: center;
        gap: ${spacing};
        width: 150vmax;
        height: 150vmax;
      }
      #print-watermark-overlay span {
        display: inline-block;
        min-width: 300px;
        text-align: center;
      }
      @media print {
        #print-watermark-overlay {
          display: flex !important;
        }
      }
    `;
  } else {
    watermarkStyle.textContent = `
      #print-watermark-overlay {
        position: fixed;
        top: ${posY}%;
        left: ${posX}%;
        transform: translate(-50%, -50%) rotate(${rotation}deg);
        font-family: ${settings.fontFamily};
        font-size: ${settings.fontSize};
        color: ${fontColor};
        opacity: ${settings.opacity};
        text-transform: uppercase;
        letter-spacing: 10px;
        font-weight: bold;
        white-space: nowrap;
        pointer-events: none;
        z-index: 2147483647;
        text-align: center;
        display: ${settings.showPreview ? 'block' : 'none'};
      }
      @media print {
        #print-watermark-overlay {
          display: block !important;
        }
      }
    `;
  }
  
  document.head.appendChild(watermarkStyle);
  document.body.appendChild(watermarkElement);
  console.log('Watermark created');
}

function removeWatermark() {
  if (watermarkElement) {
    watermarkElement.remove();
    watermarkElement = null;
  }
  if (watermarkStyle) {
    watermarkStyle.remove();
    watermarkStyle = null;
  }
}

function doPrint() {
  if (watermarkElement) {
    watermarkElement.style.display = '';
  }
  window.print();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Message received:', request);
  if (request.action === 'applyWatermark') {
    createWatermark({
      watermarkText: request.watermarkText,
      fontFamily: request.fontFamily,
      fontSize: request.fontSize,
      fontColor: request.fontColor,
      opacity: request.opacity,
      posX: request.posX,
      posY: request.posY,
      rotation: request.rotation,
      spacing: request.spacing,
      layout: request.layout,
      showPreview: request.showPreview
    });
  } else if (request.action === 'print') {
    doPrint();
  } else if (request.action === 'removeWatermark') {
    removeWatermark();
  }
});
