import { useEffect, useState } from "react";
import { Clock, Globe2, MapPin, Package, ShieldCheck, Truck } from "lucide-react";
import { Header } from "./components/Header";
import { MapTracker } from "./components/MapTracker";
import { SearchBox } from "./components/SearchBox";
import { Timeline } from "./components/Timeline";
import { TrackingLoader } from "./components/TrackingLoader";
import { DESTINATION, STAGES, VALID_TRACKING_NUMBER, formatDate, formatDateTime, getShipmentStatus } from "./data/shipment";

export default function App() {
  const [now, setNow] = useState<Date>(new Date());
  const [trackedCode, setTrackedCode] = useState<string | null>(null);
  const [pendingCode, setPendingCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 5_000);
    return () => clearInterval(timer);
  }, []);

  const handleTrack = (code: string) => {
    setError(null);
    if (!code) {
      setTrackedCode(null);
      setIsLoading(false);
      setError("Please enter a tracking number.");
      return;
    }
    if (code.toUpperCase() !== VALID_TRACKING_NUMBER) {
      setTrackedCode(null);
      setIsLoading(false);
      setError("Tracking number not found. Please check the number and try again.");
      return;
    }

    const upperCode = code.toUpperCase();
    setPendingCode(upperCode);
    setTrackedCode(null);
    setIsLoading(true);

    setTimeout(() => {
      setTrackedCode(upperCode);
      setIsLoading(false);
      setPendingCode(null);
    }, 2200);
  };

  const status = trackedCode ? getShipmentStatus(now) : null;
  const activeStage = status ? STAGES[status.activeIndex] : null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-6xl space-y-10">
          {/* Hero / search */}
          <section className="relative mx-auto max-w-3xl text-center">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl animate-blob" />
            <div className="pointer-events-none absolute -right-24 top-12 h-56 w-56 rounded-full bg-violet-200/30 blur-3xl animate-blob animation-delay-2000" />
            <div className="pointer-events-none absolute left-1/2 top-24 h-48 w-48 -translate-x-1/2 rounded-full bg-sky-200/25 blur-3xl animate-blob animation-delay-4000" />

            <h1 className="relative text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Track your shipment
            </h1>
            <p className="relative mt-3 text-slate-500">
              Enter your tracking number below to see the latest status and live route.
            </p>
            <div className="relative mt-8 flex justify-center">
              <SearchBox
                onTrack={(code) => {
                  handleTrack(code);
                }}
                error={error}
              />
            </div>

            {/* Info cards */}
            <div className="relative mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200/70 bg-white/80 p-4 text-left shadow-sm backdrop-blur-sm">
                <Globe2 className="h-6 w-6 text-indigo-600" />
                <h3 className="mt-3 text-sm font-semibold text-slate-900">Global coverage</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Follow your parcel across countries and carriers from dispatch to doorstep.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/70 bg-white/80 p-4 text-left shadow-sm backdrop-blur-sm">
                <Clock className="h-6 w-6 text-indigo-600" />
                <h3 className="mt-3 text-sm font-semibold text-slate-900">Live updates</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Status refreshes automatically as your shipment reaches each checkpoint.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/70 bg-white/80 p-4 text-left shadow-sm backdrop-blur-sm">
                <ShieldCheck className="h-6 w-6 text-indigo-600" />
                <h3 className="mt-3 text-sm font-semibold text-slate-900">Secure tracking</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  One tracking number gives you end-to-end visibility with no extra sign-up.
                </p>
              </div>
            </div>
          </section>

          {/* Loading state */}
          {isLoading && pendingCode && (
            <section className="flex justify-center animate-fade-in-up">
              <div className="w-full max-w-md">
                <TrackingLoader code={pendingCode} />
              </div>
            </section>
          )}

          {/* Results */}
          {trackedCode && status && activeStage && !isLoading && (
            <section className="space-y-6 animate-fade-in-up">
              {/* Summary bar */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Tracking number</p>
                      <p className="text-lg font-semibold tracking-wide text-slate-900">{trackedCode}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {status.isDelivered
                          ? `Delivered on ${formatDate(STAGES[STAGES.length - 1].date)}`
                          : `Expected delivery: ${formatDate(STAGES[STAGES.length - 1].date)}`}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Status</p>
                      <p className="mt-0.5 text-sm font-semibold text-indigo-700">{activeStage.label}</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Current location</p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-900">{activeStage.location}</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Local time</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDateTime(now)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <MapTracker now={now} />

              {/* Details + timeline */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-base font-semibold text-slate-900">Shipment details</h3>
                    <dl className="space-y-4">
                      <div>
                        <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                          <MapPin className="h-3.5 w-3.5" /> From
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-slate-900">New York, NY, United States</dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                          <MapPin className="h-3.5 w-3.5" /> To
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-slate-900">
                          {DESTINATION.label}
                          <br />
                          <span className="text-slate-500">4 Alexandrou Papanastasiou T.Koutsou Complex B., Flat 101, 6027</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                          <Truck className="h-3.5 w-3.5" /> Service
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-slate-900">International Express</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Weight</dt>
                        <dd className="mt-1 text-sm font-medium text-slate-900">1.4 kg</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <Timeline now={now} />
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-center text-xs text-slate-400 sm:flex-row sm:text-left">
          <span className="font-medium text-slate-500">GlobalTrack</span>
          <span>© 2026 GlobalTrack. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
