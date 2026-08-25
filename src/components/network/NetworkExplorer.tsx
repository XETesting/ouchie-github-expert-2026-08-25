import { useEffect, useMemo, useState } from "react";
import {
  CATEGORIES,
  PEOPLE,
  type CategoryId,
} from "@/data/network-data";
import { NetworkGraph, type Selection } from "./NetworkGraph";
import { DetailPanel } from "./DetailPanel";
import { Search, Filter, Network, Info } from "lucide-react";

export function NetworkExplorer() {
  const [selection, setSelection] = useState<Selection>(null);
  const [search, setSearch] = useState("");
  const [activeCats, setActiveCats] = useState<Set<CategoryId> | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [focusPersonId, setFocusPersonId] = useState<string | null>(null);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const categoryList = useMemo(
    () =>
      (Object.keys(CATEGORIES) as CategoryId[]).filter((c) => c !== "central"),
    [],
  );

  const toggleCat = (id: CategoryId) => {
    setActiveCats((prev) => {
      if (!prev) {
        return new Set([id]);
      }
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (next.size === 0) return null;
      return next;
    });
  };

  const handleSelect = (s: Selection) => {
    setSelection(s);
    if (s) setMobilePanelOpen(true);
  };

  const handleSelectPerson = (id: string) => {
    setSelection({ kind: "person", id });
    setFocusPersonId(id);
    setMobilePanelOpen(true);
    window.setTimeout(() => setFocusPersonId(null), 400);
  };

  const handleSelectEdge = (id: string) => {
    setSelection({ kind: "edge", id });
    setMobilePanelOpen(true);
  };

  const closePanel = () => {
    setSelection(null);
    setMobilePanelOpen(false);
  };

  return (
    <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-bg text-fg">
      <header className="z-20 flex shrink-0 flex-col gap-3 border-b border-border bg-bg-elevated/95 px-3 py-3 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-bg-subtle">
            <Network className="h-4 w-4 text-fg" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold tracking-tight text-fg sm:text-base">
              Fauci Diary — Contact Network
            </h1>
            <p className="truncate text-[11px] text-fg-subtle sm:text-xs">
              Interactive org chart · {PEOPLE.length} actors · diary quotes on
              edges
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-2 sm:justify-end">
          <label className="relative min-w-0 flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-fg-subtle" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search people…"
              className="h-10 w-full rounded-lg border border-border bg-bg pl-9 pr-3 text-sm text-fg placeholder:text-fg-subtle outline-none focus:border-border-strong focus:ring-1 focus:ring-ring"
            />
          </label>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className={`flex h-10 items-center gap-1.5 rounded-lg border px-3 text-sm transition-colors ${
              showFilters || activeCats
                ? "border-border-strong bg-bg-subtle text-fg"
                : "border-border bg-bg text-fg-muted hover:text-fg"
            }`}
          >
            <Filter className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </header>

      {showFilters && (
        <div className="z-10 shrink-0 border-b border-border bg-bg-elevated px-3 py-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCats(null)}
              className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                !activeCats
                  ? "border-fg/30 bg-fg text-bg"
                  : "border-border text-fg-muted hover:text-fg"
              }`}
            >
              All
            </button>
            {categoryList.map((id) => {
              const c = CATEGORIES[id];
              const on = !activeCats || activeCats.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleCat(id)}
                  className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium transition-opacity hover:border-border-strong"
                  style={{ opacity: on ? 1 : 0.4 }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: c.color }}
                  />
                  <span className="text-fg-muted">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <div className="relative min-h-0 min-w-0 flex-1">
          <NetworkGraph
            selection={selection}
            onSelect={handleSelect}
            categoryFilter={activeCats}
            searchQuery={search}
            focusPersonId={focusPersonId}
          />

          <div className="pointer-events-none absolute right-3 top-3 hidden max-w-[11rem] rounded-xl border border-border bg-bg-elevated/95 p-3 shadow-lg backdrop-blur-sm lg:block">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-fg-subtle">
              Categories
            </p>
            <ul className="space-y-1.5">
              {(Object.keys(CATEGORIES) as CategoryId[]).map((id) => (
                <li
                  key={id}
                  className="flex items-center gap-2 text-[11px] text-fg-muted"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: CATEGORIES[id].color }}
                  />
                  {CATEGORIES[id].label}
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-snug text-fg-subtle">
              <Info className="mt-0.5 h-3 w-3 shrink-0" />
              Dots on edges mark diary quotes
            </p>
          </div>
        </div>

        {!isMobile && (
          <div className="h-full min-h-0 shrink-0">
            {selection ? (
              <DetailPanel
                selection={selection}
                onClose={closePanel}
                onSelectPerson={handleSelectPerson}
                onSelectEdge={handleSelectEdge}
              />
            ) : (
              <EmptyPanel />
            )}
          </div>
        )}

        {isMobile && mobilePanelOpen && selection && (
          <div className="absolute inset-0 z-30 flex flex-col justify-end">
            <button
              type="button"
              className="absolute inset-0 bg-bg/70"
              aria-label="Dismiss"
              onClick={closePanel}
            />
            <div className="relative max-h-[75dvh] overflow-hidden rounded-t-2xl border-t border-border shadow-2xl">
              <DetailPanel
                selection={selection}
                onClose={closePanel}
                onSelectPerson={handleSelectPerson}
                onSelectEdge={handleSelectEdge}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyPanel() {
  return (
    <aside className="flex h-full w-[320px] flex-col border-l border-border bg-bg-panel lg:w-[380px]">
      <div className="flex flex-1 flex-col justify-center px-6 py-8">
        <Network className="mb-4 h-8 w-8 text-fg-subtle" />
        <h2 className="text-base font-semibold text-fg">Explore the network</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-fg-muted">
          <li>
            <span className="font-medium text-fg">Hover</span> a person for a
            quick bio from the diary.
          </li>
          <li>
            <span className="font-medium text-fg">Click a node</span> for full
            context, flags, and linked relationships.
          </li>
          <li>
            <span className="font-medium text-fg">Click an edge</span> to read
            how two actors connect — often with a diary quote.
          </li>
          <li>
            <span className="font-medium text-fg">Drag / scroll</span> to pan and
            zoom the chart.
          </li>
        </ul>
        <p className="mt-6 text-xs leading-relaxed text-fg-subtle">
          Source: Fauci diary materials released by Chairman Rand Paul.
          Pre-2020 funding actors appear via 2021 diary reflections.
        </p>
      </div>
    </aside>
  );
}
