"use client";

import { Badge } from "@/components/ui/badge";
import { BodyPart } from "@/data/body-parts-content";

interface InteractiveCharacterProps {
  bodyParts: BodyPart[];
  onBodyPartClick?: (part: BodyPart) => void;
}

export default function InteractiveCharacter({
  bodyParts,
  onBodyPartClick,
}: InteractiveCharacterProps) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: "300px", height: "500px" }}
    >
      {/* Simple character representation */}
      <div className="absolute inset-0 flex flex-col items-center">
        {/* Head */}
        <div className="w-24 h-24 bg-yellow-200 rounded-full border-4 border-yellow-400 flex items-center justify-center mb-2 relative">
          <span className="text-2xl">😊</span>
          {/* Eyes */}
          <div className="absolute top-6 left-6 w-2 h-2 bg-black rounded-full"></div>
          <div className="absolute top-6 right-6 w-2 h-2 bg-black rounded-full"></div>
          {/* Mouth */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-red-400 rounded-full"></div>
        </div>

        {/* Neck */}
        <div className="w-8 h-8 bg-yellow-200 border-2 border-yellow-400 mb-2"></div>

        {/* Body */}
        <div className="w-32 h-40 bg-blue-200 border-4 border-blue-400 rounded-lg relative mb-4">
          {/* Arms */}
          <div className="absolute -left-8 top-4 w-6 h-20 bg-yellow-200 border-2 border-yellow-400 rounded-full"></div>
          <div className="absolute -right-8 top-4 w-6 h-20 bg-yellow-200 border-2 border-yellow-400 rounded-full"></div>
          {/* Hands */}
          <div className="absolute -left-10 top-20 w-4 h-4 bg-yellow-300 border-2 border-yellow-500 rounded-full"></div>
          <div className="absolute -right-6 top-20 w-4 h-4 bg-yellow-300 border-2 border-yellow-500 rounded-full"></div>
        </div>

        {/* Legs */}
        <div className="flex space-x-4">
          <div className="w-6 h-32 bg-blue-300 border-2 border-blue-500 rounded-full"></div>
          <div className="w-6 h-32 bg-blue-300 border-2 border-blue-500 rounded-full"></div>
        </div>
      </div>

      {/* Interactive labels */}
      {bodyParts.map((part, index) => (
        <div key={index} className={`absolute ${part.position} z-10`}>
          <Badge
            className="bg-white text-gray-800 border-2 border-gray-300 hover:bg-yellow-100 cursor-pointer transition-colors"
            onClick={() => {
              if (onBodyPartClick) {
                onBodyPartClick(part);
              } else {
                console.log(`Clicked: ${part.romaji}`);
              }
            }}
          >
            {part.japanese}
          </Badge>
        </div>
      ))}
    </div>
  );
}
