import { useTranslation } from "react-i18next";

interface Props {
  form: any;
  setForm: (v: any) => void;
  onGenerate: () => void;
}

export default function FormSection({ form, setForm, onGenerate }: Props) {
  const { t } = useTranslation();

  const fields = [
    { key: "name", rows: 1 },
    { key: "job", rows: 1 },
    { key: "experience", rows: 4 },
    { key: "skills", rows: 2 },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">{t("title")}</h2>

      {fields.map(({ key, rows }) => (
        <div key={key}>
          <label className="block font-semibold mb-1">{t(key)}</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={rows}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        </div>
      ))}

      <button
        onClick={onGenerate}
        className="w-full py-2 bg-blue-600 text-white rounded-lg"
      >
        {t("generate")}
      </button>
    </div>
  );
}
