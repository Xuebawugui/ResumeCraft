import { exportPDF } from "../utils/pdf";
import { useTranslation } from "react-i18next";

export default function PdfExportButton() {
  const { t } = useTranslation();
  return (
    <button
      onClick={exportPDF}
      className="w-full py-2 bg-green-600 text-white rounded-lg"
    >
      {t("export_pdf")}
    </button>
  );
}
