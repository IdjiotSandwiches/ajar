import { CirclePlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DetailInput from '../detail-input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function CourseOverview({ course, errors }: any) {
    const [courseOverviews, setCourseOverviews] = useState(
        (course?.course_overviews?.length ? course.course_overviews : [{ id: null, description: '', timestamp: crypto.randomUUID() }]).map(
            (obj: any) => ({
                ...obj,
                timestamp: crypto.randomUUID(),
            }),
        ),
    );

    const handleAddCourseOverview = () => {
        setCourseOverviews((prev: any) => [...prev, { id: null, description: '', timestamp: crypto.randomUUID() }]);
    };

    const handleRemoveCourseOverview = (timestamp: string) => {
        setCourseOverviews((prev: any[]) => prev.filter((obj) => obj.timestamp !== timestamp));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Overviews</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {courseOverviews.map((row: any, index: number) => {
                    const isLast = index === (courseOverviews?.length ?? 1) - 1;
                    const isSingle = (courseOverviews?.length ?? 0) === 1;

                    return (
                        <div key={row.timestamp} className="relative flex items-center gap-4">
                            <div className={`flex-1 gap-4 ${!isLast ? 'mb-4' : ''}`}>
                                <DetailInput
                                    type="textarea"
                                    name={`course_overviews[${index}].description`}
                                    id={`course_overviews[${index}].description`}
                                    title={`Course Overview ${index + 1}`}
                                    value={row?.description}
                                />
                                {errors[`course_overviews.${index}.description`] && (
                                    <p className="text-red-500 text-sm">{errors[`course_overviews.${index}.description`]}</p>
                                )}
                            </div>
                            <div className="flex items-center">
                                {isLast || isSingle ? (
                                    <button
                                        type="button"
                                        onClick={handleAddCourseOverview}
                                        className="rounded-full p-2 text-gray-500 hover:text-[#3ABEFF]"
                                    >
                                        <CirclePlus size={18} />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCourseOverview(row.timestamp)}
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
