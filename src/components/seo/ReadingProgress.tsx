"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (total <= 0) {
        setProgress(0);
        return;
      }

      setProgress(Math.min(100, Math.max(0, (scrollTop / total) * 100)));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div aria-hidden="true" className="h-1 w-full overflow-hidden bg-slate-200/70">
      <div
        className="h-full bg-gradient-to-r from-[#0057b8] to-cyan-400 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
