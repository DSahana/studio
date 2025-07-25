'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GoogleIcon from '@/components/icons/google';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // In a real app, this would involve a call to a Firebase/Auth provider.
    // For this UI-only demo, we'll just navigate to the main page.
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-primary/20 text-primary rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            </div>
          </div>
          <CardTitle className="font-headline text-3xl">Welcome to AskAtlas</CardTitle>
          <CardDescription className="font-body text-muted-foreground pt-2">
            Your conversational navigation assistant. Sign in to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button 
              onClick={handleLogin} 
              className="w-full bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
            >
              <GoogleIcon className="mr-3" />
              Sign in with Google
            </Button>
            <Button variant="link" onClick={() => router.push('/')}>
              Continue as guest
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AskAtlas. All rights reserved.</p>
      </footer>
    </div>
  );
}
