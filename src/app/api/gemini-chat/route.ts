// src/app/api/gemini-chat/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { players, Player } from '@/data/players';

// Function to extract player names from the message
function extractPlayerNames(message: string): string[] {
  const playerNames = players.map(player => player.name.toLowerCase());
  const messageWords = message.toLowerCase().split(/\s+/);
  
  const foundPlayers: string[] = [];
  
  // Check for exact matches
  for (const playerName of playerNames) {
    if (message.includes(playerName)) {
      foundPlayers.push(playerName);
    }
  }
  
  // Check for partial matches (first name or last name)
  for (const player of players) {
    const nameParts = player.name.toLowerCase().split(' ');
    for (const part of nameParts) {
      if (part.length > 2 && messageWords.includes(part)) {
        foundPlayers.push(player.name.toLowerCase());
        break;
      }
    }
  }
  
  return [...new Set(foundPlayers)]; // Remove duplicates
}

// Function to find players by name
function findPlayersByName(names: string[]): Player[] {
  return players.filter(player => 
    names.some(name => player.name.toLowerCase().includes(name))
  );
}

// Function to create rich player data context
function createPlayerContext(foundPlayers: Player[]): string {
  if (foundPlayers.length === 0) {
    return 'No specific players mentioned in the query.';
  }
  
  let context = 'Here is detailed information about the mentioned players:\n\n';
  
  foundPlayers.forEach(player => {
    context += `🏏 **${player.name}** (${player.country})\n`;
    context += `- Role: ${player.role}\n`;
    context += `- Matches: ${player.matches}\n`;
    context += `- Runs: ${player.runs.toLocaleString()}\n`;
    
    if (player.battingAvg) {
      context += `- Batting Average: ${player.battingAvg}\n`;
    }
    
    if (player.bowlingAvg) {
      context += `- Bowling Average: ${player.bowlingAvg}\n`;
    }
    
    if (player.wickets) {
      context += `- Wickets: ${player.wickets}\n`;
    }
    
    context += `\n📈 **Notable Records:**\n`;
    player.records.forEach(record => {
      context += `- ${record}\n`;
    });
    
    context += `\n **Biography:**\n${player.bio}\n\n`;
    context += '---\n\n';
  });
  
  return context;
}

export async function POST(request: NextRequest) {
  let message: string = ''; // Declare message at function scope
  
  try {
    console.log('=== Chat API Request Started ===');
    
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      return NextResponse.json({ 
        message: 'AI service is not configured. Please contact the administrator.',
        error: 'Missing API key'
      }, { status: 500 });
    }

    console.log('API Key is set:', process.env.GEMINI_API_KEY.substring(0, 10) + '...');

    const { message: requestMessage, playerContext } = await request.json();
    message = requestMessage; // Assign to the scoped variable
    console.log('Request data:', { message, playerContext });

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ 
        message: 'Please provide a valid message.',
        error: 'Invalid message format'
      }, { status: 400 });
    }

    // Extract player names and find matching players
    const playerNames = extractPlayerNames(message);
    console.log('Extracted player names:', playerNames);
    
    const foundPlayers = findPlayersByName(playerNames);
    console.log('Found players:', foundPlayers.map(p => p.name));
    
    // Create rich player context
    const playerDataContext = createPlayerContext(foundPlayers);
    console.log('Player context length:', playerDataContext.length);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Use the correct current model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log('Using gemini-1.5-flash model');

    // Enhanced prompt with detailed player data
    const prompt = `You are a cricket analytics expert. Answer questions about cricket players and statistics using the detailed player information provided below.

${playerDataContext}

User Question: "${message}"

Instructions:
1. Keep responses concise and to-the-point (2-3 sentences max)
2. Use the detailed player information above to provide accurate, specific answers
3. If the question is about a player mentioned above, reference their key statistics and achievements
4. If comparing players, use the provided data to make brief, informed comparisons
5. If asked about records or achievements, cite the specific records listed above
6. Stay friendly and conversational but be direct
7. Always be accurate and cite specific numbers/records when available
8. Avoid lengthy explanations unless specifically asked for details

Please provide a brief, helpful answer based on the player data and user question.`;

    console.log('Sending prompt to Gemini:', prompt.substring(0, 200) + '...');

    const result = await model.generateContent(prompt);
    console.log('Got result from Gemini');
    
    const response = await result.response;
    console.log('Got response from Gemini');
    
    const text = response.text();
    console.log('Extracted text from response:', text.substring(0, 100) + '...');

    if (!text) {
      throw new Error('Empty response from AI model');
    }

    console.log('=== Chat API Request Completed Successfully ===');
    return NextResponse.json({ 
      message: text,
      timestamp: new Date().toISOString(),
      playersFound: foundPlayers.map(p => p.name)
    });

  } catch (error) {
    console.error('=== Chat API Error ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    console.error('Full error object:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('authentication')) {
        return NextResponse.json({ 
          message: 'AI service authentication failed. Please check the API key configuration.',
          error: 'Authentication error'
        }, { status: 401 });
      }
      
      if (error.message.includes('quota') || error.message.includes('limit') || error.message.includes('exceeded')) {
        return NextResponse.json({ 
          message: 'AI service is temporarily unavailable due to usage limits. Please try again later.',
          error: 'Rate limit exceeded'
        }, { status: 429 });
      }

      if (error.message.includes('network') || error.message.includes('fetch')) {
        return NextResponse.json({ 
          message: 'Network error occurred. Please check your internet connection and try again.',
          error: 'Network error'
        }, { status: 503 });
      }
    }

    // Enhanced fallback response with player data
    const playerNames = extractPlayerNames(message);
    const foundPlayers = findPlayersByName(playerNames);
    
    let fallbackResponse = `I'm a cricket analytics expert, but I'm currently experiencing technical difficulties. 

However, I can still help you with cricket information! Here are some general cricket facts:

🏏 **Cricket Basics:**
- Cricket is played between two teams of 11 players each
- The game has three main formats: Test (5 days), ODI (50 overs), and T20 (20 overs)
- Runs are scored by hitting the ball and running between wickets

📊 **Key Statistics:**
- Batting Average: Total runs divided by times dismissed
- Bowling Average: Runs conceded per wicket taken
- Strike Rate: Runs per 100 balls faced (batting) or balls per wicket (bowling)`;

    if (foundPlayers.length > 0) {
      fallbackResponse += `\n\n🎯 **Players I found in your question:**\n`;
      foundPlayers.forEach(player => {
        fallbackResponse += `\n**${player.name}** (${player.country})\n`;
        fallbackResponse += `- Role: ${player.role}\n`;
        fallbackResponse += `- Runs: ${player.runs.toLocaleString()}\n`;
        if (player.battingAvg) fallbackResponse += `- Batting Average: ${player.battingAvg}\n`;
        if (player.bowlingAvg) fallbackResponse += `- Bowling Average: ${player.bowlingAvg}\n`;
        fallbackResponse += `- Notable Record: ${player.records[0]}\n`;
      });
    }

    fallbackResponse += `\n\nPlease try again in a few moments, or contact support if the issue persists.`;

    return NextResponse.json({ 
      message: fallbackResponse,
      error: 'AI service temporarily unavailable',
      fallback: true,
      playersFound: foundPlayers.map(p => p.name)
    }, { status: 200 }); // Return 200 with fallback content
  }
}