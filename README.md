# COBIT Governance System Design Tool

A React-based application for designing and analyzing COBIT governance systems with AI assistance.

## Features

- Multi-step design process for COBIT governance systems
- AI-powered analysis and recommendations
- Interactive visualizations and charts
- Real-time calculations and assessments

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to your GitHub repository settings:
   - Navigate to **Settings** → **Pages**
   - Set **Source** to "GitHub Actions"
   - The workflow will automatically deploy when you push to the main branch

### Option 2: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. Configure GitHub Pages:
   - Go to your repository **Settings** → **Pages**
   - Set **Source** to "Deploy from a branch"
   - Select the `gh-pages` branch and `/ (root)` folder

## Live Demo

Visit: https://m-nimazuddin-akhyar.github.io/cobit-governance-system-design-tool

## Technologies Used

- React 19
- TypeScript
- Vite
- React Router DOM
- Recharts
- GitHub Pages
