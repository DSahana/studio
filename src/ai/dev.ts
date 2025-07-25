import { config } from 'dotenv';
config();

import '@/ai/flows/generate-onboarding-prompt.ts';
import '@/ai/flows/summarize-navigation-history.ts';