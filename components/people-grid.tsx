"use client";

import { useMemo, useState } from "react";
import { PersonCard } from "@/components/person-card";
import type { Person } from "@/lib/types";

type Props = {
  people: Person[];
};

export function PeopleGrid({ people }: Props) {
  const roles = useMemo(
    () => Array.from(new Set(people.map((p) => p.role))),
    [people],
  );
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "alumni">(
    "all",
  );

  const filtered = people.filter((person) => {
    const roleMatch = roleFilter === "All" || person.role === roleFilter;
    const statusMatch =
      statusFilter === "all" ? true : person.status === statusFilter;
    return roleMatch && statusMatch;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold text-slate-200">Roles:</label>
        <button
          type="button"
          className={`pill px-3 py-2 text-sm font-semibold ${
            roleFilter === "All"
              ? "bg-white/10 text-white"
              : "text-slate-200 hover:bg-white/5"
          }`}
          onClick={() => setRoleFilter("All")}
        >
          All
        </button>
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            className={`pill px-3 py-2 text-sm font-semibold ${
              roleFilter === role
                ? "bg-white/10 text-white"
                : "text-slate-200 hover:bg-white/5"
            }`}
            onClick={() => setRoleFilter(role)}
          >
            {role}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold text-slate-200">
          Status:
        </label>
        {(["all", "active", "alumni"] as const).map((status) => (
          <button
            key={status}
            type="button"
            className={`pill px-3 py-2 text-sm font-semibold capitalize ${
              statusFilter === status
                ? "bg-white/10 text-white"
                : "text-slate-200 hover:bg-white/5"
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
        {filtered.length === 0 ? (
          <div className="text-slate-400">
            No people match this filter yet. Update <code>/content/people.json</code>{" "}
            to add more profiles.
          </div>
        ) : null}
      </div>
    </div>
  );
}
