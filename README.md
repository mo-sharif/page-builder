### App Description

This app is a JSON-driven landing page builder. Users can input JSON data on the left panel, and the app will dynamically generate and display the sections on the right panel. It supports different types of sections like hero images, image-text blocks, and data from APIs. You can format the JSON input by pressing `CMD + F` (Mac) or `Ctrl + F` (Windows).

### How to Run

1. Clone the repository: `git clone https://github.com/mo-sharif/page-builder`
2. Install dependencies: `npm install` or `yarn install`
3. Start the development server: `npm run dev` or `yarn dev`
4. Open the app at `http://localhost:3000`

### Features

- Input JSON in the left panel and preview the generated sections on the right.
- Supports "hero", "image-text", and "data" section types.
- Real-time JSON validation and error handling.
- `CMD + F` (Mac) or `Ctrl + F` (Windows) hotkey to format JSON.
- Responsive design with a 50/50 split on desktop and stacked panels on mobile.

### Folder Structure

```
/components
  - DataFetch.tsx     # Component for fetching and displaying data from APIs
  - Hero.tsx          # Component for rendering a hero image section
  - ImageText.tsx     # Component for rendering an image and text section
/hooks
  - useJsonHandler.ts # Hook for handling JSON input and parsing
  - useHotkey.ts      # Hook for handling keyboard shortcuts like CMD + F
/pages
  - index.tsx         # Main landing page of the app
/types
  - sections.ts       # Type definitions for different sections
/utils
  - formatJson.ts     # Utility to format and prettify JSON input
/public               # Folder for static images and assets
```