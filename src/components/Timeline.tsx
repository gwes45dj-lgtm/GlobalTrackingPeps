import { Check, Package, Truck, Plane, MapPin, Home } from "lucide-react";
import { STAGES, formatDateTime, getShipmentStatus } from "../data/shipment";

const STAGE_ICONS = [Package, Truck, Truck, MapPin, Plane, Plane, Plane, MapPin, Truck, Home];

export function Timeline({ now }: { now: Date }) {
  const { activeIndex, isDelivered } = getShipmentStatus(now);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-base font-semibold text-slate-900">Shipment progress</h3>
      <div className="relative space-y-0">
        {STAGES.map((stage, index) => {
          const completed = index <= activeIndex || isDelivered;
          const latest = index === activeIndex && !isDelivered;
          const future = index > activeIndex && !isDelivered;
          const Icon = STAGE_ICONS[index] || Package;

          return (
            <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Connector line */}
              {index !== STAGES.length - 1 && (
                <div
                  className={`absolute left-[19px] top-10 h-[calc(100%-24px)] w-0.5 ${
                    completed ? "bg-indigo-600" : "bg-slate-200"
                  }`}
                />
              )}

              {/* Icon bubble */}
              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                  completed
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-white text-slate-400"
                }`}
              >
                {completed ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>

              {/* Content */}
              <div className="flex-1 pt-0.5">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                  <p
                    className={`text-sm font-semibold ${
                      latest ? "text-indigo-700" : future ? "text-slate-500" : "text-slate-900"
                    }`}
                  >
                    {stage.label}
                    {latest && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                        Latest
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-400">{formatDateTime(stage.date)}</p>
                </div>
                <p className="text-sm text-slate-500">{stage.location}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
