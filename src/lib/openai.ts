import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY is not set. AI features will be disabled.');
}

declare global {
  // eslint-disable-next-line no-var
  var openaiClient: OpenAI | undefined;
}

export const openai = global.openaiClient || (OPENAI_API_KEY ? new OpenAI({ apiKey: OPENAI_API_KEY }) : undefined);

if (process.env.NODE_ENV !== 'production') {
  global.openaiClient = openai;
}
