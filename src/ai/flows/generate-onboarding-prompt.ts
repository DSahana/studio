'use server';

/**
 * @fileOverview Generates an onboarding prompt for new users to guide them on how to effectively use the AskAtlas app for navigation.
 *
 * - generateOnboardingPrompt - A function that generates the onboarding prompt.
 * - GenerateOnboardingPromptInput - The input type for the generateOnboardingPrompt function (currently empty).
 * - GenerateOnboardingPromptOutput - The return type for the generateOnboardingPrompt function (the onboarding prompt string).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOnboardingPromptInputSchema = z.object({});
export type GenerateOnboardingPromptInput = z.infer<typeof GenerateOnboardingPromptInputSchema>;

const GenerateOnboardingPromptOutputSchema = z.object({
  onboardingPrompt: z.string().describe('A prompt to guide new users on how to use the app.'),
});
export type GenerateOnboardingPromptOutput = z.infer<typeof GenerateOnboardingPromptOutputSchema>;

export async function generateOnboardingPrompt(
  input: GenerateOnboardingPromptInput
): Promise<GenerateOnboardingPromptOutput> {
  return generateOnboardingPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOnboardingPromptPrompt',
  input: {schema: GenerateOnboardingPromptInputSchema},
  output: {schema: GenerateOnboardingPromptOutputSchema},
  prompt: `You are an onboarding assistant for a navigation application called AskAtlas.

  Generate a concise and helpful onboarding prompt (maximum 100 words) to guide new users on how to effectively use the app for navigation. Explain that users can ask for directions, find places, and plan routes using natural language.  Also, tell them about the quick action buttons for common tasks like 'Go Home' and 'Go to Work' and that they can set their home and work addresses in account settings.

  Onboarding Prompt:`,
});

const generateOnboardingPromptFlow = ai.defineFlow(
  {
    name: 'generateOnboardingPromptFlow',
    inputSchema: GenerateOnboardingPromptInputSchema,
    outputSchema: GenerateOnboardingPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
