import { useState } from "react";
import { useTranslation } from "react-i18next";
import { generateAIResume as generateAIResumeFromAI } from "../utils/ai";

export function useResumeData() {
  const { i18n } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    job: "",
    experience: "",
    skills: "",
  });

  const [aiResult, setAiResult] = useState("");

  async function onGenerate() {
    const fullText = `
姓名: ${form.name}
求职岗位: ${form.job}
经历: ${form.experience}
技能: ${form.skills}
    `;

    const result = await generateAIResumeFromAI(fullText, i18n.language);
    setAiResult(result);
  }

  return { form, setForm, aiResult, generateAIResume: onGenerate };
}
