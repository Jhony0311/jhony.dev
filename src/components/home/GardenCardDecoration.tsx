'use client';

import type { GardenStage } from './home-data';

export function GardenCardDecoration({ stage }: { stage: GardenStage }) {
    const stageGlowMap = {
        Seedling: 'rgba(154, 122, 30, 0.2)',
        Budding: 'rgba(26, 122, 94, 0.2)',
        Evergreen: 'rgba(30, 95, 168, 0.2)',
    };

    const glowColor = stageGlowMap[stage];

    return (
        <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg"
            style={{
                background: `radial-gradient(ellipse 700px 550px at bottom right, ${glowColor}, transparent 55%)`,
            }}
        />
    );
}
