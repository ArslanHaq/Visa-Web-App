import React, { Dispatch, SetStateAction } from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  setCurrentStep: Dispatch<SetStateAction<number>>;
  lastSection: string;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  steps,
  setCurrentStep,
  lastSection,
}: StepIndicatorProps) {
  const lastAllowedIndex = steps.findIndex(step => step.includes(lastSection));
  return (
    <div className="flex flex-wrap gap-x-3">
      {steps.map((step, index) => {
        let stepColor = 'text-slate-300';
        let circleBorderColor = 'border-slate-300';
        let arrowColor = 'text-slate-300';

        if (index < currentStep) {
          stepColor = 'text-logoColorGreen';
          circleBorderColor = 'border-logoColorGreen';
          arrowColor = 'text-logoColorGreen';
        } else if (index === currentStep) {
          stepColor = 'text-logoColorBlue';
          circleBorderColor = 'border-logoColorBlue';
          arrowColor = 'text-logoColorBlue';
        }

        return (
          <div
            key={index}
            className={`mt-2 flex items-center gap-x-2 cursor-pointer`}
            onClick={() => {
              if (lastSection) {
                if (index > lastAllowedIndex) return;
                setCurrentStep(index);
              } else {
                if (index > currentStep) return;
                setCurrentStep(index);
              }
            }}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${circleBorderColor}`}
            >
              <p className={`text-xs font-semibold ${stepColor}`}>
                {index + 1}
              </p>
            </div>
            <div>
              <p className={`text-xs font-semibold lg:text-base ${stepColor}`}>
                {step}
              </p>
            </div>
            {index < totalSteps - 1 && (
              <div>
                <p className={`font-semibold ${arrowColor} `}>{'>>'}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
