import { benchmarkCases } from '../../data/persianBenchmark';
import {
  benchmarkRunDate,
  benchmarkSystems,
} from '../../data/persianBenchmarkResults';

const csv = (value: string | number) =>
  `"${String(value).replaceAll('"', '""')}"`;

export function GET() {
  const header = [
    'tested_at',
    'system_id',
    'product',
    'model',
    'mode',
    'surface',
    'case_id',
    'case_title',
    'response',
    'criteria_score',
    'format_score',
    'usability_score',
    'total_score',
    'judge_note',
  ];
  const rows = benchmarkSystems.flatMap((system) =>
    system.results.map((result) => {
      const benchmarkCase = benchmarkCases.find(
        (item) => item.id === result.caseId,
      );
      return [
        benchmarkRunDate,
        system.id,
        system.product,
        system.model,
        system.mode,
        system.surface,
        result.caseId,
        benchmarkCase?.title ?? '',
        result.response,
        result.score.criteria,
        result.score.format,
        result.score.usability,
        result.score.total,
        result.note,
      ];
    }),
  );
  const body = [header, ...rows]
    .map((row) => row.map(csv).join(','))
    .join('\n');

  return new Response(`\uFEFF${body}`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition':
        'attachment; filename="mahsai-persian-benchmark-results-v0.1.csv"',
    },
  });
}
