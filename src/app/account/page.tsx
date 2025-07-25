'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Home, Briefcase, Save, User, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const accountFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  homeAddress: z.string().min(5, {
    message: 'Home address must be at least 5 characters.',
  }).optional().or(z.literal('')),
  workAddress: z.string().min(5, {
    message: 'Work address must be at least 5 characters.',
  }).optional().or(z.literal('')),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// In a real app, these default values would be populated from your auth provider.
const defaultValues: Partial<AccountFormValues> = {
  name: 'Guest User',
  email: 'guest@example.com',
  homeAddress: '',
  workAddress: '',
};

export default function AccountPage() {
  const { toast } = useToast();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    toast({
      title: 'Settings Saved!',
      description: 'Your account settings have been updated.',
    });
    console.log(data);
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="flex h-16 items-center border-b bg-background/80 px-4 md:px-6 backdrop-blur-sm sticky top-0 z-10">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="font-headline text-xl font-semibold ml-4">Account Settings</h1>
      </header>

      <main className="flex justify-center p-4 md:p-8">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Account Information</CardTitle>
            <CardDescription>
              Manage your account and personalized navigation settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-base">
                        <User className="mr-2 h-5 w-5 text-primary" />
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-base">
                        <Mail className="mr-2 h-5 w-5 text-primary" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} readOnly />
                      </FormControl>
                      <FormDescription>
                        Your email address is linked to your sign-in provider and cannot be changed here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="homeAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-base">
                        <Home className="mr-2 h-5 w-5 text-primary" />
                        Home Address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 123 Main St, Anytown, USA" {...field} />
                      </FormControl>
                      <FormDescription>
                        Used for the 'Go Home' quick action.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-base">
                        <Briefcase className="mr-2 h-5 w-5 text-primary" />
                        Work Address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 456 Business Ave, Workville, USA" {...field} />
                      </FormControl>
                      <FormDescription>
                        Used for the 'Go to Work' quick action.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
