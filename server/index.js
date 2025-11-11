import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_KEY;
if (!apiKey) {
  console.warn('[server] Missing GROQ_API_KEY (or VITE_GROQ_KEY) in environment');
}
const client = new Groq({ apiKey });
const model =  'llama-3.3-70b-versatile';

app.post('/api/generate', async (req, res) => {
  try {
    const { content, lang } = req.body || {};
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Invalid content' });
    }

    const rawLang = String(lang || '').toLowerCase();
    const safeLang = (['zh', 'zh-cn', 'zh-hans'].includes(rawLang))
      ? 'zh'
      : (['en', 'en-us', 'en-gb'].includes(rawLang))
      ? 'en'
      : (['jp', 'ja', 'ja-jp'].includes(rawLang))
      ? 'jp'
      : 'en';

    const systemPrompts = {
      zh: '你是一名专业的简历撰写顾问。请仅用中文输出高质量、结构清晰的简历，包括：个人简介、技能、项目/工作经历、教育。使用要点式（•）条目，避免使用除中文外的任何语言。不要生成双语内容。',
      en: 'You are a professional resume writer. Respond ONLY in English with a high-quality, well-structured resume including: Summary, Skills, Experience/Projects, Education. Use bullet points and avoid any language other than English. Do not produce bilingual content.',
      jp: 'あなたはプロの履歴書作成アドバイザーです。日本語のみで、構造が明確な高品質の履歴書を作成してください。内容は「概要・スキル・経験/プロジェクト・学歴」を含め、箇条書きを用いてください。日本語以外の言語は使わないでください。二言語の内容は出力しないでください。'
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
    return res.json({ result });
  } catch (err) {
    console.error('[server] /api/generate error:', err);
    const status = err?.status || 500;
    const code = err?.error?.error?.code;
    const message = err?.error?.error?.message;
    if (status === 400 && code) {
      return res.status(400).json({ error: code, message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`[server] API listening on http://localhost:${port}`);
});