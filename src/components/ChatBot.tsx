// src/components/ChatBot.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { FiSend, FiMessageCircle, FiUser, FiZap } from 'react-icons/fi';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatProps {
  playerName: string | null;
  className?: string;
}

export default function ChatBot({ playerName, className = '' }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      console.log('Sending message to API:', { message: currentInput, playerContext: playerName });
      
      const response = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          playerContext: playerName
        })
      });

      console.log('API response status:', response.status);
      const data = await response.json();
      console.log('API response data:', data);

      if (response.ok) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message || 'No response received',
        } as Message;
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const assistantMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: `Error: ${data.message || data.error || 'Failed to get response'}`,
        } as Message;
        setMessages(prev => [...prev, assistantMessage]);
      }
   
    } catch (error: unknown) {
        console.error('Chat error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setMessages(prev => [...prev, {
          id: (Date.now() + 3).toString(),
          role: 'assistant',
          content: `Network Error: ${errorMessage}. Please check your connection and try again.`,
        } as Message]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`glass-card modern-border-radius-card h-full flex flex-col overflow-hidden ${className}`}>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 modern-scrollbar">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <FiZap className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 gradient-secondary rounded-full animate-pulse" />
              </div>
              
              <h3 className="text-2xl font-bold text-gradient mb-3">
                AI Cricket Assistant
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
                {playerName 
                  ? `Ask me anything about ${playerName}'s performance, statistics, or career!`
                  : 'Ask me anything about cricket players, statistics, or the game!'
                }
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                {playerName && (
                  <>
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 gradient-warm text-white rounded-full text-sm font-medium shadow-lg"
                    >
                      &ldquo;{playerName} stats&rdquo;
                    </motion.span>
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 gradient-cool text-white rounded-full text-sm font-medium shadow-lg"
                    >
                      &ldquo;{playerName} performance&rdquo;
                    </motion.span>
                  </>
                )}
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 glass-card text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                >
                  &ldquo;Best batsmen&rdquo;
                </motion.span>
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 glass-card text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                >
                  &ldquo;Top bowlers&rdquo;
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex gap-4 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FiMessageCircle className="w-5 h-5 text-white" />
                </div>
              )}
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'gradient-primary text-white shadow-lg'
                    : 'glass-card text-gray-900 dark:text-white shadow-lg'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </motion.div>

              {message.role === 'user' && (
                <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FiUser className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex gap-4 justify-start"
            >
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <FiMessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="glass-card rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <motion.div 
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-purple-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-pink-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">AI is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={playerName ? `Ask about ${playerName}...` : "Ask about cricket..."}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="w-full px-4 py-3 glass-card border-0 focus:ring-2 focus:ring-blue-500/20 focus:modern-shadow-glow transition-all duration-300"
              disabled={loading}
            />
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={sendMessage} 
              disabled={loading || !input.trim()}
              className="px-6 py-3 gradient-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </Card>
  );
}