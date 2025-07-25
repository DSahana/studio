'use client';

import { useState, useEffect, useRef } from 'react';
import type { Message } from '@/lib/types';
import AppHeader from '@/components/layout/app-header';
import { ChatMessage } from '@/components/chat/chat-message';
import { ChatInput } from '@/components/chat/chat-input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateOnboardingPrompt } from '@/ai/flows/generate-onboarding-prompt';
import { Skeleton } from '@/components/ui/skeleton';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOnboarding = async () => {
      try {
        const { onboardingPrompt } = await generateOnboardingPrompt({});
        setMessages([
          {
            id: 'onboarding-1',
            role: 'assistant',
            content: onboardingPrompt,
          },
        ]);
      } catch (error) {
        console.error('Failed to generate onboarding prompt:', error);
        setMessages([
          {
            id: 'error-1',
            role: 'assistant',
            content: 'Welcome to AskAtlas! How can I help you navigate today?',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOnboarding();
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  

  const handleSendMessage = async (userInput: string) => {
    setIsLoading(true);
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userInput,
    };

    const loadingMessage: Message = {
        id: `assistant-loading-${Date.now()}`,
        role: 'assistant',
        content: <div className="flex items-center space-x-2">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-2 w-2 rounded-full" />
        </div>,
    }

    setMessages((prev) => [...prev, newUserMessage, loadingMessage]);

    // Simulate AI response
    setTimeout(() => {
        const aiResponse: Message = {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: `I've received your request: "${userInput}". The AI navigation tools are currently under development. Thanks for using AskAtlas!`,
          };
      setMessages((prev) => [...prev.slice(0, -1), aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-muted/30">
      <AppHeader />
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="max-w-3xl mx-auto p-4 md:p-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
