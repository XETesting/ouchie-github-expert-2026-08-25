import {
  CATEGORIES,
  edgesForPerson,
  getEdge,
  getPerson,
  type Edge,
  type Person,
} from "@/data/network-data";
import type { Selection } from "./NetworkGraph";
import { Quote, Link2, User, X, Calendar, Building2, Flag } from "lucide-react";

interface Props {
  selection: Selection;
  onClose: () => void;
  onSelectPerson: (id: string) => void;
  onSelectEdge: (id: string) => void;
}

export function DetailPanel({
  selection,
  onClose,
  onSelectPerson,
  onSelectEdge,
}: Props) {
  if (!selection) return null;

  if (selection.kind === "person") {
    const person = getPerson(selection.id);
    if (!person) return null;
    return (
      <PersonDetail
        person={person}
        onClose={onClose}
        onSelectPerson={onSelectPerson}
        onSelectEdge={onSelectEdge}
      />
    );
  }

  const edge = getEdge(selection.id);
  if (!edge) return null;
  return (
    <EdgeDetail
      edge={edge}
      onClose={onClose}
      onSelectPerson={onSelectPerson}
    />
  );
}

function PanelShell({
  children,
  onClose,
  title,
  subtitle,
  accent,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  subtitle?: string;
  accent: string;
}) {
  return (
    <aside className="flex h-full w-full flex-col border-l border-border bg-bg-panel sm:w-[380px]">
      <header className="flex items-start gap-3 border-b border-border px-4 py-4 sm:px-5">
        <span
          className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
          style={{ background: accent }}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold leading-tight tracking-tight text-fg">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs leading-snug text-fg-muted">{subtitle}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-fg-muted hover:bg-bg-subtle hover:text-fg"
        >
          <X className="h-4 w-4" />
        </button>
      </header>
      <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        {children}
      </div>
    </aside>
  );
}

function PersonDetail({
  person,
  onClose,
  onSelectPerson,
  onSelectEdge,
}: {
  person: Person;
  onClose: () => void;
  onSelectPerson: (id: string) => void;
  onSelectEdge: (id: string) => void;
}) {
  const cat = CATEGORIES[person.category];
  const edges = edgesForPerson(person.id);

  return (
    <PanelShell
      onClose={onClose}
      title={person.name}
      subtitle={person.role}
      accent={cat.color}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <Badge style={{ borderColor: cat.color, color: cat.color }}>
            {cat.label}
          </Badge>
          {person.flags.map((f) => (
            <Badge key={f}>{f}</Badge>
          ))}
        </div>

        <Section icon={<Building2 className="h-3.5 w-3.5" />} label="Affiliation">
          {person.affiliation}
        </Section>

        <Section icon={<Calendar className="h-3.5 w-3.5" />} label="Key dates in diary">
          {person.keyDates}
        </Section>

        <Section icon={<User className="h-3.5 w-3.5" />} label="Diary context">
          {person.summary}
        </Section>

        <Section icon={<Flag className="h-3.5 w-3.5" />} label="Approx. mentions">
          {person.mentions}
        </Section>

        <div>
          <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
            <Link2 className="h-3.5 w-3.5" />
            Connections ({edges.length})
          </h3>
          <ul className="space-y-2">
            {edges.map((edge) => {
              const otherId =
                edge.source === person.id ? edge.target : edge.source;
              const other = getPerson(otherId);
              return (
                <li key={edge.id}>
                  <button
                    type="button"
                    onClick={() => onSelectEdge(edge.id)}
                    className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-left transition-colors hover:border-border-strong hover:bg-bg-subtle"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-fg">
                        {other?.name ?? otherId}
                      </span>
                      <span className="text-[10px] tabular-nums text-fg-subtle">
                        str {edge.strength}/5
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-fg-muted">{edge.type}</p>
                    {edge.diaryQuote && (
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-fg-subtle">
                        <Quote className="h-3 w-3" /> Diary quote available
                      </p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {person.id !== "fauci" && (
          <button
            type="button"
            onClick={() => onSelectPerson("fauci")}
            className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-sm text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            Jump to Fauci (center)
          </button>
        )}
      </div>
    </PanelShell>
  );
}

function EdgeDetail({
  edge,
  onClose,
  onSelectPerson,
}: {
  edge: Edge;
  onClose: () => void;
  onSelectPerson: (id: string) => void;
}) {
  const source = getPerson(edge.source);
  const target = getPerson(edge.target);
  const accent =
    source && target
      ? CATEGORIES[source.category === "central" ? target.category : source.category]
          .color
      : "var(--color-fg-muted)";

  return (
    <PanelShell
      onClose={onClose}
      title={`${source?.shortName ?? "?"} ↔ ${target?.shortName ?? "?"}`}
      subtitle={edge.type}
      accent={accent}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2">
          {[source, target].map((p) =>
            p ? (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPerson(p.id)}
                className="rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-left transition-colors hover:border-border-strong hover:bg-bg-subtle"
              >
                <span
                  className="mb-1.5 inline-block h-2 w-2 rounded-full"
                  style={{ background: CATEGORIES[p.category].color }}
                />
                <p className="text-sm font-medium text-fg">{p.name}</p>
                <p className="mt-0.5 line-clamp-2 text-[11px] text-fg-muted">
                  {p.role}
                </p>
              </button>
            ) : null,
          )}
        </div>

        <Section label="Relationship">
          {edge.detail}
        </Section>

        <Section icon={<Calendar className="h-3.5 w-3.5" />} label="Period">
          {edge.period}
        </Section>

        <Section label="Strength">
          <div className="mt-1 flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="h-2 w-5 rounded-sm"
                  style={{
                    background:
                      i < edge.strength
                        ? accent
                        : "var(--color-border)",
                  }}
                />
              ))}
            </div>
            <span className="text-xs tabular-nums text-fg-muted">
              {edge.strength} / 5
            </span>
          </div>
        </Section>

        {edge.diaryQuote && (
          <blockquote className="rounded-xl border border-border bg-bg-elevated px-4 py-3">
            <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
              <Quote className="h-3.5 w-3.5" />
              From the diary
            </div>
            <p className="text-sm leading-relaxed text-fg italic">
              “{edge.diaryQuote}”
            </p>
            {edge.quoteContext && (
              <p className="mt-2 text-xs text-fg-muted">{edge.quoteContext}</p>
            )}
          </blockquote>
        )}

        {!edge.diaryQuote && (
          <p className="text-xs text-fg-subtle">
            No direct diary quote extracted for this edge; relationship is
            inferred from diary context and contact frequency.
          </p>
        )}
      </div>
    </PanelShell>
  );
}

function Section({
  label,
  children,
  icon,
}: {
  label: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
        {icon}
        {label}
      </h3>
      <div className="text-sm leading-relaxed text-fg-muted">{children}</div>
    </div>
  );
}

function Badge({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-fg-muted"
      style={style}
    >
      {children}
    </span>
  );
}

