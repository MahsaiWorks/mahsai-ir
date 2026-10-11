// Course-only first-party measurement. Never inspect form values, URLs, or identities.
type PreviewEvent = 'landing_view' | 'preview_play' | 'preview_complete';

const coursePage = document.querySelector<HTMLElement>('[data-academy-funnel]');
if (coursePage?.dataset.academyFunnel === 'true') {
  const endpoint = 'https://android-pay.mahsai.ir/api/academy/funnel';
  // Shared only by this page's events and purchase handoff. It is never an account
  // identifier or authorization; the server's signed cookie always takes priority.
  let pageJourneyID = crypto.randomUUID?.();
  let issuedAt = Date.now();
  const purchaseLinks = document.querySelectorAll<HTMLAnchorElement>(
    'a[href="https://android-pay.mahsai.ir/academy/buy"]',
  );
  const updateLinks = (): void => {
    if (!pageJourneyID) return;
    purchaseLinks.forEach((link) => {
      link.href = `https://android-pay.mahsai.ir/academy/buy?journey=${pageJourneyID}`;
    });
  };
  updateLinks();
  const sent = new Set<PreviewEvent>();
  let queue: Promise<void> = Promise.resolve();
  const rotateIfExpired = (): boolean => {
    if (!pageJourneyID || Date.now() - issuedAt < 86_400_000) return false;
    pageJourneyID = crypto.randomUUID();
    issuedAt = Date.now();
    sent.clear();
    updateLinks();
    return true;
  };
  const record = (event: PreviewEvent): void => {
    if (rotateIfExpired() && event !== 'landing_view') record('landing_view');
    if (sent.has(event) || !pageJourneyID) return;
    sent.add(event);
    const eventID = crypto.randomUUID();
    const eventJourneyID = pageJourneyID;
    queue = queue.then(async () => {
      try {
        await fetch(endpoint, {
          method: 'POST',
          credentials: 'include',
          cache: 'no-store',
          redirect: 'error',
          keepalive: true,
          signal: AbortSignal.timeout(4000),
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            schemaVersion: 1,
            eventID,
            pageJourneyID: eventJourneyID,
            event,
          }),
        });
      } catch {
        // Measurement must never block playback, navigation, login, or purchase.
      }
    });
  };
  const recordView = (): void => {
    if (document.visibilityState === 'visible') record('landing_view');
  };
  recordView();
  document.addEventListener('visibilitychange', recordView);
  purchaseLinks.forEach((link) => {
    const refreshHandoff = (): void => {
      if (rotateIfExpired()) recordView();
    };
    link.addEventListener('pointerdown', refreshHandoff);
    link.addEventListener('keydown', refreshHandoff);
    link.addEventListener('contextmenu', refreshHandoff);
  });
  const preview = document.querySelector<HTMLVideoElement>('#course-preview');
  preview?.addEventListener('playing', () => record('preview_play'), {
    once: true,
  });
  preview?.addEventListener('ended', () => record('preview_complete'), {
    once: true,
  });
}
