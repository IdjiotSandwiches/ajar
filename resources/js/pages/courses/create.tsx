import DetailImage from '@/components/detail-image';
import DetailInput from '@/components/detail-input';
import AppLayout from '@/layouts/app-layout';
import { Form } from '@inertiajs/react';
import { CirclePlus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function CreateCoursePage({ course, errors }: any) {
    const [learningObjectives, setLearningObjectives] = useState(
        (course?.course_learning_objectives?.length
            ? course.course_learning_objectives
            : [{ id: null, description: '', timestamp: crypto.randomUUID() }]
        ).map((obj: any) => ({
            ...obj,
            timestamp: crypto.randomUUID(),
        })),
    );

    const [studentBenefits, setStudentBenefits] = useState(
        (course?.course_student_benefits?.length
            ? course.course_student_benefits
            : [{ id: null, description: '', timestamp: crypto.randomUUID() }]
        ).map((obj: any) => ({
            ...obj,
            timestamp: crypto.randomUUID(),
        })),
    );

    const [teacherBenefits, setTeacherBenefits] = useState(
        (course?.course_teacher_benefits?.length
            ? course.course_teacher_benefits
            : [{ id: null, description: '', timestamp: crypto.randomUUID() }]
        ).map((obj: any) => ({
            ...obj,
            timestamp: crypto.randomUUID(),
        })),
    );

    const [courseOverviews, setCourseOverviews] = useState(
        (course?.course_overviews?.length ? course.course_overviews : [{ id: null, description: '', timestamp: crypto.randomUUID() }]).map(
            (obj: any) => ({
                ...obj,
                timestamp: crypto.randomUUID(),
            }),
        ),
    );

    const [courseSkills, setCourseSkills] = useState(
        (course?.course_skills?.length ? course.course_skills : [{ id: null, description: '', timestamp: crypto.randomUUID() }]).map((obj: any) => ({
            ...obj,
            timestamp: crypto.randomUUID(),
        })),
    );

    const [image, setImage] = useState(course?.image);

    const handleAddLearnObj = () => {
        setLearningObjectives((prev: any) => [...prev, { id: null, description: '', timestamp: crypto.randomUUID() }]);
    };

    const handleRemoveLearnObj = (timestamp: string) => {
        setLearningObjectives((prev: any[]) => prev.filter((obj) => obj.timestamp !== timestamp));
    };

    const handleAddStudentBenefit = () => {
        setStudentBenefits((prev: any) => [...prev, { id: null, description: '', timestamp: crypto.randomUUID() }]);
    };

    const handleRemoveStudentBenefit = (timestamp: string) => {
        setStudentBenefits((prev: any[]) => prev.filter((obj) => obj.timestamp !== timestamp));
    };

    const handleAddTeacherBenefit = () => {
        setTeacherBenefits((prev: any) => [...prev, { id: null, description: '', timestamp: crypto.randomUUID() }]);
    };

    const handleRemoveTeacherBenefit = (timestamp: string) => {
        setTeacherBenefits((prev: any[]) => prev.filter((obj) => obj.timestamp !== timestamp));
    };

    const handleAddCourseOverview = () => {
        setCourseOverviews((prev: any) => [...prev, { id: null, description: '', timestamp: crypto.randomUUID() }]);
    };

    const handleRemoveCourseOverview = (timestamp: string) => {
        setCourseOverviews((prev: any[]) => prev.filter((obj) => obj.timestamp !== timestamp));
    };

    const handleAddCourseSkill = () => {
        setCourseSkills((prev: any) => [...prev, { id: null, description: '', timestamp: crypto.randomUUID() }]);
    };

    const handleRemoveCourseSkill = (timestamp: string) => {
        setCourseSkills((prev: any[]) => prev.filter((obj) => obj.timestamp !== timestamp));
    };

    const handleImageChange = (files: File[]) => {
        setImage(files);
    };

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-0">
                <div className="min-h-screen bg-[#F7FDFF]">
                    <div className="mx-auto mt-12 max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
                        <h1 className="mb-6 cursor-default text-center text-xl font-semibold text-[#42C2FF] sm:mb-10 sm:text-2xl">Create Course</h1>
                        <Form action={course ? route('institute.put-course') : route('institute.post-course')} method="post" className="flex flex-col gap-4">
                            <div className="mb-2 items-center gap-2">
                                <DetailInput type="text" name="name" id="name" title="Name" value={course?.name} />
                                {errors.name && <p className="text-red-500">{errors.name}</p>}
                            </div>
                            <div>
                                <DetailInput type="textarea" name="description" id="description" title="Description" value={course?.description} />
                                {errors.description && <p className="text-red-500">{errors.description}</p>}
                            </div>
                            <div>
                                <h3 className="mb-3 text-sm font-medium text-gray-800">Learning Objectives</h3>
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
                                                    <p className="text-red-500">{errors[`learning_objectives.${index}.description`]}</p>
                                                )}
                                            </div>
                                            <div className="flex items-center">
                                                {isLast || isSingle ? (
                                                    <button
                                                        type="button"
                                                        onClick={handleAddLearnObj}
                                                        className="rounded-full p-2 text-gray-500 hover:text-[#42C2FF]"
                                                    >
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
                            </div>
                            <div>
                                <h3 className="mb-3 text-sm font-medium text-gray-800">Benefit for Students</h3>
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
                                                    <p className="text-red-500">{errors[`benefit_for_students.${index}.description`]}</p>
                                                )}
                                            </div>
                                            <div className="flex items-center">
                                                {isLast || isSingle ? (
                                                    <button
                                                        type="button"
                                                        onClick={handleAddStudentBenefit}
                                                        className="rounded-full p-2 text-gray-500 hover:text-[#42C2FF]"
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
                            </div>
                            <div>
                                <h3 className="mb-3 text-sm font-medium text-gray-800">Benefit for Teachers</h3>
                                {teacherBenefits.map((row: any, index: number) => {
                                    const isLast = index === (teacherBenefits?.length ?? 1) - 1;
                                    const isSingle = (teacherBenefits?.length ?? 0) === 1;

                                    return (
                                        <div key={row.timestamp} className="relative flex items-center gap-4">
                                            <div className={`flex-1 gap-4 ${!isLast ? 'mb-4' : ''}`}>
                                                <DetailInput
                                                    type="textarea"
                                                    name={`benefit_for_teachers[${index}].description`}
                                                    id={`benefit_for_teachers[${index}].description`}
                                                    title={`Benefit for Teacher ${index + 1}`}
                                                    value={row?.description}
                                                />
                                                {errors[`benefit_for_teachers.${index}.description`] && (
                                                    <p className="text-red-500">{errors[`benefit_for_teachers.${index}.description`]}</p>
                                                )}
                                            </div>
                                            <div className="flex items-center">
                                                {isLast || isSingle ? (
                                                    <button
                                                        type="button"
                                                        onClick={handleAddTeacherBenefit}
                                                        className="rounded-full p-2 text-gray-500 hover:text-[#42C2FF]"
                                                    >
                                                        <CirclePlus size={18} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveTeacherBenefit(row.timestamp)}
                                                        className="rounded-full p-2 text-gray-500 hover:text-red-500"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <h3 className="mb-3 text-sm font-medium text-gray-800">Course Overviews</h3>
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
                                                    <p className="text-red-500">{errors[`course_overviews.${index}.description`]}</p>
                                                )}
                                            </div>
                                            <div className="flex items-center">
                                                {isLast || isSingle ? (
                                                    <button
                                                        type="button"
                                                        onClick={handleAddCourseOverview}
                                                        className="rounded-full p-2 text-gray-500 hover:text-[#42C2FF]"
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
                            </div>
                            <div>
                                <h3 className="mb-3 text-sm font-medium text-gray-800">Course Overviews</h3>
                                {courseSkills.map((row: any, index: number) => {
                                    const isLast = index === (courseSkills?.length ?? 1) - 1;
                                    const isSingle = (courseSkills?.length ?? 0) === 1;

                                    return (
                                        <div key={row.timestamp} className="relative flex items-center gap-4">
                                            <div className={`flex-1 gap-4 ${!isLast ? 'mb-4' : ''}`}>
                                                <DetailInput
                                                    type="textarea"
                                                    name={`course_skills[${index}].description`}
                                                    id={`course_skills[${index}].description`}
                                                    title={`Course Skill ${index + 1}`}
                                                    value={row?.description}
                                                />
                                                {errors[`course_skills.${index}.description`] && (
                                                    <p className="text-red-500">{errors[`course_skills.${index}.description`]}</p>
                                                )}
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
                                                        onClick={() => handleRemoveCourseSkill(row.timestamp)}
                                                        className="rounded-full p-2 text-gray-500 hover:text-red-500"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <DetailInput type="number" min={0} title="Duration (Minutes)" name="duration" id="duration" value={course?.duration} />
                            <DetailInput type="number" min={0} title="Price for Student (Rp)" name="price" id="price" value={course?.price} />

                            {/* <DetailInput
                                type="number"
                                min={0}
                                title="Discount (%)"
                                name="discount"
                                id="discount"
                                value={form.data.discount ?? 0}
                                onChange={(e) => form.setData('discount', Number(e.target.value))}
                            /> */}

                            {/* <DetailInput
                                type="number"
                                min={0}
                                title="Teacher Salary (/Session)"
                                name="teacher_salary"
                                id="teacher_salary"
                                value={form.data.teacher_salary ?? 0}
                                onChange={(e) => form.setData('teacher_salary', Number(e.target.value))}
                            /> */}

                            <div>
                                <h3 className="mb-3 text-sm font-medium text-gray-800">Course Image</h3>
                                <DetailImage productImages={course?.image ? [course?.image] : []} onFilesChange={handleImageChange} Index={0} multiple={false} />
                            </div>
                            <button
                                type="submit"
                                className="rounded-lg bg-[#42C2FF] py-2 font-semibold text-white transition-all hover:bg-[#42C2FF]/90"
                            >
                                Submit
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

CreateCoursePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
