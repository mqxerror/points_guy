'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';

interface Connection {
  from: { lat: number; lng: number };
  to: { lat: number; lng: number };
}

interface WorldMapProps {
  connections: Connection[];
  lineColor?: string;
  dotColor?: string;
}

function latLngToXY(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 800;
  const y = ((90 - lat) / 180) * 400;
  return { x, y };
}

function generateCurvePath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const midX = (from.x + to.x) / 2;
  const midY = Math.min(from.y, to.y) - Math.abs(from.x - to.x) * 0.15;
  return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
}

export function WorldMap({ connections, lineColor = '#C9A84C', dotColor = '#C9A84C' }: WorldMapProps) {
  const id = useId();

  return (
    <div className="relative w-full aspect-[2/1] max-w-4xl mx-auto">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified world map dots */}
        <WorldDots />

        {/* Connection lines */}
        {connections.map((conn, idx) => {
          const from = latLngToXY(conn.from.lat, conn.from.lng);
          const to = latLngToXY(conn.to.lat, conn.to.lng);
          const path = generateCurvePath(from, to);
          const gradientId = `${id}-grad-${idx}`;

          return (
            <g key={idx}>
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={lineColor} stopOpacity="0.2" />
                  <stop offset="50%" stopColor={lineColor} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={lineColor} stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <motion.path
                d={path}
                stroke={`url(#${gradientId})`}
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: idx * 0.3, ease: 'easeInOut' }}
              />
              {/* Origin dot */}
              <motion.circle
                cx={from.x}
                cy={from.y}
                r="3"
                fill={dotColor}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.3 }}
              />
              {/* Destination dot */}
              <motion.circle
                cx={to.x}
                cy={to.y}
                r="4"
                fill={dotColor}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.3 + 0.5 }}
              />
              {/* Pulse on destination */}
              <motion.circle
                cx={to.x}
                cy={to.y}
                r="4"
                fill="none"
                stroke={dotColor}
                strokeWidth="1"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.3 + 1,
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function WorldDots() {
  // Simplified continent outlines as dot clusters
  const continentDots = [
    // North America
    ...[
      [160, 100], [170, 110], [180, 105], [190, 115], [175, 120], [165, 130],
      [155, 125], [170, 135], [185, 130], [195, 125], [200, 140], [190, 145],
      [180, 150], [170, 145], [160, 140], [150, 135], [205, 150], [210, 160],
    ],
    // South America
    ...[
      [225, 210], [230, 220], [235, 230], [240, 240], [235, 250], [230, 260],
      [225, 270], [220, 280], [215, 290], [230, 200], [240, 210], [245, 220],
      [240, 250], [235, 270], [225, 285],
    ],
    // Europe
    ...[
      [380, 100], [390, 95], [400, 100], [410, 105], [395, 110], [385, 115],
      [405, 115], [415, 110], [420, 100], [375, 105], [390, 85], [400, 90],
      [410, 95], [395, 120], [385, 125],
    ],
    // Africa
    ...[
      [395, 170], [400, 180], [405, 190], [410, 200], [405, 210], [400, 220],
      [395, 230], [390, 240], [400, 250], [410, 240], [415, 230], [420, 220],
      [415, 210], [410, 180], [390, 175], [385, 185],
    ],
    // Asia
    ...[
      [450, 100], [460, 95], [470, 105], [480, 110], [490, 100], [500, 105],
      [510, 110], [520, 115], [530, 120], [540, 115], [550, 110], [560, 120],
      [570, 130], [540, 130], [520, 135], [500, 130], [480, 125], [460, 115],
      [470, 130], [490, 140], [510, 145], [530, 140],
    ],
    // Oceania
    ...[
      [580, 250], [590, 255], [600, 260], [595, 265], [585, 260],
      [610, 270], [615, 275],
    ],
  ];

  return (
    <g opacity="0.15">
      {continentDots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill="white" />
      ))}
    </g>
  );
}
