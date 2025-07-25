// Summarizes a user's navigation history to identify frequently visited locations and optimize routes.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NavigationHistorySchema = z.array(
  z.object({
    timestamp: z.string().describe('The timestamp of the navigation event.'),
    location: z.string().describe('The location visited during navigation.'),
  })
);

export type NavigationHistory = z.infer<typeof NavigationHistorySchema>;

const NavigationSummarySchema = z.object({
  summary: z.string().describe('A summary of the user\'s navigation history, highlighting frequently visited locations and potential route optimizations.'),
});

export type NavigationSummary = z.infer<typeof NavigationSummarySchema>;

export async function summarizeNavigationHistory(history: NavigationHistory): Promise<NavigationSummary> {
  return summarizeNavigationHistoryFlow(history);
}

const prompt = ai.definePrompt({
  name: 'navigationHistoryPrompt',
  input: {schema: NavigationHistorySchema},
  output: {schema: NavigationSummarySchema},
  prompt: `You are an AI assistant designed to summarize a user's navigation history.

  Analyze the provided navigation history and identify frequently visited locations, common routes, and potential areas for route optimization.

  Navigation History:
  {{#each this}}
  - Timestamp: {{timestamp}}, Location: {{location}}
  {{/each}}

  Provide a concise summary that highlights the key patterns and insights from the user's navigation history.
  `,
});

const summarizeNavigationHistoryFlow = ai.defineFlow(
  {
    name: 'summarizeNavigationHistoryFlow',
    inputSchema: NavigationHistorySchema,
    outputSchema: NavigationSummarySchema,
  },
  async history => {
    const {output} = await prompt(history);
    return output!;
  }
);
