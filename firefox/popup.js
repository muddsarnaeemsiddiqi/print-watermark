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

  function sendMessageToTab(msg) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs && tabs[0];
      if (!tab || !tab.id) return;

      chrome.tabs.sendMessage(tab.id, msg, function() {
        if (!chrome.runtime.lastError) return;

        // If content script isn't ready, inject it and retry once.
        const err = chrome.runtime.lastError.message || '';
        const canRetry = err.includes('Receiving end does not exist') || err.includes('Could not establish connection');
        if (!canRetry) return;

        if (!chrome.tabs.executeScript) return;

        chrome.tabs.executeScript(tab.id, { file: 'content.js' }, function() {
          chrome.tabs.sendMessage(tab.id, msg, function() {
            // ignore errors on second attempt
          });
        });
      });
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
    
    chrome.storage.local.set(settings);
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
    // Prevent auto-reapply after removing.
    showPreview.checked = false;
    chrome.storage.local.set({ showPreview: false });
    sendMessageToTab({ action: 'removeWatermark' });
  });

  chrome.storage.local.get([
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
