import { useEffect, useRef, useState } from "react";
import { WorldMap } from "./WorldMap";
import { DESTINATION, ORIGIN, formatDateTime, getShipmentStatus } from "../data/shipment";

function PlaneIcon({ rotation }: { rotation: number }) {
  return (
    <g transform={`rotate(${rotation})`} className="text-indigo-600">
      <path
        d="M-10,-2 L-3,-2 L2,-8 L5,-8 L3,-2 L10,-2 L10,2 L3,2 L5,8 L2,8 L-3,2 L-10,2 Z"
        fill="currentColor"
        stroke="white"
        strokeWidth="2"
      />
    </g>
  );
}

export function MapTracker({ now }: { now: Date }) {
  const routeRef = useRef<SVGPathElement>(null);
  const [pathReady, setPathReady] = useState(false);
  const { isDelivered, progress } = getShipmentStatus(now);

  useEffect(() => {
    if (routeRef.current) {
      setPathReady(true);
    }
  }, []);

  let planePoint = { x: ORIGIN.x, y: ORIGIN.y };
  let rotation = 0;

  if (pathReady && routeRef.current) {
    const len = routeRef.current.getTotalLength();
    const currentLen = len * progress;
    planePoint = routeRef.current.getPointAtLength(currentLen);

    const p1 = routeRef.current.getPointAtLength(Math.max(0, currentLen - 2));
    const p2 = routeRef.current.getPointAtLength(Math.min(len, currentLen + 2));
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    rotation = angle;
  }

  const percent = Math.round(progress * 100);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
      <div className="absolute left-0 top-0 z-10 w-full bg-gradient-to-b from-white/90 to-transparent px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Live route</p>
            <p className="text-sm font-medium text-slate-900">{ORIGIN.label} → {DESTINATION.label}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Route completed</p>
            <p className="text-sm font-semibold text-indigo-600">{percent}%</p>
          </div>
        </div>
      </div>

      <div className="relative aspect-[2/1] w-full">
        <WorldMap />

        <svg
          viewBox="0 0 1000 500"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Route line */}
          <path
            ref={routeRef}
            d={`M ${ORIGIN.x} ${ORIGIN.y} C 380 80, 580 60, ${DESTINATION.x} ${DESTINATION.y}`}
            fill="none"
            stroke="currentColor"
            className="text-slate-300"
            strokeWidth="3"
            strokeDasharray="8 8"
            strokeLinecap="round"
          />

          {/* Completed route overlay */}
          <path
            d={`M ${ORIGIN.x} ${ORIGIN.y} C 380 80, 580 60, ${DESTINATION.x} ${DESTINATION.y}`}
            fill="none"
            stroke="currentColor"
            className="text-indigo-500"
            strokeWidth="3"
            strokeDasharray={`${routeRef.current ? routeRef.current.getTotalLength() * progress : 0} ${routeRef.current ? routeRef.current.getTotalLength() : 1000}`}
            strokeLinecap="round"
            style={{ opacity: pathReady ? 1 : 0 }}
          />

          {/* Origin marker */}
          <g transform={`translate(${ORIGIN.x}, ${ORIGIN.y})`}>
            <circle r="5" className="fill-indigo-600" />
            <circle r="12" className="fill-none stroke-indigo-600" strokeOpacity="0.25" strokeWidth="2">
              <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
            <text y="24" textAnchor="middle" className="fill-slate-700 text-[13px] font-medium" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>
              {ORIGIN.label}
            </text>
          </g>

          {/* Destination marker */}
          <g transform={`translate(${DESTINATION.x}, ${DESTINATION.y})`}>
            <circle r="5" className={isDelivered ? "fill-emerald-500" : "fill-slate-400"} />
            {!isDelivered && (
              <circle r="12" className="fill-none stroke-slate-400" strokeOpacity="0.25" strokeWidth="2">
                <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
            <text y="24" textAnchor="middle" className="fill-slate-700 text-[13px] font-medium" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>
              {DESTINATION.label}
            </text>
          </g>

          {/* Moving package / plane */}
          <g
            transform={`translate(${planePoint.x}, ${planePoint.y})`}
            style={{ transition: "transform 0.6s linear" }}
          >
            <PlaneIcon rotation={rotation} />
            <circle r="18" className="fill-indigo-500" fillOpacity="0.15">
              <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite" />
              <animate attributeName="fill-opacity" values="0.25;0;0.25" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>

      <div className="border-t border-slate-200 bg-white px-6 py-3">
        <p className="text-xs text-slate-500">Last updated: {formatDateTime(now)}</p>
      </div>
    </div>
  );
}
