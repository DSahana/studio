import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { role, content } = message;
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="h-9 w-9 border-2 border-primary/40">
          <AvatarFallback className="bg-primary/20 text-primary">
            <Bot />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-sm md:max-w-md lg:max-w-2xl rounded-lg px-4 py-3 text-sm md:text-base shadow-md transition-all duration-300 ease-in-out',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-card text-card-foreground rounded-bl-none'
        )}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none font-body">
            {content}
        </div>
      </div>
      {isUser && (
        <Avatar className="h-9 w-9 border-2 border-secondary">
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
