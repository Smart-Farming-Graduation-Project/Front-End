"use client";
import React, { useEffect, useRef } from "react";

const AlertPage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const resizeIframe = () => {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        const minHeight = window.innerHeight;
        const doc = iframe.contentWindow.document;
        const scrollHeight = doc?.body?.scrollHeight || minHeight;
        iframe.style.height = Math.max(minHeight - 250, scrollHeight) + "px";
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener("load", resizeIframe);
      const interval = setInterval(resizeIframe, 1000);
      return () => {
        iframe.removeEventListener("load", resizeIframe);
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <section className="flex-1 px-4 py-6 md:px-6 lg:px-8">
      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 md:text-4xl">
            Real-Time Alert Monitoring
          </h1>
          <span className="inline-flex h-3 w-3 rounded-full bg-red-500 animate-ping" />
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          View critical system alerts and environmental events in real time.
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full" />
      </div>

      <div className="rounded-xl shadow-2xl overflow-hidden border border-red-200 dark:border-red-600 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-2xl">
        <div className="p-2 bg-red-50 dark:bg-red-800 flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="h-3 w-3 rounded-full bg-red-600"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <span className="text-xs font-semibold text-red-700 dark:text-red-300 tracking-wide">
            LIVE STATUS • MONITORING ACTIVE
          </span>
        </div>
        <iframe
          ref={iframeRef}
          src="/alert.html"
          title="Real-Time Monitoring Dashboard"
          allowFullScreen
          className="w-full"
          style={{
            border: "none",
            height: "1000px",
            overflow: "hidden",
          }}
          aria-label="Live monitoring interface"
          loading="lazy"
          scrolling="no"
        />
      </div>
    </section>
  );
};

export default AlertPage;
