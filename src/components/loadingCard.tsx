"use client";

import { cn } from "@/lib/utils";
import React from "react";

export default function LoadingCard() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Stacked cards animation */}
        <div className="relative w-48 sm:w-64 h-32 sm:h-40 mt-20 sm:mt-12 mx-auto">
          {[
            "from-blue-500 to-blue-600",
            "from-purple-500 to-purple-600",
            "from-pink-500 to-pink-600",
          ].map((color, index) => (
            <div
              key={index}
              className={cn(
                "absolute w-full h-24 sm:h-32 bg-gradient-to-br rounded-xl shadow-2xl transform transition-all duration-1000",
                color
              )}
              style={{
                top: `${index * 8}px`,
                left: `${index * 4}px`,
                zIndex: 4 - index,
                animation: `cardFloat 2s ease-in-out infinite ${index * 0.3}s`,
              }}>
              {/* Card content */}
              <div className="p-4 h-full flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="w-16 h-2 bg-white/30 rounded animate-pulse"></div>
                    <div className="w-12 h-1 bg-white/20 rounded animate-pulse delay-100"></div>
                  </div>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white/40 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="w-20 h-2 bg-white/30 rounded animate-pulse delay-200"></div>
                    <div className="w-16 h-2 bg-white/40 rounded animate-pulse delay-300"></div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-60">****</div>
                    <div className="font-mono text-sm">****</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading text */}
        <div className="space-y-4 sm:space-y-8">
          <p className="text-sm sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
            Loading your financial data
          </p>

          {/* Animated dots */}
          <div className="flex justify-center space-x-2 sm:space-x-4">
            {["bg-blue-400", "bg-purple-500", "bg-pink-500"].map((bgColor, i) => (
              <div
                key={i}
                className={cn("w-3 sm:w-6 h-3 sm:h-6 rounded-full animate-bounce", bgColor)}
                style={{ animationDelay: `${i * 150}ms` }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for custom animation */}
      <style jsx>{`
        @keyframes cardFloat {
          0%,
          100% {
            transform: translateY(20px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(-7deg);
          }
        }
      `}</style>
    </div>
  );
}
