"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { Brain, Ear, Hand, Heart, ArrowDown } from "lucide-react";
import type { ProjectId } from "@/lib/projects";

const hotspots = [
  {
    id: "brain",
    label: "Accounting",
    part: "Brain",
    icon: Brain,
    x: 50,
    y: 9,
    side: "left",
  },
  {
    id: "ears",
    label: "Translation",
    part: "Ears",
    icon: Ear,
    x: 35,
    y: 18,
    side: "left",
  },
  {
    id: "heart",
    label: "Calculus",
    part: "Heart",
    icon: Heart,
    x: 51,
    y: 38,
    side: "right",
  },
  {
    id: "hands",
    label: "ASL Master",
    part: "Hands",
    icon: Hand,
    x: 30,
    y: 60,
    side: "left",
  },
] as const;

export default function Portrait({
  hovered,
  onHover,
  onSelect,
  reset,
}: {
  hovered: ProjectId | null;
  onHover: (id: ProjectId | null) => void;
  onSelect: (id: ProjectId) => void;
  reset: number;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const neutral = () => {
    if (stage.current)
      stage.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };
  useEffect(neutral, [reset]);
  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    if (stage.current)
      stage.current.style.transform = `rotateX(${-y * 3}deg) rotateY(${x * 5}deg)`;
  }
  return (
    <div
      className="portrait-illustration"
      onPointerMove={tilt}
      onPointerLeave={neutral}
    >
      <div className="portrait-stage" ref={stage}>
        <img
          className="portrait-art"
          src="/gaode-avatar-cute.png"
          alt="Photo-inspired illustrated portrait of Gaode, with long brown hair and a white graphic top"
          width={1024}
          height={1536}
          fetchPriority="high"
        />
        {hotspots.map(({ id, label, part, icon: Icon, x, y, side }) => (
          <button
            key={id}
            className={`portrait-pin pin-${side} ${hovered === id ? "is-active" : ""}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-label={`${part}: explore ${label}`}
            aria-controls={`project-${id}`}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(id)}
            onBlur={() => onHover(null)}
            onClick={() => onSelect(id)}
          >
            <span className="pin-point" />
            <span className="pin-connector" />
            <span className="pin-label">
              <Icon size={16} />
              {label}
              <ArrowDown size={12} />
            </span>
          </button>
        ))}
      </div>
      <span className="portrait-medium">Photo-inspired illustration</span>
    </div>
  );
}
