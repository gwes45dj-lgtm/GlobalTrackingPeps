import { Globe, Package } from "lucide-react";

export function Header() {
  return (
    <header className="w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
            <Globe className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">GlobalTrack</span>
        </div>
        <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
          <Package className="h-4 w-4" />
          <span>International parcel tracking</span>
        </div>
      </div>
    </header>
  );
}
