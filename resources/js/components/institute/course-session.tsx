import { CirclePlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import DetailInput from '../detail-input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function CourseSession({ course, errors }: any) {
    const [sessions, setSessions] = useState(
        (course?.course_sessions?.length
            ? course.course_sessions
            : [{ id: null, description: '', video_link: '', timestamp: crypto.randomUUID() }]
        ).map((obj: any) => ({
            ...obj,
            timestamp: crypto.randomUUID(),
        })),
    );

    const handleAddSession = () => {
        setSessions((prev: any) => [...prev, { id: null, description: '', video_link: '', timestamp: crypto.randomUUID() }]);
    };

    const handleRemoveSession = (timestamp: string) => {
        setSessions((prev: any[]) => prev.filter((obj) => obj.timestamp !== timestamp));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Sessions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {sessions.map((row: any, index: number) => {
                    const isLast = index === (sessions?.length ?? 1) - 1;
                    const isSingle = (sessions?.length ?? 0) === 1;

                    return (
                        <div key={row.timestamp} className="relative flex items-center gap-4">
                            <div className={`flex-1 gap-4 ${!isLast ? 'mb-4' : ''}`}>
                                <DetailInput
                                    type="textarea"
                                    name={`course_sessions[${index}].description`}
                                    id={`course_sessions[${index}].description`}
                                    title={`Session Description ${index + 1}`}
                                    value={row?.description}
                                />
                                {errors[`course_sessions.${index}.description`] && (
                                    <p className="text-red-500">{errors[`course_sessions.${index}.description`]}</p>
                                )}
                            </div>
                            <div className={`flex-1 gap-4 ${!isLast ? 'mb-4' : ''}`}>
                                <DetailInput
                                    type="textarea"
                                    name={`course_sessions[${index}].video_link`}
                                    id={`course_sessions[${index}].video_link`}
                                    title={`Video Link ${index + 1}`}
                                    value={row?.video_link}
                                />
                                {errors[`course_sessions.${index}.video_link`] && (
                                    <p className="text-red-500">{errors[`course_sessions.${index}.video_link`]}</p>
                                )}
                            </div>
                            <div className="flex items-center">
                                {isLast || isSingle ? (
                                    <button type="button" onClick={handleAddSession} className="rounded-full p-2 text-gray-500 hover:text-[#3ABEFF]">
                                        <CirclePlus size={18} />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSession(row.timestamp)}
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
