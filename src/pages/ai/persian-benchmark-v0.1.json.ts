import {
  benchmarkCases,
  benchmarkDimensions,
  benchmarkUpdatedAt,
  benchmarkVersion,
} from '../../data/persianBenchmark';

export function GET() {
  const body = JSON.stringify(
    {
      name: 'MAHSAI Persian AI Benchmark',
      version: benchmarkVersion,
      updatedAt: benchmarkUpdatedAt,
      language: 'fa-IR',
      license: 'CC BY 4.0',
      note: 'این مجموعه آزمون منتشر شده، اما هنوز نتیجه یا رتبه‌بندی چهارنرم‌افزاری ندارد.',
      dimensions: benchmarkDimensions,
      cases: benchmarkCases,
    },
    null,
    2,
  );
  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition':
        'attachment; filename="mahsai-persian-benchmark-v0.1.json"',
    },
  });
}
