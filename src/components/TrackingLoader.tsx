import { useEffect, useState } from "react";
import { Truck } from "lucide-react";

const MESSAGES = [
  "Connecting to carrier...",
  "Retrieving scan events...",
  "Calculating live route...",
  "Finalising details...",
  "Tracking number found!",
];

export function TrackingLoader({ code }: { code: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % MESSAGES.length);
    }, 420);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in-up rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
      <div className="flex flex-col items-center text-center">
        {/* Animated truck with pulse ring */}
        <div className="relative mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
            <Truck className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-indigo-200 opacity-0 animate-ping" />
          <div className="absolute inset-0 rounded-full border border-indigo-100" />
        </div>

        <h3 className="text-lg font-semibold text-slate-900">Searching shipment</h3>

        {/* Scanning barcode effect over the tracking number */}
        <div className="relative mt-4 w-full max-w-xs overflow-hidden rounded-lg bg-slate-100 px-4 py-2.5">
          <p className="relative z-10 font-mono text-sm tracking-widest text-slate-700">{code}</p>
          <div className="animate-scan absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        </div>

        <p
          className={`mt-5 h-5 text-sm font-semibold transition-colors duration-300 ${
            step === MESSAGES.length - 1 ? "text-emerald-600" : "text-slate-500"
          }`}
        >
          {MESSAGES[step]}
        </p>

        {/* Animated progress bar */}
        <div className="mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-colors duration-300 ${
              step === MESSAGES.length - 1 ? "bg-emerald-500" : "bg-indigo-600"
            } animate-loading-bar`}
          />
        </div>
      </div>
    </div>
  );
}
