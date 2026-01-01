import DetailImage from '@/components/detail-image';
import DetailInput from '@/components/detail-input';
import DetailSelect from '@/components/detail-select';
import LMSLayout from '@/layouts/lms-layout';
import { Form, router } from '@inertiajs/react';
import { CirclePlus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function CreateCoursePage({ course, skills, categories, errors }: any) {
    const [category, setCategory] = useState(course?.category_id);

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.visit('/');
        }
    };

    const categorySelect = categories.map((cat: any) => ({
        value: cat.id,
        label: cat.name,
    }));
    const handleCategoryChange = (val: any) => {
        setCategory(val);
    };

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

    const [image, setImage] = useState(course?.image);
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
        setRows([...rows, { skill_id: '' }]);
    };

    const handleRemoveCourseSkill = (timestamp: string, index: number) => {
        setCourseSkills((prev: any[]) => prev.filter((obj) => obj.timestamp !== timestamp));
        setRows(rows.filter((_: any, i: any) => i !== index));
    };

    const handleImageChange = (files: File[]) => {
        setImage(files[files.length - 1] || null);
    };

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                {/* <h1 className="hidden md:flex text-2xl font-semibold text-gray-800">{course ? "Course Edit" : "Course Create"}</h1> */}
                <div className="rounded-xl border p-6 shadow-sm dark:border-white/20 dark:shadow-white/20">
                    <Form
                        action={route('institute.post-course', course?.id)}
                        method="post"
                        encType="multipart/form-data"
                        className="flex flex-col gap-4"
                    >
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
                                                    className="rounded-full p-2 text-gray-500 hover:text-[#3ABEFF]"
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
                                                    className="rounded-full p-2 text-gray-500 hover:text-[#3ABEFF]"
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
                        </div>
                        <div>
                            <h3 className="mb-3 text-sm font-medium text-gray-800 dark:text-white">Course Skills</h3>
                            {courseSkills.map((row: any, index: number) => {
                                const isLast = index === (courseSkills?.length ?? 1) - 1;
                                const isSingle = (courseSkills?.length ?? 0) === 1;
                                const rowSpecificOptions = skills
                                    .filter((skill: any) => {
                                        const currentSkillId = String(skill.id);
                                        const selectedRowId = String(row.skill_id);
                                        return (
                                            currentSkillId === selectedRowId ||
                                            !allSelectedIds.some((id: string | number) => String(id) === currentSkillId)
                                        );
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
                                            {errors[`course_skills.${index}.id`] && (
                                                <p className="text-red-500">{errors[`course_skills.${index}.id`]}</p>
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
                        </div>
                        <DetailSelect
                            id={`category`}
                            name={`category`}
                            options={categorySelect}
                            title={`Category`}
                            value={String(category)}
                            onChange={(val) => handleCategoryChange(val)}
                        />
                        {errors[`category`] && <p className="text-red-500">{errors[`category`]}</p>}
                        <DetailInput type="number" min={0} title="Duration (Minutes)" name="duration" id="duration" value={course?.duration} />
                        {errors[`duration`] && <p className="text-red-500">{errors[`duration`]}</p>}
                        <DetailInput type="number" min={0} title="Price for Student (Rp)" name="price" id="price" value={course?.price} />
                        {errors[`price`] && <p className="text-red-500">{errors[`price`]}</p>}
                        <DetailInput type="number" min={0} title="Discount (%)" name="discount" id="discount" value={course?.discount} />
                        {errors[`discount`] && <p className="text-red-500">{errors[`discount`]}</p>}
                        <DetailInput
                            type="number"
                            min={0}
                            title="Teacher Salary (/Session)"
                            name="teacher_salary"
                            id="teacher_salary"
                            value={course?.teacher_salary}
                        />
                        {errors[`teacher_salary`] && <p className="text-red-500">{errors[`teacher_salary`]}</p>}
                        <div>
                            <h3 className="mb-3 text-sm font-medium text-gray-800">Course Image</h3>
                            <DetailImage
                                name="course_images"
                                productImages={image ? [image] : []}
                                onFilesChange={handleImageChange}
                                Index={0}
                                multiple={false}
                            />
                            {errors[`course_images`] && <p className="text-red-500">{errors[`course_images`]}</p>}
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="rounded-lg bg-black/80 px-6 py-2 font-semibold text-white transition-all hover:bg-black/70 dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="rounded-lg bg-[#3ABEFF] px-6 py-2 font-semibold text-white transition-all hover:bg-[#3ABEFF]/90"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

CreateCoursePage.layout = (page: any) => {
    const course = page.props.course;

    return <LMSLayout title={course ? 'Course Edit' : 'Course Create'}>{page}</LMSLayout>;
};
