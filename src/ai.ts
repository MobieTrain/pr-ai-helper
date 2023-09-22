import * as core from '@actions/core';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: core.getInput('open-ai-key', { required: true }),
});

export const getDescription = async (prompt: string, diff: string) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }, { role: "user", content: diff }],
    model: "gpt-3.5-turbo",
  });
  return chatCompletion.choices[0].message.content;
};