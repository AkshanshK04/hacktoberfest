const OpenAI = require("openai");

const ROAST_PROMPTS = {
  mild: "You are a friendly code reviewer who gives light-hearted, gentle jokes about code quality while being helpful.",
  medium: "You are a savage but helpful code reviewer. Roast the code like a comedian — be funny, use emojis, point out bad practices dramatically, but always end with actual improvement tips.",
  savage: "You are an EXTREMELY savage code roaster. Tear this code apart like a comedy roast. Be brutal, funny, use memes and emojis 💀🔥. Make the developer feel the pain but give real fixes at the end.",
};

async function roastCode(code, apiKey, level = "medium") {
  const client = new OpenAI({ apiKey });

  const systemPrompt = ROAST_PROMPTS[level] || ROAST_PROMPTS.medium;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Roast this code:\n\n\`\`\`\n${code}\n\`\`\``,
      },
    ],
    max_tokens: 500,
  });

  return response.choices[0].message.content;
}

module.exports = { roastCode };
