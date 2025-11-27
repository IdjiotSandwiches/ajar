import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Trash2 } from "react-feather";
import DetailInput from "@/components/detail-input";
import DetailImage from "@/components/detail-image";
import { BenefitStudentProps, BenefitTeacherProps, CourseOverviewProps, CourseData, LearnObjProps, SkillProps, Category } from "@/interfaces/shared";
// import TeacherListField from "@/components/ui/list-teacher-field";
import AppLayout from "@/layouts/app-layout";
import { dummyCourses } from "@/dummy-data/dummy-course";
import InputError from "@/components/input-error";
import { CirclePlus } from "lucide-react";
import TeacherListField from "@/components/ui/list-teacher-field";

export default function EditCoursePage({ categories }: { categories: Category[] }) {
    const { props } = usePage();
    const courseId = props.courseId as number;

    const courseData = dummyCourses.find((c) => c.id === Number(courseId));

    const getError = (field: string) => (form.errors as Record<string, string>)[field];

    const ensureArrayField = <T,>(
        key: keyof CourseData,
        defaultItem: T
    ) => {
        const value = form.data[key];
        if (!Array.isArray(value) || value.length === 0) {
            form.setData(key, [defaultItem] as any);
        }
    };

    const form = useForm<Partial<CourseData>>({
        name: "",
        description: "",
        price: 0,
        duration: 0,
        discount: 0,
        teacher_salary: 0,
        // parent_category: null,
        category: null,
        // category_id: null,

        learning_objectives: [{ id: Date.now(), description: "" }],
        benefit_for_students: [{ id: Date.now() + 1, description: "" }],
        benefit_for_teachers: [{ id: Date.now() + 2, description: "" }],
        course_overviews: [{ id: Date.now() + 3, description: "" }],

        course_skills: [{ id: Date.now() + 4, name: "" }],
        course_images: [],

        teacher: [],
        institution: null,

        ratings: [],
        reviews: []
    });

    useEffect(() => {
        ensureArrayField("learning_objectives", { id: Date.now(), description: "" });
        ensureArrayField("benefit_for_students", { id: Date.now(), description: "" });
        ensureArrayField("benefit_for_teachers", { id: Date.now(), description: "" });
        ensureArrayField("course_overviews", { id: Date.now(), description: "" });
        ensureArrayField("course_skills", { id: Date.now(), name: "" });
    }, [form.data]);

    const handleAddLearnObj = () => {
        form.setData("learning_objectives", [
            ...(form.data.learning_objectives ?? []),
            {
                id: Date.now(),
                description: "",
            },
        ]);
    };

    const handleRemoveLearnObj = (id: number) => {
        form.setData(
            "learning_objectives",
            (form.data.learning_objectives ?? []).filter((g: LearnObjProps) => g.id !== id)
        );
    };

    const handleAddBenefitStudent = () => {
        form.setData("benefit_for_students", [
            ...(form.data.benefit_for_students ?? []),
            {
                id: Date.now(),
                description: "",
            },
        ]);
    };

    const handleRemoveBenefitStudent = (id: number) => {
        form.setData(
            "benefit_for_students",
            (form.data.benefit_for_students ?? []).filter((g: BenefitStudentProps) => g.id !== id)
        );
    };

    const handleAddBenefitTeacher = () => {
        form.setData("benefit_for_teachers", [
            ...(form.data.benefit_for_teachers ?? []),
            {
                id: Date.now(),
                description: "",
            },
        ]);
    };

    const handleRemoveBenefitTeacher = (id: number) => {
        form.setData(
            "benefit_for_teachers",
            (form.data.benefit_for_teachers ?? []).filter((g: BenefitTeacherProps) => g.id !== id)
        );
    };

    const handleAddCourseOverview = () => {
        form.setData("course_overviews", [
            ...(form.data.course_overviews ?? []),
            {
                id: Date.now(),
                description: "",
            },
        ]);
    };

    const handleRemoveCourseOverview = (id: number) => {
        form.setData(
            "course_overviews",
            (form.data.course_overviews ?? []).filter((g: CourseOverviewProps) => g.id !== id)
        );
    };

    const handleAddCourseSkill = () => {
        form.setData("course_skills", [
            ...(form.data.course_skills ?? []),
            {
                id: Date.now(),
                name: "",
            },
        ]);
    };

    const handleRemoveCourseSkill = (id: number) => {
        form.setData(
            "course_skills",
            (form.data.course_skills ?? []).filter((g: SkillProps) => g.id !== id)
        );
    };

    const handleImageChange = (files: File[]) => {
        form.setData("course_images", files);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form.data);
        // form.post(route("courses.store")); // nanti sesuaikan route store course
    };

    useEffect(() => {
        if (courseData) {
            form.setData(courseData);
            //   if (courseData.category) {
            //     const parent = dummyCategories.find((c) => c.id === courseData.category)?.parent_id;
            //     setSelectedParent(parent ?? null);
            //   }
        }
    }, [courseData]);

    return (
        <div className="min-h-screen bg-[#F7FDFF] flex justify-center px-4 py-8">
            <div className="w-full bg-white rounded-2xl shadow-sm border p-6 sm:p-8 max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <h1 className="text-xl sm:text-2xl font-semibold text-center text-[#42C2FF] mb-6 sm:mb-10 cursor-default">
                    Edit Course
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="items-center gap-2 mb-2">
                        <DetailInput
                            type="text"
                            name="name"
                            id="name"
                            title="Name"
                            value={form.data.name ?? ""}
                            onChange={(e) => form.setData("name", e.target.value)}
                        />
                        <div className={getError(`name`) ? 'h-5' : ''}>
                            <InputError message={getError(`name`)} />
                        </div>
                    </div>

                    <div>
                        <DetailInput
                            type="textarea"
                            name="description"
                            id="description"
                            title="Description"
                            value={form.data.description ?? ""}
                            onChange={(e) => form.setData("description", e.target.value)}
                        />
                        <div className={getError(`description`) ? 'h-5' : ''}>
                            <InputError message={getError(`description`)} />
                        </div>
                    </div>

                    {/* <CategoryForm form={form} categories={categories} /> */}

                    <div>
                        <h3 className="text-sm font-medium text-gray-800 mb-3">Learning Objectives</h3>
                        {(form.data.learning_objectives ?? []).map((obj: LearnObjProps, index: number) => {
                            const isLast = index === (form.data.learning_objectives?.length ?? 1) - 1;
                            const isSingle = (form.data.learning_objectives?.length ?? 0) === 1;

                            return (
                                <div key={obj.id} className="relative flex items-center gap-4">
                                    <div className={`flex-1 gap-4 ${!isLast ? "mb-4" : ""}`}>
                                        <DetailInput
                                            type="textarea"
                                            name="learnObj"
                                            id={`learnObj${index}`}
                                            title={`Learning Objective ${index + 1}`}
                                            value={obj.description}
                                            onChange={(e) =>
                                                form.setData(
                                                    "learning_objectives",
                                                    (form.data.learning_objectives ?? []).map((learnObj) =>
                                                        learnObj.id === obj.id
                                                            ? { ...learnObj, description: e.target.value }
                                                            : learnObj
                                                    )
                                                )
                                            }
                                            disabled={form.processing}
                                        />
                                        <div className={getError(`learnObj${index}`) ? 'h-5' : ''}>
                                            <InputError message={getError(`learnObj${index}`)} />
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        {isLast || isSingle ? (
                                            <button
                                                type="button"
                                                onClick={handleAddLearnObj}
                                                className="text-gray-500 hover:text-[#42C2FF] p-2 rounded-full"
                                            >
                                                <CirclePlus size={18} />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveLearnObj(obj.id)}
                                                className="text-gray-500 hover:text-red-500 p-2 rounded-full"
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
                        <h3 className="text-sm font-medium text-gray-800 mb-3">Benefit for Students</h3>
                        {(form.data.benefit_for_students ?? []).map((bsp: BenefitStudentProps, index: number) => {
                            const isLast = index === (form.data.benefit_for_students?.length ?? 1) - 1;
                            const isSingle = (form.data.benefit_for_students?.length ?? 0) === 1;

                            return (
                                <div key={bsp.id} className="relative flex items-center gap-4">
                                    <div className={`flex-1 gap-4 ${!isLast ? "mb-4" : ""}`}>
                                        <DetailInput
                                            type="textarea"
                                            name="benStud"
                                            id={`benStud${index}`}
                                            title={`Benefit for Student ${index + 1}`}
                                            value={bsp.description}
                                            onChange={(e) =>
                                                form.setData(
                                                    "benefit_for_students",
                                                    (form.data.benefit_for_students ?? []).map((benStud) =>
                                                        benStud.id === bsp.id
                                                            ? { ...benStud, description: e.target.value }
                                                            : benStud
                                                    )
                                                )
                                            }
                                            disabled={form.processing}
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        {isLast || isSingle ? (
                                            <button
                                                type="button"
                                                onClick={handleAddBenefitStudent}
                                                className="text-gray-500 hover:text-[#42C2FF] p-2 rounded-full"
                                            >
                                                <CirclePlus size={18} />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveBenefitStudent(bsp.id)}
                                                className="text-gray-500 hover:text-red-500 p-2 rounded-full"
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
                        <h3 className="text-sm font-medium text-gray-800 mb-3">Benefit for Teachers</h3>
                        {(form.data.benefit_for_teachers ?? []).map((bst: BenefitTeacherProps, index: number) => {
                            const isLast = index === (form.data.benefit_for_teachers?.length ?? 1) - 1;
                            const isSingle = (form.data.benefit_for_teachers?.length ?? 0) === 1;

                            return (
                                <div key={bst.id} className="relative flex items-center gap-4">
                                    <div className={`flex-1 gap-4 ${!isLast ? "mb-4" : ""}`}>
                                        <DetailInput
                                            type="textarea"
                                            name="benTeach"
                                            id={`benTeach${index}`}
                                            title={`Benefit for Teacher ${index + 1}`}
                                            value={bst.description}
                                            onChange={(e) =>
                                                form.setData(
                                                    "benefit_for_teachers",
                                                    (form.data.benefit_for_teachers ?? []).map((benTeach) =>
                                                        benTeach.id === bst.id
                                                            ? { ...benTeach, description: e.target.value }
                                                            : benTeach
                                                    )
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        {isLast || isSingle ? (
                                            <button
                                                type="button"
                                                onClick={handleAddBenefitTeacher}
                                                className="text-gray-500 hover:text-[#42C2FF] p-2 rounded-full"
                                            >
                                                <CirclePlus size={18} />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveBenefitTeacher(bst.id)}
                                                className="text-gray-500 hover:text-red-500 p-2 rounded-full"
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
                        <h3 className="text-sm font-medium text-gray-800 mb-3">Course Overview</h3>
                        {(form.data.course_overviews ?? []).map((cop: CourseOverviewProps, index: number) => {
                            const isLast = index === (form.data.course_overviews?.length ?? 1) - 1;
                            const isSingle = (form.data.course_overviews?.length ?? 0) === 1;

                            return (
                                <div key={cop.id} className="relative flex items-center gap-4">
                                    <div className={`flex-1 gap-4 ${!isLast ? "mb-4" : ""}`}>
                                        <DetailInput
                                            type="textarea"
                                            name="programLang"
                                            id={`csrOverview${index}`}
                                            title={`Course Overview ${index + 1}`}
                                            value={cop.description}
                                            onChange={(e) =>
                                                form.setData(
                                                    "course_overviews",
                                                    (form.data.course_overviews ?? []).map((courseOverview) =>
                                                        courseOverview.id === cop.id
                                                            ? { ...courseOverview, description: e.target.value }
                                                            : courseOverview
                                                    )
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        {isLast || isSingle ? (
                                            <button
                                                type="button"
                                                onClick={handleAddCourseOverview}
                                                className="text-gray-500 hover:text-[#42C2FF] p-2 rounded-full"
                                            >
                                                <CirclePlus size={18} />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveCourseOverview(cop.id)}
                                                className="text-gray-500 hover:text-red-500 p-2 rounded-full"
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
                        <h3 className="text-sm font-medium text-gray-800 mb-3">Course Skills</h3>
                        {(form.data.course_skills ?? []).map((pl: SkillProps, index: number) => {
                            const isLast = index === (form.data.course_skills?.length ?? 1) - 1;
                            const isSingle = (form.data.course_skills?.length ?? 0) === 1;

                            return (
                                <div key={pl.id} className="relative flex items-center gap-4">
                                    <div className={`flex-1 gap-4 ${!isLast ? "mb-4" : ""}`}>
                                        <DetailInput
                                            type="textarea"
                                            name="courseSkill"
                                            id={`courseSkill${index}`}
                                            title={`Course Skill ${index + 1}`}
                                            value={pl.name}
                                            onChange={(e) =>
                                                form.setData(
                                                    "course_skills",
                                                    (form.data.course_skills ?? []).map((courseSkill) =>
                                                        courseSkill.id === pl.id
                                                            ? { ...courseSkill, name: e.target.value }
                                                            : courseSkill
                                                    )
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        {isLast || isSingle ? (
                                            <button
                                                type="button"
                                                onClick={handleAddCourseSkill}
                                                className="text-gray-500 hover:text-[#42C2FF] p-2 rounded-full"
                                            >
                                                <CirclePlus size={18} />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveCourseSkill(pl.id)}
                                                className="text-gray-500 hover:text-red-500 p-2 rounded-full"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <DetailInput
                        type="number"
                        min={0}
                        title="Duration (Minutes)"
                        name="duration"
                        id="duration"
                        value={form.data.duration ?? 0}
                        onChange={(e) => form.setData("duration", Number(e.target.value))}
                    />

                    <DetailInput
                        type="number"
                        min={0}
                        title="Price for Student (Rp)"
                        name="price"
                        id="price"
                        value={form.data.price ?? 0}
                        onChange={(e) => form.setData("price", Number(e.target.value))}
                    />

                    <DetailInput
                        type="number"
                        min={0}
                        title="Discount (%)"
                        name="discount"
                        id="discount"
                        value={form.data.discount ?? 0}
                        onChange={(e) => form.setData("discount", Number(e.target.value))}
                    />

                    <DetailInput
                        type="number"
                        min={0}
                        title="Teacher Salary (/Session)"
                        name="teacher_salary"
                        id="teacher_salary"
                        value={form.data.teacher_salary ?? 0}
                        onChange={(e) => form.setData("teacher_salary", Number(e.target.value))}
                    />

                    <TeacherListField
                        selectedTeachers={form.data.teacher ?? []}
                        onChange={(updated) => form.setData("teacher", updated)}
                    />

                    <div>
                        <h3 className="text-sm font-medium text-gray-800 mb-3">Course Image</h3>
                        <DetailImage
                            productImages={form.data.course_images}
                            onFilesChange={handleImageChange}
                            Index={0}
                            multiple={false}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#42C2FF] hover:bg-[#42C2FF]/90 text-white font-semibold py-2 rounded-lg transition-all"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}


EditCoursePage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;