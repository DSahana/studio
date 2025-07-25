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
import { ArrowLeft, Home, Briefcase, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const accountFormSchema = z.object({
  homeAddress: z.string().min(5, {
    message: 'Home address must be at least 5 characters.',
  }).optional().or(z.literal('')),
  workAddress: z.string().min(5, {
    message: 'Work address must be at least 5 characters.',
  }).optional().or(z.literal('')),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
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
      description: 'Your home and work addresses have been updated.',
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
            <CardTitle className="font-headline">Personalized Navigation</CardTitle>
            <CardDescription>
              Set your home and work addresses for faster navigation with quick actions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
