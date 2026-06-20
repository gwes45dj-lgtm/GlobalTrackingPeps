import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBoxProps {
  onTrack: (code: string) => void;
  error: string | null;
}

export function SearchBox({ onTrack, error }: SearchBoxProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTrack(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <label htmlFor="tracking" className="mb-2 block text-sm font-medium text-slate-700">
        Tracking number
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            id="tracking"
            type="text"
            autoComplete="off"
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Track
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}
