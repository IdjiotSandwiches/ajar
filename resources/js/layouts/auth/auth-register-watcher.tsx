import { useEffect } from 'react';

interface ErrorWatcherProps {
    errors: Record<string, string>;
    steps: string[][];
    onError: (stepIndex: number) => void;
}

export default function ErrorWatcher({ errors, steps, onError }: ErrorWatcherProps) {
    useEffect(() => {
        if (!errors || Object.keys(errors).length === 0) return;

        for (let i = 0; i < steps.length; i++) {
            const fieldsInStep = steps[i];
            if (fieldsInStep.some((key) => errors[key])) {
                onError(i);
                break;
            }
        }
    }, [errors]);

    return null;
}
