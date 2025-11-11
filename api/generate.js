import Groq from 'groq-sdk';

export const config = {
  runtime: 'nodejs'
};

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { content, lang } = req.body || {};
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Invalid content' });
    }

    const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing GROQ_API_KEY' });
    }

    const client = new Groq({ apiKey });
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

    const rawLang = String(lang || '').toLowerCase();
    const safeLang = (['zh', 'zh-cn', 'zh-hans'].includes(rawLang))
      ? 'zh'
      : (['en', 'en-us', 'en-gb'].includes(rawLang))
      ? 'en'
      : (['jp', 'ja', 'ja-jp'].includes(rawLang))
      ? 'jp'
      : 'en';

    const systemPrompts = {
      zh: '你是专业的简历优化助手。请仅用中文输出高质量、结构清晰的简历（个人简介、技能、经历、教育）。不要使用其他语言。',
      en: 'You are a professional resume assistant. Respond strictly in English with a clear, professional resume structure (summary, skills, experience, education). Do not use other languages.',
      jp: 'あなたは履歴書最適化の専門アシスタントです。日本語のみで、明確でプロフェッショナルな履歴書構成（概要、スキル、職務経験、学歴）で出力してください。他言語は使用しないでください。',
    };
    const system = systemPrompts[safeLang];
    const userPrompt = `User-provided content:\n${content}\n`;

    const resp = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
    });

    const result = resp?.choices?.[0]?.message?.content || '';
    return res.status(200).json({ result });
  } catch (err) {
    const status = err?.status || 500;
    const code = err?.error?.error?.code;
    const message = err?.error?.error?.message;
    if (status === 400 && code) {
      return res.status(400).json({ error: code, message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}