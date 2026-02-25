import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { router } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

export default function Quizzes({ course }: any) {
    const attempt = course.attempt;
    const [answers, setAnswers] = useState<{ quiz_id: number; selected_option_id: number | null }[]>([]);

    const isSubmitted = !!attempt;

    const handleSelect = (quizId: number, optionId: number) => {
        if (isSubmitted) return;

        setAnswers((prev) => {
            const existingIndex = prev.findIndex((a) => a.quiz_id === quizId);

            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex].selected_option_id = optionId;
                return updated;
            }

            return [
                ...prev,
                {
                    quiz_id: quizId,
                    selected_option_id: optionId,
                },
            ];
        });
    };

    const handleSubmit = () => {
        router.post(route('submit-quiz', course.id), {
            answers,
        });
    };

    const getUserAnswer = (questionId: number) => {
        if (!attempt) return null;
        const answer = attempt.answers?.find((a: any) => a.quiz_id === questionId);
        return answer?.selected_option_id;
    };

    const getIsCorrect = (questionId: number) => {
        if (!attempt) return false;
        const answer = attempt.answers?.find((a: any) => a.quiz_id === questionId);
        return answer?.is_correct;
    };

    return (
        <div className="w-full max-w-3xl space-y-6">
            {isSubmitted && <div className="rounded-lg bg-blue-50 p-4 text-lg font-semibold">Your Score: {attempt.score} / 100</div>}

            {course.quizzes?.map((q: any, qIndex: number) => {
                const selected = isSubmitted ? getUserAnswer(q.id) : answers.find((a) => a.quiz_id === q.id)?.selected_option_id;
                const isCorrect = getIsCorrect(q.id);

                return (
                    <Card key={q.id}>
                        <CardHeader>
                            <CardTitle>
                                {qIndex + 1}. {q.question}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-2">
                                {q.options.map((opt: any) => {
                                    const isSelected = selected == opt.id;

                                    let color = 'border-gray-300';

                                    if (isSubmitted) {
                                        if (opt.is_correct) {
                                            color = 'border-green-500 bg-green-50';
                                        }

                                        if (isSelected && !opt.is_correct) {
                                            color = 'border-red-500 bg-red-50';
                                        }
                                    }

                                    return (
                                        <label key={opt.id} className={`flex cursor-pointer items-center gap-2 rounded border p-2 ${color}`}>
                                            <input
                                                type="radio"
                                                name={`question_${q.id}`}
                                                checked={isSelected}
                                                disabled={isSubmitted}
                                                onChange={() => handleSelect(q.id, opt.id)}
                                            />

                                            <span>{opt.option_text}</span>
                                        </label>
                                    );
                                })}
                            </div>
                            {isSubmitted && (
                                <div className="text-sm font-semibold">
                                    {isCorrect ? (
                                        <span className="text-green-600 flex items-center gap-2">
                                            <Check /> Correct
                                        </span>
                                    ) : (
                                        <span className="text-red-600 flex items-center gap-2">
                                            <X /> Wrong
                                        </span>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                );
            })}

            {!isSubmitted && (
                <button
                    onClick={handleSubmit}
                    className={`w-full rounded-xl bg-[#3ABEFF] py-3 text-sm font-semibold text-white hover:bg-[#3ABEFF]/90`}
                >
                    Submit Quiz
                </button>
            )}
        </div>
    );
}
