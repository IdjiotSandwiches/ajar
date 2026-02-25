import { CirclePlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DetailInput from '../detail-input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function CourseQuiz({ course, errors }: any) {
    const [quizzes, setQuizzes] = useState(
        (course?.course_quizzes?.length
            ? course?.course_quizzes
            : [
                  {
                      id: null,
                      question: '',
                      options: [{ id: null, option_text: '', is_correct: false, timestamp: crypto.randomUUID() }],
                      timestamp: crypto.randomUUID(),
                  },
              ]
        ).map((quiz: any) => ({
            ...quiz,
            timestamp: crypto.randomUUID(),
            options: (quiz.options?.length ? quiz.options : [{ id: null, option_text: '', is_correct: false }]).map((opt: any) => ({
                ...opt,
                timestamp: crypto.randomUUID(),
            })),
        })),
    );

    const addQuiz = () => {
        setQuizzes((prev: any) => [
            ...prev,
            {
                id: null,
                question: '',
                options: [{ id: null, option_text: '', is_correct: false, timestamp: crypto.randomUUID() }],
                timestamp: crypto.randomUUID(),
            },
        ]);
    };

    const removeQuiz = (timestamp: string) => {
        setQuizzes((prev: any) => prev.filter((q: any) => q.timestamp !== timestamp));
    };

    const addOption = (quizIndex: number) => {
        const copy = [...quizzes];
        copy[quizIndex].options.push({
            id: null,
            option_text: '',
            is_correct: false,
            timestamp: crypto.randomUUID(),
        });
        setQuizzes(copy);
    };

    const removeOption = (quizIndex: number, timestamp: string) => {
        const copy = [...quizzes];
        copy[quizIndex].options = copy[quizIndex].options.filter((o: any) => o.timestamp !== timestamp);
        setQuizzes(copy);
    };

    const setCorrect = (quizIndex: number, optionIndex: number) => {
        const copy = [...quizzes];

        copy[quizIndex].options = copy[quizIndex].options.map((opt: any, i: number) => ({
            ...opt,
            is_correct: i === optionIndex,
        }));

        setQuizzes(copy);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Quiz</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
                {quizzes.map((quiz: any, qIndex: number) => {
                    const isLastQuiz = qIndex === quizzes.length - 1;
                    const isSingleQuiz = quizzes.length === 1;

                    return (
                        <div key={quiz.timestamp} className="flex flex-col gap-4 rounded-lg border p-4">
                            <div className="flex items-start gap-2">
                                <div className="flex-1">
                                    <DetailInput
                                        type="textarea"
                                        id={`quizzes[${qIndex}].question`}
                                        name={`quizzes[${qIndex}].question`}
                                        title={`Question ${qIndex + 1}`}
                                        value={quiz.question}
                                    />

                                    {errors?.[`quizzes.${qIndex}.question`] && <p className="text-red-500">{errors[`quizzes.${qIndex}.question`]}</p>}
                                </div>

                                <div className="pt-8">
                                    {isLastQuiz || isSingleQuiz ? (
                                        <button type="button" onClick={addQuiz}>
                                            <CirclePlus size={18} />
                                        </button>
                                    ) : (
                                        <button type="button" onClick={() => removeQuiz(quiz.timestamp)}>
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                {quiz.options.map((opt: any, oIndex: number) => {
                                    const isLastOpt = oIndex === quiz.options.length - 1;
                                    const isSingleOpt = quiz.options.length === 1;

                                    return (
                                        <div key={opt.timestamp} className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name={`quizzes[${qIndex}].correct`}
                                                checked={opt.is_correct}
                                                onChange={() => setCorrect(qIndex, oIndex)}
                                                className="mt-1"
                                            />

                                            <div className="flex-1">
                                                <DetailInput
                                                    type="text"
                                                    id={`quizzes[${qIndex}].options[${oIndex}].option_text`}
                                                    name={`quizzes[${qIndex}].options[${oIndex}].option_text`}
                                                    title={`Option ${oIndex + 1}`}
                                                    value={opt.option_text}
                                                />

                                                {errors?.[`quizzes.${qIndex}.options.${oIndex}.option_text`] && (
                                                    <p className="text-red-500">{errors[`quizzes.${qIndex}.options.${oIndex}.option_text`]}</p>
                                                )}
                                            </div>

                                            <input
                                                type="hidden"
                                                name={`quizzes[${qIndex}].options[${oIndex}].is_correct`}
                                                value={opt.is_correct ? 1 : 0}
                                            />

                                            <div>
                                                {isLastOpt || isSingleOpt ? (
                                                    <button type="button" onClick={() => addOption(qIndex)}>
                                                        <CirclePlus size={18} />
                                                    </button>
                                                ) : (
                                                    <button type="button" onClick={() => removeOption(qIndex, opt.timestamp)}>
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
