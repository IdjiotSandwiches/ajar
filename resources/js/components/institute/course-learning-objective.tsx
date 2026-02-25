import { CirclePlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DetailInput from '../detail-input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function CourseLearningObjective({ course, errors }: any) {
    const [learningObjectives, setLearningObjectives] = useState(
        (course?.course_learning_objectives?.length
            ? course.course_learning_objectives
            : [{ id: null, description: '', timestamp: crypto.randomUUID() }]
        ).map((obj: any) => ({
            ...obj,
            timestamp: crypto.randomUUID(),
        })),
    );

    const handleAddLearnObj = () => {
        setLearningObjectives((prev: any) => [...prev, { id: null, description: '', timestamp: crypto.randomUUID() }]);
    };

    const handleRemoveLearnObj = (timestamp: string) => {
        setLearningObjectives((prev: any[]) => prev.filter((obj) => obj.timestamp !== timestamp));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {learningObjectives.map((row: any, index: number) => {
                    const isLast = index === (learningObjectives?.length ?? 1) - 1;
                    const isSingle = (learningObjectives?.length ?? 0) === 1;

                    return (
                        <div key={row.timestamp} className="relative flex items-center gap-4">
                            <div className={`flex-1 gap-4 ${!isLast ? 'mb-4' : ''}`}>
                                <DetailInput
                                    type="textarea"
                                    name={`learning_objectives[${index}].description`}
                                    id={`learning_objectives[${index}].description`}
                                    title={`Learning Objective ${index + 1}`}
                                    value={row?.description}
                                />
                                {errors[`learning_objectives.${index}.description`] && (
                                    <p className="text-red-500 text-sm">{errors[`learning_objectives.${index}.description`]}</p>
                                )}
                            </div>
                            <div className="flex items-center">
                                {isLast || isSingle ? (
                                    <button type="button" onClick={handleAddLearnObj} className="rounded-full p-2 text-gray-500 hover:text-[#3ABEFF]">
                                        <CirclePlus size={18} />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveLearnObj(row.timestamp)}
                                        className="rounded-full p-2 text-gray-500 hover:text-red-500"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
