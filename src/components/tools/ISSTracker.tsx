"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface ISSTrackerProps {
  lang: "en" | "hi";
}

interface ISSPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface CrewMember {
  name: string;
  craft: string;
}

const text = {
  en: {
    title: "ISS Live Tracker",
    subtitle:
      "Track the International Space Station's position in real-time over Earth",
    latitude: "Latitude",
    longitude: "Longitude",
    altitude: "Altitude",
    speed: "Speed",
    altitudeValue: "~408 km",
    speedValue: "~27,600 km/h",
    lastUpdated: "Last updated",
    refreshing: "Auto-refreshing every 5 seconds",
    crew: "Current ISS Crew",
    crewLoading: "Loading crew data...",
    noCrew: "Crew data unavailable",
    people: "people in space",
    posError: "Unable to fetch ISS position. Retrying...",
    loading: "Fetching ISS position...",
    north: "N",
    south: "S",
    east: "E",
    west: "W",
    funFact: "Fun Fact",
    factText:
      "The ISS orbits Earth every ~90 minutes at 27,600 km/h, meaning astronauts see 16 sunrises and sunsets every day!",
    mapNote: "The red dot shows the current ISS position on a simplified world map",
  },
  hi: {
    title: "ISS लाइव ट्रैकर",
    subtitle:
      "पृथ्वी पर अंतर्राष्ट्रीय अंतरिक्ष स्टेशन की स्थिति को रियल-टाइम ट्रैक करें",
    latitude: "अक्षांश",
    longitude: "देशांतर",
    altitude: "ऊँचाई",
    speed: "गति",
    altitudeValue: "~408 km",
    speedValue: "~27,600 km/h",
    lastUpdated: "अंतिम अपडेट",
    refreshing: "हर 5 सेकंड ऑटो-रिफ्रेश",
    crew: "वर्तमान ISS चालक दल",
    crewLoading: "चालक दल डेटा लोड हो रहा है...",
    noCrew: "चालक दल डेटा उपलब्ध नहीं",
    people: "लोग अंतरिक्ष में",
    posError: "ISS स्थिति प्राप्त करने में असमर्थ। पुनः प्रयास हो रहा है...",
    loading: "ISS स्थिति प्राप्त हो रही है...",
    north: "N",
    south: "S",
    east: "E",
    west: "W",
    funFact: "रोचक तथ्य",
    factText:
      "ISS हर ~90 मिनट में 27,600 km/h की गति से पृथ्वी की परिक्रमा करता है, यानी अंतरिक्ष यात्री हर दिन 16 सूर्योदय और सूर्यास्त देखते हैं!",
    mapNote: "लाल बिंदु सरलीकृत विश्व मानचित्र पर ISS की वर्तमान स्थिति दिखाता है",
  },
};

// Simplified world map coastline paths (very simplified for SVG)
const worldMapPath =
  // Simplified continents outline
  "M120,95 L125,90 L135,88 L140,92 L138,100 L145,105 L148,115 L140,130 L130,135 L120,125 L115,110 L118,100 Z " + // Africa
  "M95,70 L100,65 L115,62 L130,65 L140,60 L145,65 L140,72 L135,85 L125,88 L115,82 L105,85 L95,80 Z " + // Europe
  "M145,60 L165,55 L185,58 L200,65 L195,75 L185,80 L175,85 L165,78 L155,72 L148,65 Z " + // Asia
  "M45,75 L55,65 L70,60 L80,68 L85,80 L80,95 L70,100 L55,95 L45,85 Z " + // North America
  "M60,110 L70,105 L80,110 L85,120 L80,135 L70,145 L60,140 L55,125 L58,115 Z " + // South America
  "M185,120 L200,115 L215,118 L220,125 L210,135 L195,130 L188,125 Z"; // Australia

export default function ISSTracker({ lang }: ISSTrackerProps) {
  const [position, setPosition] = useState<ISSPosition | null>(null);
  const [crew, setCrew] = useState<CrewMember[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const t = text[lang];

  const fetchPosition = useCallback(async () => {
    try {
      const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setPosition({
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: data.timestamp,
      });
      setError(false);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  }, []);

  const fetchCrew = useCallback(async () => {
    try {
      const res = await fetch("https://corsproxy.io/?url=http://api.open-notify.org/astros.json");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (data.message === "success") {
        setCrew(data.people);
      }
    } catch {
      setCrew(null);
    }
  }, []);

  useEffect(() => {
    fetchPosition();
    fetchCrew();
    const interval = setInterval(fetchPosition, 5000);
    return () => clearInterval(interval);
  }, [fetchPosition, fetchCrew]);

  // Convert lat/lon to SVG coordinates
  // Map is 260x180, with x from 0-260 (lon -180 to 180) and y from 0-180 (lat 90 to -90)
  const mapWidth = 260;
  const mapHeight = 180;
  const issX = position
    ? ((position.longitude + 180) / 360) * mapWidth
    : mapWidth / 2;
  const issY = position
    ? ((90 - position.latitude) / 180) * mapHeight
    : mapHeight / 2;

  const formatCoord = (val: number, posLabel: string, negLabel: string) => {
    const abs = Math.abs(val).toFixed(4);
    return `${abs}° ${val >= 0 ? posLabel : negLabel}`;
  };

  const issCrew = crew?.filter((c) => c.craft === "ISS") ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-text-primary mb-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {t.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary"
        >
          {t.subtitle}
        </motion.p>
      </div>

      {/* Live status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center gap-2"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span className="text-xs text-text-muted">{t.refreshing}</span>
      </motion.div>

      {loading ? (
        <div className="text-center text-text-muted py-12">{t.loading}</div>
      ) : error && !position ? (
        <div className="text-center text-red-400 py-12">{t.posError}</div>
      ) : (
        <>
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="
              max-w-2xl mx-auto p-4 rounded-2xl
              bg-[rgba(17,17,40,0.5)] backdrop-blur-sm
              border border-white/[0.06]
            "
          >
            <svg
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              className="w-full h-auto"
              style={{ maxHeight: "400px" }}
            >
              {/* Ocean background */}
              <rect
                x="0"
                y="0"
                width={mapWidth}
                height={mapHeight}
                fill="#0a0a2e"
                rx="4"
              />

              {/* Grid lines */}
              {Array.from({ length: 7 }, (_, i) => {
                const x = (mapWidth / 7) * (i + 1);
                return (
                  <line
                    key={`vg-${i}`}
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={mapHeight}
                    stroke="white"
                    strokeWidth={0.3}
                    opacity={0.06}
                  />
                );
              })}
              {Array.from({ length: 5 }, (_, i) => {
                const y = (mapHeight / 5) * (i + 1);
                return (
                  <line
                    key={`hg-${i}`}
                    x1={0}
                    y1={y}
                    x2={mapWidth}
                    y2={y}
                    stroke="white"
                    strokeWidth={0.3}
                    opacity={0.06}
                  />
                );
              })}

              {/* Equator */}
              <line
                x1={0}
                y1={mapHeight / 2}
                x2={mapWidth}
                y2={mapHeight / 2}
                stroke="#8b5cf6"
                strokeWidth={0.4}
                opacity={0.2}
                strokeDasharray="4 2"
              />

              {/* Simplified continents */}
              <path
                d={worldMapPath}
                fill="#1a3a2a"
                stroke="#10b981"
                strokeWidth={0.5}
                opacity={0.6}
              />

              {/* ISS position */}
              {position && (
                <g>
                  {/* Glow */}
                  <circle
                    cx={issX}
                    cy={issY}
                    r={12}
                    fill="red"
                    opacity={0.1}
                  />
                  <circle
                    cx={issX}
                    cy={issY}
                    r={6}
                    fill="red"
                    opacity={0.2}
                  />
                  {/* Dot */}
                  <circle
                    cx={issX}
                    cy={issY}
                    r={3}
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth={0.8}
                  />
                  {/* Label */}
                  <text
                    x={issX}
                    y={issY - 8}
                    textAnchor="middle"
                    fill="white"
                    fontSize={7}
                    fontWeight="bold"
                  >
                    ISS
                  </text>
                </g>
              )}
            </svg>
            <p className="text-[10px] text-text-muted text-center mt-2">
              {t.mapNote}
            </p>
          </motion.div>

          {/* Position data cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {[
              {
                label: t.latitude,
                value: position
                  ? formatCoord(position.latitude, t.north, t.south)
                  : "—",
                color: "#8b5cf6",
              },
              {
                label: t.longitude,
                value: position
                  ? formatCoord(position.longitude, t.east, t.west)
                  : "—",
                color: "#06b6d4",
              },
              {
                label: t.altitude,
                value: t.altitudeValue,
                color: "#f59e0b",
              },
              {
                label: t.speed,
                value: t.speedValue,
                color: "#10b981",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.08,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="
                  flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl
                  bg-[rgba(17,17,40,0.5)] backdrop-blur-sm
                  border border-white/[0.06]
                  hover:border-white/[0.12] hover:bg-[rgba(17,17,40,0.7)]
                  transition-all duration-300
                "
              >
                <p className="text-xs text-text-muted">{item.label}</p>
                <p
                  className="text-base sm:text-lg font-bold tabular-nums text-center"
                  style={{ color: item.color }}
                >
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Timestamp */}
          {position && (
            <p className="text-center text-xs text-text-muted">
              {t.lastUpdated}:{" "}
              {new Date(position.timestamp * 1000).toLocaleTimeString()}
            </p>
          )}

          {/* Crew section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="
              max-w-2xl mx-auto p-5 rounded-2xl
              bg-[rgba(17,17,40,0.5)] backdrop-blur-sm
              border border-white/[0.06]
            "
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-lg font-semibold text-text-primary"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {t.crew}
              </h3>
              {crew && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-neon-violet/10 text-neon-violet border border-neon-violet/20">
                  {crew.length} {t.people}
                </span>
              )}
            </div>

            {crew === null ? (
              <p className="text-sm text-text-muted">{t.crewLoading}</p>
            ) : issCrew.length === 0 ? (
              <p className="text-sm text-text-muted">{t.noCrew}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {issCrew.map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="
                      flex items-center gap-2 p-2.5 rounded-xl
                      bg-white/[0.03] border border-white/[0.04]
                    "
                  >
                    <div className="w-7 h-7 rounded-full bg-neon-violet/15 flex items-center justify-center text-neon-violet text-xs font-bold shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <p className="text-xs text-text-secondary truncate">
                      {member.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}

      {/* Fun fact */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="
          max-w-2xl mx-auto p-5 rounded-2xl
          bg-neon-violet/[0.06] border border-neon-violet/15
          flex items-start gap-3
        "
      >
        <span className="shrink-0 w-8 h-8 rounded-lg bg-neon-violet/15 flex items-center justify-center text-neon-violet text-sm">
          ?
        </span>
        <div>
          <p className="text-xs font-semibold text-neon-violet mb-1">{t.funFact}</p>
          <p className="text-sm text-text-secondary leading-relaxed">{t.factText}</p>
        </div>
      </motion.div>
    </div>
  );
}
