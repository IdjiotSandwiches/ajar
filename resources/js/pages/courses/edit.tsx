import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Plus, Trash2 } from "react-feather";
import DetailInput from "@/components/register/detail-input";
import DetailImage from "@/components/register/detail-image";
import { BenefitStudentProps, BenefitTeacherProps, CourseOverviewProps, CourseData, LearnObjProps, ProgrammingLanguageProps } from "@/interfaces/shared";
import TeacherListField from "@/components/ui/list-teacher-field";
import { dummyCourse } from "@/dummy-data/dummy-course";

export default function CreateCoursePage() {

    const form = useForm<CourseData>({
            title: "",
            description: "",
            parent_category: null,
            category: [],
            learning_objectives: [{ id: Date.now(), learning_objective: "" }],
            benefit_for_students: [{ id: Date.now() + 1, benefit_for_students: "" }],
            benefit_for_teachers: [{ id: Date.now() + 2, benefit_for_teachers: "" }],
            course_overviews: [{ id: Date.now() + 3, course_overview: "" }],
            programming_language: [{ id: Date.now() + 4, programming_language: "" }],
            duration: 0,
            price_for_student: 0,
            discount: 0,
            teacher_salary: 0,
            course_images: [],
        });


    // ---- Category ----
    const exampleCategories = [
        { id: 1, name: "Technology" },
        { id: 2, name: "Artificial Intelligence", parent_id: 1 },
        { id: 3, name: "Network", parent_id: 1 },
        { id: 4, name: "Cyber Security", parent_id: 1 },
        { id: 5, name: "Cloud Computing", parent_id: 1 },
        { id: 6, name: "Data Science", parent_id: 1 },
        { id: 7, name: "Design" },
        { id: 8, name: "Graphic Design", parent_id: 7 },
        { id: 9, name: "UI/UX Design", parent_id: 7 },
        { id: 10, name: "Illustration", parent_id: 7 },
        { id: 11, name: "Video Maker", parent_id: 7 },
        { id: 12, name: "Logo Maker", parent_id: 7 },
    ];

    const parentCategories = exampleCategories.filter((c) => !c.parent_id);
    const subCategories = exampleCategories.filter((c) => c.parent_id);

    const selectedParent = form.data.parent_category ?? null;
    const selectedSubcategories = Array.isArray(form.data.category)
        ? form.data.category
        : [];

    const handleParentSelect = (parentId: number) => {
        form.setData({
            ...form.data,
            parent_category: parentId,
            category: [],
        });
    };

    const handleSubcategoryToggle = (subId: number, checked: boolean) => {
        const updated = checked
            ? [...selectedSubcategories, subId]
            : selectedSubcategories.filter((id: number) => id !== subId);
        form.setData("category", updated);
    };


    // ---- Learning Objectives ----
    const handleAddLearnObj = () => {
        form.setData("learning_objectives", [
            ...(form.data.learning_objectives ?? []),
            {
                id: Date.now(),
                learning_objective: "",
            },
        ]);
    };

    const handleRemoveLearnObj = (id: number) => {
        form.setData(
            "learning_objectives",
            (form.data.learning_objectives ?? []).filter((g: LearnObjProps) => g.id !== id)
        );
    };


    // ---- Benefit for Student ----
    const handleAddBenefitStudent = () => {
        form.setData("benefit_for_students", [
            ...(form.data.benefit_for_students ?? []),
            {
                id: Date.now(),
                benefit_for_students: "",
            },
        ]);
    };

    const handleRemoveBenefitStudent = (id: number) => {
        form.setData(
            "benefit_for_students",
            (form.data.benefit_for_students ?? []).filter((g: BenefitStudentProps) => g.id !== id)
        );
    };


    // ---- Benefit for Teacher ----
    const handleAddBenefitTeacher = () => {
        form.setData("benefit_for_teachers", [
            ...(form.data.benefit_for_teachers ?? []),
            {
                id: Date.now(),
                benefit_for_teachers: "",
            },
        ]);
    };

    const handleRemoveBenefitTeacher = (id: number) => {
        form.setData(
            "benefit_for_teachers",
            (form.data.benefit_for_teachers ?? []).filter((g: BenefitTeacherProps) => g.id !== id)
        );
    };


    // ---- Course Overview ----
    const handleAddCourseOverview = () => {
        form.setData("course_overviews", [
            ...(form.data.course_overviews ?? []),
            {
                id: Date.now(),
                course_overview: "",
            },
        ]);
    };

    const handleRemoveCourseOverview = (id: number) => {
        form.setData(
            "course_overviews",
            (form.data.course_overviews ?? []).filter((g: CourseOverviewProps) => g.id !== id)
        );
    };


    // ---- Programming Language ----
    const handleAddProgrammingLang = () => {
        form.setData("programming_language", [
            ...(form.data.programming_language ?? []),
            {
                id: Date.now(),
                programming_language: "",
            },
        ]);
    };

    const handleRemoveProgrammingLang = (id: number) => {
        form.setData(
            "programming_language",
            (form.data.programming_language ?? []).filter((g: ProgrammingLanguageProps) => g.id !== id)
        );
    };


    // ---- Course Image ----
    const handleImageChange = (files: File[]) => {
        form.setData("course_images", files);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form.data);
        // form.post(route("courses.store")); // nanti sesuaikan route store course
    };

    useEffect(() => {
        form.setData(dummyCourse);
    }, []);

    return (
        <div className="min-h-screen bg-[#F7FDFF]">
            <div className="max-w-4xl mx-auto p-8 bg-white mt-12 rounded-2xl shadow-sm">
                <h1 className="text-3xl font-semibold text-center text-sky-500 mb-8">
                    Edit Course
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    <DetailInput
                        type="text"
                        name="title"
                        id="title"
                        title="Title"
                        value={form.data.title}
                        onChange={(e) => form.setData("title", e.target.value)}
                    />

                    <DetailInput
                        type="textarea"
                        name="description"
                        id="description"
                        title="Description"
                        value={form.data.description ?? ""}
                        onChange={(e) => form.setData("description", e.target.value)}
                    />

                    {/* Category */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Category
                        </label>

                        {/* Parent Category */}
                        <div className="flex gap-6 mb-4 flex-wrap">
                            {parentCategories.map((parent) => (
                                <label
                                    key={parent.id}
                                    className="flex items-center space-x-2 font-medium text-gray-800 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="parent_category"
                                        checked={selectedParent === parent.id}
                                        onChange={() => handleParentSelect(parent.id)}
                                        className="hidden peer"
                                    />
                                    <span
                                        className={`w-4 h-4 rounded-full border-2 ${selectedParent === parent.id
                                            ? "border-[#3ABEFF]/70 bg-[#3ABEFF]/70"
                                            : "border-gray-400"
                                            } flex items-center justify-center transition-all`}
                                    >
                                        {selectedParent === parent.id && (
                                            <span className="w-2 h-2 bg-[#3ABEFF] rounded-full"></span>
                                        )}
                                    </span>
                                    <span className="select-none">{parent.name}</span>
                                </label>
                            ))}
                        </div>

                        {/* Subcategories */}
                        {selectedParent && (
                            <div className="ml-2 flex flex-col gap-1">
                                {subCategories
                                    .filter((sub) => sub.parent_id === selectedParent)
                                    .map((sub) => (
                                        <label
                                            key={sub.id}
                                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedSubcategories.includes(sub.id)}
                                                onChange={(e) =>
                                                    handleSubcategoryToggle(sub.id, e.target.checked)
                                                }
                                                className="hidden peer"
                                            />
                                            <span
                                                className={`w-4 h-4 rounded border flex items-center justify-center ${selectedSubcategories.includes(sub.id)
                                                    ? "bg-[#3ABEFF] border-[#3ABEFF]"
                                                    : "border-gray-400 bg-white"
                                                    } transition-all`}
                                            >
                                                {selectedSubcategories.includes(sub.id) && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-3 h-3 text-white"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8.004 8.004a1 1 0 01-1.414 0L3.293 10.71a1 1 0 011.414-1.414l3.582 3.582 7.296-7.296a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </span>
                                            <span className="text-sm select-none">{sub.name}</span>
                                        </label>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Learning Objectives */}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-3">Learning Objectives</h3>
                        {(form.data.learning_objectives ?? []).map((obj: LearnObjProps, index: number) => {
                            const isLast = index === (form.data.learning_objectives?.length ?? 1) - 1;
                            const isSingle = (form.data.learning_objectives?.length ?? 0) === 1;

                            return (
                                <div key={obj.id} className="relative flex items-center gap-4">
                                    <div className="flex-1 gap-4">
                                        <DetailInput
                                            type="textarea"
                                            name="learnObj"
                                            id={`learnObj${index + 1}`}
                                            title={`Learning Objective ${index + 1}`}
                                            value={obj.learning_objective}
                                            onChange={(e) =>
                                                form.setData(
                                                    "learning_objectives",
                                                    (form.data.learning_objectives ?? []).map((learnObj) =>
                                                        learnObj.id === obj.id
                                                            ? { ...learnObj, learning_objective: e.target.value }
                                                            : learnObj
                                                    )
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        {isLast || isSingle ? (
                                            <button
                                                type="button"
                                                onClick={handleAddLearnObj}
                                                className="text-[#3ABEFF] hover:text-[#35aee0] p-2 rounded-full"
                                            >
                                                <Plus size={18} />
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



                    {/* Benefit for Students*/}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-3">Benefit for Students</h3>
                        {(form.data.benefit_for_students ?? []).map((bsp: BenefitStudentProps, index: number) => {
                            const isLast = index === (form.data.benefit_for_students?.length ?? 1) - 1;
                            const isSingle = (form.data.benefit_for_students?.length ?? 0) === 1;

                            return (
                                <div key={bsp.id} className="relative flex items-center gap-4">
                                    <div className="flex-1 gap-4">
                                        <DetailInput
                                            type="textarea"
                                            name="benStud"
                                            id={`benStud${index + 1}`}
                                            title={`Benefit for Student ${index + 1}`}
                                            value={bsp.benefit_for_students}
                                            onChange={(e) =>
                                                form.setData(
                                                    "benefit_for_students",
                                                    (form.data.benefit_for_students ?? []).map((benStud) =>
                                                        benStud.id === bsp.id
                                                            ? { ...benStud, benefit_for_students: e.target.value }
                                                            : benStud
                                                    )
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        {isLast || isSingle ? (
                                            <button
                                                type="button"
                                                onClick={handleAddBenefitStudent}
                                                className="text-[#3ABEFF] hover:text-[#35aee0] p-2 rounded-full"
                                            >
                                                <Plus size={18} />
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


                    {/* Benefit for Teachers*/}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-3">Benefit for Teachers</h3>
                        {(form.data.benefit_for_teachers ?? []).map((bst: BenefitTeacherProps, index: number) => {
                            const isLast = index === (form.data.benefit_for_teachers?.length ?? 1) - 1;
                            const isSingle = (form.data.benefit_for_teachers?.length ?? 0) === 1;

                            return (
                                <div key={bst.id} className="relative flex items-center gap-4">
                                    <div className="flex-1 gap-4">
                                        <DetailInput
                                            type="textarea"
                                            name="benTeach"
                                            id={`benTeach${index + 1}`}
                                            title={`Benefit for Teacher ${index + 1}`}
                                            value={bst.benefit_for_teachers}
                                            onChange={(e) =>
                                                form.setData(
                                                    "benefit_for_teachers",
                                                    (form.data.benefit_for_teachers ?? []).map((benTeach) =>
                                                        benTeach.id === bst.id
                                                            ? { ...benTeach, benefit_for_teachers: e.target.value }
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
                                                className="text-[#3ABEFF] hover:text-[#35aee0] p-2 rounded-full"
                                            >
                                                <Plus size={18} />
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


                    {/* Course Overview */}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-3">Course Overview</h3>
                        {(form.data.course_overviews ?? []).map((cop: CourseOverviewProps, index: number) => {
                            const isLast = index === (form.data.course_overviews?.length ?? 1) - 1;
                            const isSingle = (form.data.course_overviews?.length ?? 0) === 1;

                            return (
                                <div key={cop.id} className="relative flex items-center gap-4">
                                    <div className="flex-1 gap-4">
                                        <DetailInput
                                            type="textarea"
                                            name="programLang"
                                            id={`csrOverview${index + 1}`}
                                            title={`Course Overview ${index + 1}`}
                                            value={cop.course_overview}
                                            onChange={(e) =>
                                                form.setData(
                                                    "course_overviews",
                                                    (form.data.course_overviews ?? []).map((courseOverview) =>
                                                        courseOverview.id === cop.id
                                                            ? { ...courseOverview, course_overview: e.target.value }
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
                                                className="text-[#3ABEFF] hover:text-[#35aee0] p-2 rounded-full"
                                            >
                                                <Plus size={18} />
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


                    {/* Programming Language */}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-3">Programming Language</h3>
                        {(form.data.programming_language ?? []).map((pl: ProgrammingLanguageProps, index: number) => {
                            const isLast = index === (form.data.programming_language?.length ?? 1) - 1;
                            const isSingle = (form.data.programming_language?.length ?? 0) === 1;

                            return (
                                <div key={pl.id} className="relative flex items-center gap-4">
                                    <div className="flex-1 gap-4">
                                        <DetailInput
                                            type="textarea"
                                            name="programLang"
                                            id={`programLang${index + 1}`}
                                            title={`Programming Language ${index + 1}`}
                                            value={pl.programming_language}
                                            onChange={(e) =>
                                                form.setData(
                                                    "programming_language",
                                                    (form.data.programming_language ?? []).map((programLang) =>
                                                        programLang.id === pl.id
                                                            ? { ...programLang, programming_language: e.target.value }
                                                            : programLang
                                                    )
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        {isLast || isSingle ? (
                                            <button
                                                type="button"
                                                onClick={handleAddProgrammingLang}
                                                className="text-[#3ABEFF] hover:text-[#35aee0] p-2 rounded-full"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveProgrammingLang(pl.id)}
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

                    {/* Duration */}
                    <DetailInput
                        type="number"
                        min="0"
                        title="Duration (Minutes)"
                        name="duration"
                        id="duration"
                        value={form.data.duration}
                        onChange={(e) => form.setData("duration", e.target.value)}
                    />


                    {/* Price for Student */}
                    <DetailInput
                        type="number"
                        min="0"
                        title="Price for Student (Rp)"
                        name="price"
                        id="price"
                        value={form.data.price_for_student}
                        onChange={(e) => form.setData("price_for_student", e.target.value)}
                    />


                    {/* Discount */}
                    <DetailInput
                        type="number"
                        min="0"
                        title="Discount (%)"
                        name="discount"
                        id="discount"
                        value={form.data.discount}
                        onChange={(e) => form.setData("discount", e.target.value)}
                    />


                    {/* Teacher Salary */}
                    <DetailInput
                        type="number"
                        min="0"
                        title="Teacher Salary (/Session)"
                        name="salary"
                        id="salary"
                        value={form.data.teacher_salary}
                        onChange={(e) => form.setData("teacher_salary", e.target.value)}
                    />


                    {/* Teachers */}
                    <TeacherListField
                        selectedTeachers={form.data.teacher ?? []}
                        onChange={(updated) => form.setData("teacher", updated)}
                    />

                    {/* Course Image */}
                    <div>
                        <h3 className="font-medium text-gray-800 mb-3">Course Image</h3>
                        <DetailImage
                            productImages={form.data.course_images}
                            onFilesChange={handleImageChange}
                            Index={0}
                            multiple={false}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-lg transition-all"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
