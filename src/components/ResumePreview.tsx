import { useTranslation } from "react-i18next";

interface Props {
  aiResult: string;
}

export default function ResumePreview({ aiResult }: Props) {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-50 p-5 border rounded-xl min-h-[400px] whitespace-pre-wrap">
      {aiResult || t("preview_placeholder")}
    </div>
  );
}
