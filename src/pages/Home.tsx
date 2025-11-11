import { useState } from "react";
import FormSection from "../components/FormSection";
import ResumePreview from "../components/ResumePreview";
import LanguageSwitcher from "../components/LanguageSwitcher";
import PdfExportButton from "../components/PdfExportButton";
import { useResumeData } from "../hooks/useResumeData";

export default function Home() {
  const { form, setForm, aiResult, generateAIResume } = useResumeData();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-end">
        <LanguageSwitcher />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormSection form={form} setForm={setForm} onGenerate={generateAIResume} />
        <div className="space-y-4">
          <ResumePreview aiResult={aiResult} />
          <PdfExportButton />
        </div>
      </div>
    </div>
  );
}
