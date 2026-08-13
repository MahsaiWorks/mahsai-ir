import { benchmarkCases } from '../../data/persianBenchmark';

const csv = (value: string) => `"${value.replaceAll('"', '""')}"`;
export function GET() {
  const header = [
    'id',
    'category',
    'title',
    'goal',
    'input',
    'prompt',
    'checks',
  ];
  const rows = benchmarkCases.map((item) => [
    item.id,
    item.category,
    item.title,
    item.goal,
    item.input,
    item.prompt,
    item.checks.join(' | '),
  ]);
  const body = [header, ...rows]
    .map((row) => row.map(csv).join(','))
    .join('\n');
  return new Response(`\uFEFF${body}`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition':
        'attachment; filename="mahsai-persian-benchmark-v0.1.csv"',
    },
  });
}
