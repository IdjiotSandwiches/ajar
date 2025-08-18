import { Button } from '@/components/ui/button';

interface MultiStepFormProps {
    steps: React.ReactNode[];
    onFinish: (e: React.FormEvent) => void;
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function MultiStepForm({ steps, currentStep, setCurrentStep, onFinish }: MultiStepFormProps) {
    const isFirst = currentStep === 0;
    const isLast = currentStep === steps.length - 1;

    const next = () => {
        if (!isLast) setCurrentStep((s) => s + 1);
    };

    const back = () => {
        if (!isFirst) setCurrentStep((s) => s - 1);
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

                <Button type="button" onClick={isLast ? onFinish : next} className="rounded-full">
                    {isLast ? 'Submit' : 'Next'}
                </Button>
            </div>
        </div>
    );
}
