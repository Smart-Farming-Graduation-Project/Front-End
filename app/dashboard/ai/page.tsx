"use client"
import React, { useEffect, useRef } from "react";

const ModelPage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const resizeIframe = () => {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        // Set minimum height to viewport height
        const minHeight = window.innerHeight;
        iframe.style.height = Math.max(minHeight - 250, iframe.contentWindow.document.body.scrollHeight) + "px";
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
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
    <section className="flex-1 px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">AI Disease Detection</h1>
          <span className="inline-flex h-3 w-3 rounded-full bg-green-400 animate-pulse" />
        </div>
        <p className="text-gray-600 dark:text-gray-300">Upload plant images to detect diseases using our AI model</p>
        <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
      </div>

      <div className="rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-2xl">
        <div className="p-1 bg-gray-50 dark:bg-gray-700 flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">AI MODEL • READY FOR PREDICTION</span>
        </div>
        <iframe
          ref={iframeRef}
          src="/model-page.html"
          title="Disease Detection Interface"
          allowFullScreen
          className="w-full"
          style={{
            border: "none",
            height: "1000px", // Initial height before JS calculates actual height
            overflow: "hidden", // Prevents scrollbars within iframe
          }}
          aria-label="AI model interface for disease detection"
          loading="lazy"
          scrolling="no" // Disable internal scrolling
        />
      </div>
    </section>
  );
};

export default ModelPage;
