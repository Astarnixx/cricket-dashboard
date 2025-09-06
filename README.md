# 🏏 Cricket Analytics Dashboard

A modern cricket player analytics dashboard built with Next.js, featuring AI-powered insights and interactive data visualizations.

## Features

- **Player Search** - Find and explore cricket players
- **AI Chatbot** - Ask questions about players using Google Gemini AI
- **Data Visualizations** - Interactive animted charts for performance analysis
- **Player Comparison** - Compare multiple players side-by-side
- **Dark/Light Mode** - Toggle between themes

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Google Gemini API

## Getting Started

1. *Install dependencies*
   ```bash
   npm install
   ```

2. *Set up environment variables*
   Create a `.env.local` file and add:
   ```env
   GOOGLE_GEMINI_API_KEY=your_api_key_here
   ```

3. *Run the development server*
   ```bash
   npm run dev
   ```

4. *Open your browser*
   Go to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js pages and API routes
├── components/          # React components
│   ├── charts/         # Data visualization components
│   └── ui/             # Reusable UI components
├── data/               # Player data and statistics
└── hooks/              # Custom React hooks
```

## Deployment

Deployed on Vercel: https://cricket-dashboard-sigma.vercel.app/

