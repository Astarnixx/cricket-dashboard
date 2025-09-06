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
<img width="1130" height="615" alt="Screenshot 2025-09-06 at 9 57 03 PM" src="https://github.com/user-attachments/assets/85315397-f3a1-4df0-bdbc-42cf755ce8b5" />
<img width="1130" height="615" alt="Screenshot 2025-09-06 at 9 58 16 PM" src="https://github.com/user-attachments/assets/287598e6-61ad-4ee3-86d0-1c1a0012efd6" />
<img width="1130" height="615" alt="Screenshot 2025-09-06 at 9 58 54 PM" src="https://github.com/user-attachments/assets/88bf57de-4026-4801-a69b-435f59b3ace6" />
<img width="1130" height="617" alt="Screenshot 2025-09-06 at 9 59 30 PM" src="https://github.com/user-attachments/assets/53ff4f9a-3a1e-455f-8203-a7b55dd8fd17" />
<img width="1130" height="617" alt="Screenshot 2025-09-06 at 10 00 38 PM" src="https://github.com/user-attachments/assets/156df45c-1559-4fa2-bc13-9d35bf88dbc2" />


