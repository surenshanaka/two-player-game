# Two Player Game

A modern implementation of the Two Player Game using React and Tailwind CSS.

## Features

- Two-player game with alternating turns (Red and Yellow)
- 7×6 grid board with column-based token dropping
- Win detection for horizontal, vertical, and diagonal connections
- Visual highlighting of winning tokens
- Game status display (current turn, winner announcement)
- Responsive design

## Project Setup

### Prerequisites

- Node Js 22.14.0
- NPM

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd two-player-game
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## Building for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be available in the `dist` directory.

## Deployment

The built application can be deployed to various hosting platforms

- Netlify
- Vercel
- GitHub Pages
- Amazon S3 + CloudFront

## Future Enhancements

- Add AI opponent with difficulty levels
- Implement game history and undo feature
- Add animations for token dropping
- Include sound effects
- Add multiplayer support via WebSockets
- Save game state to localStorage