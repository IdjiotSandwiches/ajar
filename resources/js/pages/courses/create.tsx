import BenefitForStudent from '@/components/institute/benefit-for-student';
import BenefitForTeacher from '@/components/institute/benefit-for-teacher';
import CourseDetail from '@/components/institute/course-detail';
import CourseInformation from '@/components/institute/course-information';
import CourseLearningObjective from '@/components/institute/course-learning-objective';
import CourseOverview from '@/components/institute/course-overview';
import CourseQuiz from '@/components/institute/course-quiz';
import CourseSession from '@/components/institute/course-session';
import CourseSkill from '@/components/institute/course-skill';
import LMSLayout from '@/layouts/lms-layout';
import { Form, router } from '@inertiajs/react';

export default function CreateCoursePage({ course, skills, categories, errors }: any) {
    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            router.visit('/');
        }
    };

    return (
        <>
            <div className="flex min-h-screen flex-col gap-6">
                <Form action={route('institute.post-course', course?.id)} method="post" encType="multipart/form-data" className="flex flex-col gap-4">
                    <CourseInformation course={course} categories={categories} errors={errors} />
                    <CourseDetail course={course} errors={errors} />
                    <CourseSession course={course} errors={errors} />
                    <CourseQuiz course={course} errors={errors} />
                    <CourseLearningObjective course={course} errors={errors} />
                    <CourseOverview course={course} errors={errors} />
                    <CourseSkill course={course} skills={skills} errors={errors} />
                    <BenefitForStudent course={course} errors={errors} />
                    <BenefitForTeacher course={course} errors={errors} />
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
        </>
    );
}

CreateCoursePage.layout = (page: any) => {
    const course = page.props.course;
    return <LMSLayout title={course ? 'Course Edit' : 'Course Create'}>{page}</LMSLayout>;
};
