import { benchmarkCases } from '../../data/persianBenchmark';
import {
  benchmarkCaseWinners,
  benchmarkExcludedRuns,
  benchmarkRanking,
  benchmarkRunDate,
  benchmarkRunVersion,
  benchmarkScoring,
  benchmarkSystems,
} from '../../data/persianBenchmarkResults';

export function GET() {
  const body = JSON.stringify(
    {
      name: 'MAHSAI Persian AI Benchmark Results',
      version: benchmarkRunVersion,
      testedAt: benchmarkRunDate,
      language: 'fa-IR',
      testCount: benchmarkCases.length,
      completedRuns: benchmarkSystems.length * benchmarkCases.length,
      methodologyUrl: 'https://mahsai.ir/ai/persian-lab/',
      resultsUrl: 'https://mahsai.ir/ai/persian-lab/results/',
      promptLicense: 'CC BY 4.0',
      note: 'این نتیجه فقط درباره همین شش آزمون، مدل‌ها و حالت‌های ثبت‌شده در تاریخ اجراست. سرعت و قیمت امتیازدهی نشده‌اند.',
      scoring: benchmarkScoring,
      ranking: benchmarkRanking,
      winnersByCase: benchmarkCaseWinners,
      cases: benchmarkCases,
      systems: benchmarkSystems,
      excludedRuns: benchmarkExcludedRuns,
    },
    null,
    2,
  );

  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition':
        'attachment; filename="mahsai-persian-benchmark-results-v0.1.json"',
    },
  });
}
