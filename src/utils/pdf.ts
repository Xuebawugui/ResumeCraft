import html2pdf from "html2pdf.js";

export function exportPDF() {
  const element = document.querySelector("div.bg-gray-50") as HTMLElement;

  if (!element) return;

  html2pdf().from(element).save("resume.pdf");
}
