"use client";

import Image from "next/image";
import isMobile from "../hooks/is-mobile";

export type FertilizePlan = {
  plannedDate: string;
  note: string;
};

export type BudDisplay = {
  id: string;
  name: string;
  healthyImage: string;
  seeEveryDays: number;
  /** 0–100 shown on the care bar */
  health: number;
  /** Local YYYY-MM-DD when health was last reconciled (decay applied or care gained). */
  healthUpdatedAt: string;
  /** YYYY-MM-DD of last in-person visit */
  lastInPersonAt: string | null;
  fertilizePlan: FertilizePlan | null;
  /** YYYY-MM-DD when user last logged “chatted today” */
  lastChattedTodayAt: string | null;
  /** Monday week key when user last used “this week” water log */
  lastWaterWeekStartKey: string | null;
};

function hueFromId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % 360;
}

type FlowerProps = {
  bud: BudDisplay;
  swayDuration?: number;
  swayDelay?: number;
  careOpen?: boolean;
  onOpenCare?: () => void;
  onAnchorChange?: (el: HTMLDivElement | null) => void;
};

export default function Flower({
  bud,
  swayDuration = 4,
  swayDelay = 0,
  careOpen = false,
  onOpenCare,
  onAnchorChange,
}: FlowerProps) {
  const hue = hueFromId(bud.id);
  const IMAGE_PX = isMobile() ? 50 : 300;
  const selected = careOpen;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={onAnchorChange}
        className="relative hover:cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenCare?.();
          }
        }}
        onClick={() => onOpenCare?.()}
        style={{
          transformOrigin: "bottom center",
          animationName: selected ? "none" : "sway1",
          animationDuration: `${swayDuration}s`,
          animationTimingFunction: "ease-in-out",
          animationDelay: `${swayDelay}s`,
          animationIterationCount: "infinite",
        }}
      >
        <div
          style={{
            transformOrigin: "bottom center",
            animationName: selected ? "none" : "sway2",
            animationDuration: `${swayDuration * 0.55}s`,
            animationTimingFunction: "ease-in-out",
            animationDelay: `${swayDelay + 0.5}s`,
            animationIterationCount: "infinite",
          }}
        >
          <Image
            src={bud.healthyImage}
            alt=""
            width={IMAGE_PX}
            height={IMAGE_PX}
            className="inline-block h-18 w-18 md:h-48 md:w-48 object-contain"
            style={
              selected
                ? {
                    filter: `drop-shadow(0 0 6px hsla(${hue}, 80%, 70%, 0.9)) drop-shadow(0 0 20px hsla(${hue}, 70%, 60%, 0.5))`,
                  }
                : undefined
            }
          />
        </div>
      </div>
      <h2 className="text-center text-base font-semibold text-neutral-900">
        {bud.name}
      </h2>
      <div className="flex w-full min-w-[2rem] max-w-[6rem] flex-col gap-1">
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100"
          role="status"
          aria-label={`Health ${Math.round(bud.health)} percent. Connect every ${bud.seeEveryDays} days`}
        >
          <div
            className="h-full rounded-full bg-emerald-500/90 transition-all duration-300"
            style={{ width: `${Math.round(bud.health)}%` }}
          />
        </div>
        <p className="text-center text-xs text-neutral-500">
          Water every {bud.seeEveryDays} day{bud.seeEveryDays === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
