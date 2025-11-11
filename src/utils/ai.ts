export async function generateAIResume(content: string, lang?: string): Promise<string> {
  const resp = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, lang }),
  });
  if (!resp.ok) {
    throw new Error(`API error: ${resp.status}`);
  }
  const data = await resp.json();
  return data.result as string;
}
