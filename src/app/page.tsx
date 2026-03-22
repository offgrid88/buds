"use client";

import { useCallback, useEffect, useState } from "react";
import Flower, { type BudDisplay } from "./components/flower";
import FlowerAddCard, {
  type NewBudPayload,
} from "./components/flower-add-card";

const STORAGE_KEY = "buds-flowers-v1";

function isBudDisplay(value: unknown): value is BudDisplay {
  if (value === null || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    typeof o.healthyImage === "string" &&
    typeof o.seeEveryDays === "number" &&
    Number.isFinite(o.seeEveryDays)
  );
}

function parseStoredBuds(raw: string): BudDisplay[] | undefined {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return undefined;
    return parsed.filter(isBudDisplay);
  } catch {
    return undefined;
  }
}

export default function Home() {
  const [buds, setBuds] = useState<BudDisplay[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const next = parseStoredBuds(raw);
        if (next !== undefined) setBuds(next);
      }
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(buds));
    } catch {
      /* quota or private mode */
    }
  }, [buds, hydrated]);

  const handleAdd = useCallback((payload: NewBudPayload) => {
    setBuds((prev) => [
      ...prev,
      {
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now()),
        name: payload.name,
        healthyImage: payload.healthyImage,
        seeEveryDays: payload.seeEveryDays,
      },
    ]);
  }, []);

  return (
    <div className="mx-auto flex flex-col gap-6 p-6">
      <ul className="flex flex-row flex-wrap gap-4">
        {buds.map((bud, index) => (
          <li key={bud.id}>
            <Flower bud={bud} swayDelay={index * 0.15} />
          </li>
        ))}
      </ul>
      <FlowerAddCard onAdd={handleAdd} />
    </div>
  );
}
