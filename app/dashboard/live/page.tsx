import React from "react";

const LiveRover = () => {
  return (
    <section className="flex-1 px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Live Rover
          </h1>
          <span className="inline-flex h-3 w-3 rounded-full bg-green-400 animate-pulse" aria-hidden="true"></span>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Real-time tracking
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
      </div>


      <div className="rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-2xl">
        <div className="p-1 bg-gray-50 dark:bg-gray-700 flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            LIVE STREAM • UPDATED JUST NOW
          </span>
        </div>

        <iframe
          src="/map-test.html"
          title="Live Rover Stream"
          allowFullScreen
          className="w-full h-[calc(100vh-200px)] min-h-[400px]"
          style={{ border: "none" }}
          aria-label="Interactive map showing current rover position"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default LiveRover;