import { CirclePlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DetailInput from '../detail-input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function BenefitForStudent({ course, errors }: any) {
    const [studentBenefits, setStudentBenefits] = useState(
        (course?.course_student_benefits?.length
            ? course.course_student_benefits
            : [{ id: null, description: '', timestamp: crypto.randomUUID() }]
        ).map((obj: any) => ({
            ...obj,
            timestamp: crypto.randomUUID(),
        })),
    );

    const handleAddStudentBenefit = () => {
        setStudentBenefits((prev: any) => [...prev, { id: null, description: '', timestamp: crypto.randomUUID() }]);
    };

    const handleRemoveStudentBenefit = (timestamp: string) => {
        setStudentBenefits((prev: any[]) => prev.filter((obj) => obj.timestamp !== timestamp));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Benefit for Students</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {studentBenefits.map((row: any, index: number) => {
                    const isLast = index === (studentBenefits?.length ?? 1) - 1;
                    const isSingle = (studentBenefits?.length ?? 0) === 1;

                    return (
                        <div key={row.timestamp} className="relative flex items-center gap-4">
                            <div className={`flex-1 gap-4 ${!isLast ? 'mb-4' : ''}`}>
                                <DetailInput
                                    type="textarea"
                                    name={`benefit_for_students[${index}].description`}
                                    id={`benefit_for_students[${index}].description`}
                                    title={`Benefit for Student ${index + 1}`}
                                    value={row?.description}
                                />
                                {errors[`benefit_for_students.${index}.description`] && (
                                    <p className="text-red-500 text-sm">{errors[`benefit_for_students.${index}.description`]}</p>
                                )}
                            </div>
                            <div className="flex items-center">
                                {isLast || isSingle ? (
                                    <button
                                        type="button"
                                        onClick={handleAddStudentBenefit}
                                        className="rounded-full p-2 text-gray-500 hover:text-[#3ABEFF]"
                                    >
                                        <CirclePlus size={18} />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveStudentBenefit(row.timestamp)}
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
