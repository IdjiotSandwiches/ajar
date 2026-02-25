import { CirclePlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import DetailSelect from '../detail-select';

export default function CourseSkill({ course, skills, errors }: any) {
    const [rows, setRows] = useState(course?.course_skills?.length ? course.course_skills : [{ skill_id: '' }]);
    const allSelectedIds = rows.map((r: any) => r.skill_id);

    const handleSkillChange = (index: number, val: string) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], skill_id: val };
        setRows(newRows);

        setCourseSkills((prev: any) => {
            const newSkills = [...prev];
            newSkills[index] = { ...newSkills[index], skill_id: val };
            return newSkills;
        });
    };

    const [courseSkills, setCourseSkills] = useState(
        (course?.course_skills?.length ? course.course_skills : [{ id: null, description: '', timestamp: crypto.randomUUID() }]).map((obj: any) => ({
            ...obj,
            timestamp: crypto.randomUUID(),
        })),
    );

    const handleAddCourseSkill = () => {
        setCourseSkills((prev: any) => [...prev, { id: null, description: '', timestamp: crypto.randomUUID() }]);
        setRows([...rows, { skill_id: '' }]);
    };

    const handleRemoveCourseSkill = (timestamp: string, index: number) => {
        setCourseSkills((prev: any[]) => prev.filter((obj) => obj.timestamp !== timestamp));
        setRows(rows.filter((_: any, i: any) => i !== index));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {courseSkills.map((row: any, index: number) => {
                    const isLast = index === (courseSkills?.length ?? 1) - 1;
                    const isSingle = (courseSkills?.length ?? 0) === 1;
                    const rowSpecificOptions = skills
                        .filter((skill: any) => {
                            const currentSkillId = String(skill.id);
                            const selectedRowId = String(row.skill_id);
                            return currentSkillId === selectedRowId || !allSelectedIds.some((id: string | number) => String(id) === currentSkillId);
                        })
                        .map((skill: any) => ({
                            label: skill.name,
                            value: skill.id,
                        }));

                    return (
                        <div key={row.timestamp} className="relative flex items-center gap-4">
                            <div className={`flex-1 gap-4 ${!isLast ? 'mb-4' : ''}`}>
                                <DetailSelect
                                    id={`course_skills[${index}].id`}
                                    name={`course_skills[${index}].id`}
                                    options={rowSpecificOptions}
                                    title={`Course Skill ${index + 1}`}
                                    value={String(row.skill_id)}
                                    onChange={(val) => handleSkillChange(index, val)}
                                />
                                {errors[`course_skills.${index}.id`] && <p className="text-red-500 text-sm">{errors[`course_skills.${index}.id`]}</p>}
                            </div>
                            <div className="flex items-center">
                                {isLast || isSingle ? (
                                    <button
                                        type="button"
                                        onClick={handleAddCourseSkill}
                                        className="rounded-full p-2 text-gray-500 hover:text-[#42C2FF]"
                                    >
                                        <CirclePlus size={18} />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCourseSkill(row.timestamp, index)}
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
