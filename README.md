# Print Watermark

Add customizable diagonal watermarks to any webpage before printing.

## Features

- Custom watermark text
- 6 fonts (Arial, Times New Roman, Courier, Georgia, Verdana, Impact)
- Multiple colors
- Adjustable font size
- Position control (X/Y coordinates)
- Rotation angle (-180° to 180°)
- Tiled or single layout
- Preview on screen
- Settings auto-save

## Installation

### Chrome

1. Download or clone this repository
2. Open Chrome → Menu → Extensions → Manage Extensions
3. Enable **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the repository folder (the one that contains `manifest.json`)

### Firefox

The Firefox version lives in `firefox/`.

Temporary install (for testing):

1. Open Firefox and go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on...**
3. Select `firefox/manifest.json`

Publish to AMO (Firefox Add-ons):

1. Zip the contents of the `firefox/` folder (so the ZIP root contains `manifest.json`)
2. Upload the ZIP to https://addons.mozilla.org/developers/

## Usage

1. Click the extension icon in your browser toolbar
2. Enter watermark text (e.g., "CONFIDENTIAL")
3. Customize font, color, size, position, rotation
4. Check "Show on screen" to preview
5. Click "Apply Watermark" or "Print with Watermark"

## License

MIT License
