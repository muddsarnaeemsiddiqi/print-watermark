document.addEventListener('DOMContentLoaded', function() {
  const watermarkInput = document.getElementById('watermarkText');
  const fontFamily = document.getElementById('fontFamily');
  const fontSize = document.getElementById('fontSize');
  const fontColor = document.getElementById('fontColor');
  const opacity = document.getElementById('opacity');
  const posX = document.getElementById('posX');
  const posY = document.getElementById('posY');
  const rotation = document.getElementById('rotation');
  const spacing = document.getElementById('spacing');
  const layout = document.getElementById('layout');
  const showPreview = document.getElementById('showPreview');
  const previewBtn = document.getElementById('previewBtn');
  const printBtn = document.getElementById('printBtn');
  const resetBtn = document.getElementById('resetBtn');

  const defaultSettings = {
    watermarkText: 'WATERMARK',
    fontFamily: 'Arial, sans-serif',
    fontSize: '48px',
    fontColor: '#808080',
    opacity: '0.3',
    posX: '50',
    posY: '50',
    rotation: '-45',
    spacing: '100px',
    layout: 'tiled',
    showPreview: false
  };

  function sendMessageToTab(msg) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
          if (chrome.runtime.lastError) {
            console.log('Error:', chrome.runtime.lastError.message);
          }
        });
      }
    });
  }

  function applyWatermark(showOnScreen) {
    const text = watermarkInput.value || 'WATERMARK';
    const settings = {
      watermarkText: text,
      fontFamily: fontFamily.value,
      fontSize: fontSize.value,
      fontColor: fontColor.value,
      opacity: opacity.value,
      posX: posX.value,
      posY: posY.value,
      rotation: rotation.value,
      spacing: spacing.value,
      layout: layout.value,
      showPreview: showOnScreen
    };
    
    chrome.storage.sync.set(settings);
    sendMessageToTab({ action: 'applyWatermark', ...settings });
  }

  fontColor.addEventListener('change', function() {
    applyWatermark(showPreview.checked);
  });

  watermarkInput.addEventListener('input', function() {
    applyWatermark(showPreview.checked);
  });

  fontFamily.addEventListener('change', function() {
    applyWatermark(showPreview.checked);
  });

  fontSize.addEventListener('change', function() {
    applyWatermark(showPreview.checked);
  });

  opacity.addEventListener('change', function() {
    applyWatermark(showPreview.checked);
  });

  posX.addEventListener('input', function() {
    applyWatermark(showPreview.checked);
  });

  posY.addEventListener('input', function() {
    applyWatermark(showPreview.checked);
  });

  rotation.addEventListener('input', function() {
    applyWatermark(showPreview.checked);
  });

  spacing.addEventListener('change', function() {
    applyWatermark(showPreview.checked);
  });

  layout.addEventListener('change', function() {
    applyWatermark(showPreview.checked);
  });

  showPreview.addEventListener('change', function() {
    applyWatermark(showPreview.checked);
  });

  previewBtn.addEventListener('click', function() {
    applyWatermark(showPreview.checked);
  });

  printBtn.addEventListener('click', function() {
    applyWatermark(true);
    setTimeout(function() {
      sendMessageToTab({ action: 'print' });
    }, 100);
  });

  resetBtn.addEventListener('click', function() {
    alert('Removing watermark...');
    sendMessageToTab({ action: 'removeWatermark' });
  });

  chrome.storage.sync.get([
    'watermarkText', 'fontFamily', 'fontSize', 'fontColor', 'opacity',
    'posX', 'posY', 'rotation', 'spacing', 'layout', 'showPreview'
  ], function(result) {
    if (result.watermarkText) watermarkInput.value = result.watermarkText;
    if (result.fontFamily) fontFamily.value = result.fontFamily;
    if (result.fontSize) fontSize.value = result.fontSize;
    if (result.fontColor) fontColor.value = result.fontColor;
    if (result.opacity) opacity.value = result.opacity;
    if (result.posX) posX.value = result.posX;
    if (result.posY) posY.value = result.posY;
    if (result.rotation) rotation.value = result.rotation;
    if (result.spacing) spacing.value = result.spacing;
    if (result.layout) layout.value = result.layout;
    if (result.showPreview) showPreview.checked = result.showPreview;
  });
});
