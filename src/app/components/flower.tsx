"use client";

import Image from "next/image";
import { useState } from "react";
import isMobile from "../hooks/is-mobile";

export type BudDisplay = {
  id: string;
  name: string;
  healthyImage: string;
  seeEveryDays: number;
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
};

export default function Flower({
  bud,
  swayDuration = 4,
  swayDelay = 0,
}: FlowerProps) {
  const [selected, setSelected] = useState(false);
  const hue = hueFromId(bud.id);
  const IMAGE_PX = isMobile() ? 50 : 300;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative cursor-pointer"
        style={{
          transformOrigin: "bottom center",
          animationName: selected ? "none" : "sway1",
          animationDuration: `${swayDuration}s`,
          animationTimingFunction: "ease-in-out",
          animationDelay: `${swayDelay}s`,
          animationIterationCount: "infinite",
        }}
        onClick={() => setSelected((s) => !s)}
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
          aria-label={`Care rhythm: every ${bud.seeEveryDays} days`}
        >
          <div
            className="h-full rounded-full bg-emerald-500/90 transition-all"
            style={{ width: "100%" }}
          />
        </div>
        <p className="text-center text-xs text-neutral-500">
          Water every {bud.seeEveryDays} day{bud.seeEveryDays === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
