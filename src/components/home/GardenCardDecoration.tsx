"use client";

import type { GardenStage } from "./home-data";

export function GardenCardDecoration({ stage }: { stage: GardenStage }) {
  const stageGlowClassMap = {
    Seedling:
      "bg-[radial-gradient(ellipse_700px_550px_at_bottom_right,rgba(154,122,30,0.2),transparent_55%)]",
    Budding:
      "bg-[radial-gradient(ellipse_700px_550px_at_bottom_right,rgba(26,122,94,0.2),transparent_55%)]",
    Evergreen:
      "bg-[radial-gradient(ellipse_700px_550px_at_bottom_right,rgba(30,95,168,0.2),transparent_55%)]",
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${stageGlowClassMap[stage]}`}
    />
  );
}
