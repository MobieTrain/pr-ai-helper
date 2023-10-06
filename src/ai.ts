import * as core from '@actions/core';
import OpenAI from "openai";
import { ChatCompletionMessageParam } from 'openai/resources/chat';

export const openai = new OpenAI({
  apiKey: core.getInput('open-ai-key', { required: true }),
});

export const getSummarizedCodeDiff = async (diffChunks: string[], systemPrompts: string[]) => {
  const summaries = await Promise.all(diffChunks.map((chunk) => openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      ...systemPrompts
        .map<ChatCompletionMessageParam>((systemPrompt) => ({ role: "system", content: systemPrompt })),
      { role: "user", content: 'Please summarize the following code diff:' },
      { role: "user", content: chunk },
    ]
  })));


  return summaries.map((summary) => summary.choices[0].message.content ?? '');
}

export const getCompletionContent = async (diffChunks: string[], systemPrompts: string[]) => {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      ...systemPrompts
        .map<ChatCompletionMessageParam>((systemPrompt) => ({ role: "system", content: systemPrompt })),
      ...diffChunks.map<ChatCompletionMessageParam>((diff) => ({ role: "user", content: diff })),
    ]
  });
  return chatCompletion.choices[0].message.content;
};