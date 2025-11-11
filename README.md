# FileMaker Gallery

A modern React-based image gallery application designed specifically for FileMaker WebViewer integration. This project displays images from FileMaker container fields in a beautiful masonry layout with lightbox functionality and custom FileMaker integration.

**⚠️ Important: This gallery is designed to run within FileMaker WebViewer and requires FileMaker data. It will not work as a standalone web application without modification.**

## Features

- **Modern React Gallery**: Built with React and Vite for optimal performance
- **Masonry Layout**: Responsive grid layout that adapts to different screen sizes
- **LightGallery Integration**: Professional lightbox with zoom, thumbnails, and navigation
- **Base64 Image Support**: Displays images directly from FileMaker container fields as Base64 data
- **Custom FileMaker Actions**: Info button in lightbox toolbar for custom FileMaker script execution
- **Single File Output**: Builds to a single HTML file for easy FileMaker WebViewer integration
- **Offline Capable**: No external dependencies, works completely offline

## Prerequisites

- Node.js (version 20.11 or higher)
- FileMaker Pro (version 19.4 or higher)

## Installation

1. Clone or download the repository
2. Install the dependencies:

```bash
npm install
```

## Project Structure

The gallery application consists of several key components:

- `src/Gallery.jsx` - Main gallery component with masonry layout and lightbox
- `src/functions.jsx` - FileMaker integration functions
- `src/App.jsx` - Main application wrapper
- `src/App.css` - Gallery styling and responsive design
- `fm/fmConfig.js` - FileMaker connection configuration

## FileMaker Integration

### Data Format

The gallery expects image data from FileMaker in the following JSON format:

```json
[
  {
    "id": 1,
    "title": "Image Title",
    "fullImage": "base64-encoded-image-data",
    "alt": "Image description"
  }
]
```

### Required FileMaker Scripts

1. **`ext_data_from_fm`** - Returns image array as `imgArray` in JSON response
2. **`ext_show_nfo`** - Receives `imgId` parameter when info button is clicked

## Development

Start the development server:

```bash
npm run dev
```

This starts a local server with hot-reload. **Note: The gallery is designed to work within FileMaker WebViewer and loads data directly from FileMaker. For standalone testing, you would need to modify the data loading mechanism in `src/functions.jsx`.**

## Build and Deployment

Build the application for FileMaker:

```bash
npm run build
```

Or build and upload to FileMaker in one step:

```bash
npm run deploy-to-fm
```

This creates a single HTML file in the `dist/` folder that can be embedded in a FileMaker WebViewer.

## Features in Detail

### Masonry Layout
- Responsive grid that adapts to screen size
- Automatic image sizing and positioning
- Smooth animations and hover effects

### LightGallery Integration
- Professional lightbox with zoom functionality
- Thumbnail navigation
- Custom info button for FileMaker integration
- Keyboard navigation support

### Base64 Image Support
- Direct display of FileMaker container field data
- No external image hosting required
- Completely offline capable
- Secure image handling

### Custom FileMaker Actions
- Info button in lightbox toolbar
- Automatic passing of current image ID to FileMaker
- Seamless integration with FileMaker scripts

## Technical Details

### Single File Output
The application builds to a single HTML file using `vite-plugin-singlefile`, making it easy to embed in FileMaker WebViewer components.

### Dependencies
- **React 19** - Modern React with latest features
- **LightGallery** - Professional open-source lightbox component (license required for commercial use, see [LightGallery licensing information](https://www.lightgalleryjs.com/docs/license/))
- **react-masonry-css** - Responsive masonry layout
- **fm-gofer** - FileMaker integration library

### Browser Compatibility
The gallery works in all modern browsers and FileMaker WebViewer components (FileMaker 19.4+).

## Credits

- [fm-gofer](https://github.com/jwillinghalpern/fm-gofer) - FileMaker integration
- [LightGallery](https://www.lightgalleryjs.com/) - Lightbox functionality
- [React Masonry CSS](https://github.com/paulcollett/react-masonry-css) - Masonry layout

## License

MIT
