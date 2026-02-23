import React from 'react';

export default function Stepper({ currentStep, totalSteps = 5 }) {
  return (
    <div className="flex items-center justify-center my-8">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isPast = stepNum < currentStep;

        return (
          <div key={stepNum} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full text-base font-semibold transition-colors
                ${isActive
                  ? 'bg-blue-600 text-white'
                  : isPast
                    ? 'bg-gray-200 text-gray-400' // Using gray-200 based on the screenshot, normally it's blue if completed, but screenshot 2 shows step 1 as gray when step 2 is active. Wait, looking closely at image 2: Step 1 is gray-200 but text is gray-500. Step 2 is blue. Wait, wait, actually in image 2 step 1 is a light blue/gray? Let me check carefully.
                    // Image 2: "1" circle is gray-200 with gray-500 text. "2" circle is blue-600 with white text.
                    // Wait, let's keep it simple: Active = blue, Inactive = gray-200
                    : 'bg-gray-200 text-gray-500'
                }
                ${isActive ? 'bg-blue-600 text-white' : 'bg-[#e5e7eb] text-gray-500'}
              `}
              style={!isActive ? { backgroundColor: '#e2e8f0', color: '#64748b' } : {}}
            >
              {stepNum}
            </div>
            {stepNum !== totalSteps && (
              <div
                className="w-10 h-[2px] mx-3"
                style={{ backgroundColor: '#e2e8f0' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
