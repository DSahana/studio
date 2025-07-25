'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Home, Briefcase, CornerDownLeft } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };
  
  const handleQuickAction = (action: string) => {
    if (isLoading) return;
    onSendMessage(action);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <div className="p-4 bg-background/80 border-t backdrop-blur-sm">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-2 mb-3">
          <Button variant="outline" size="sm" className="bg-accent/10 hover:bg-accent/20" onClick={() => handleQuickAction('Directions to Home')}>
            <Home className="mr-2 h-4 w-4" /> Go Home
          </Button>
          <Button variant="outline" size="sm" className="bg-accent/10 hover:bg-accent/20" onClick={() => handleQuickAction('Directions to Work')}>
            <Briefcase className="mr-2 h-4 w-4" /> Go to Work
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask for directions, find places, or plan a route..."
            className="w-full pr-20 py-3 text-base resize-none border-2 focus-visible:ring-primary/50"
            rows={1}
            disabled={isLoading}
          />
           <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
             <TooltipProvider delayDuration={200}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 rounded-full h-9 w-9" disabled={isLoading || !input.trim()}>
                            <Send className="h-4 w-4 text-accent-foreground" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Send Message</p>
                    </TooltipContent>
                </Tooltip>
             </TooltipProvider>
            </div>
        </form>
         <p className="text-xs text-muted-foreground mt-2 text-center">
          Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">Shift</kbd> + <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">Enter</kbd> to add a new line.
        </p>
      </div>
    </div>
  );
}
