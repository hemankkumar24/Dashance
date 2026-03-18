"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        gestureOrientation: "vertical"
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}