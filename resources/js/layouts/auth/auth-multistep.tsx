import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface MultiStepFormProps {
    steps: React.ReactNode[];
    onFinish: (e: React.FormEvent) => void;
    errors?: Record<string, string>;
    stepFields: string[][];
}

export default function MultiStepForm({ steps, onFinish, errors, stepFields }: MultiStepFormProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const isFirst = currentStep === 0;
    const isLast = currentStep === steps.length - 1;

    const next = () => {
        if (!isLast) setCurrentStep((s) => s + 1);
    };

    const back = () => {
        if (!isFirst) setCurrentStep((s) => s - 1);
    };

    const jumpToErrorStep = () => {
        if (!errors) return;
        for (let i = 0; i < stepFields.length; i++) {
            if (stepFields[i].some((field) => errors[field])) {
                setCurrentStep(i);
                break;
            }
        }
    };

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">{steps[currentStep]}</div>

            <div className="mt-4 flex justify-end gap-2">
                {!isFirst && (
                    <Button type="button" variant="ghost" onClick={back} className="rounded-full">
                        Back
                    </Button>
                )}

                <Button
                    type="button"
                    onClick={(e) => {
                        if (isLast) {
                            onFinish(e);
                            jumpToErrorStep();
                        } else {
                            next();
                        }
                    }}
                    className="rounded-full"
                >
                    {isLast ? 'Submit' : 'Next'}
                </Button>
            </div>
        </div>
    );
}
