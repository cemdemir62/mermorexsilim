"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track public pages (do not track admin panel or API requests)
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    if (typeof window !== "undefined") {
      const sessionKey = "tracked_session";
      if (!sessionStorage.getItem(sessionKey)) {
        sessionStorage.setItem(sessionKey, "true");
        fetch("/api/track", { method: "POST" }).catch((err) =>
          console.error("Visitor tracker error:", err)
        );
      }
    }
  }, [pathname]);

  return null;
}
