import CourseSection from '@/components/lms/my-learning/course-section';
import LMSLayout from '@/layouts/lms-layout';
import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';

type LearningStatus = 'ongoing' | 'completed';

export default function MyLearningPage({ courses }: any) {
    console.log(courses);
    const { props } = usePage();
    const states = props.enums?.learning_status_enum;

    const [role] = useState<'student' | 'teacher'>('student');
    const [modalType, setModalType] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const now = new Date();
    const [month, setMonth] = useState(now.getMonth());
    const [year, setYear] = useState(now.getFullYear());
    const todayString = `${year}-${month + 1}-${now.getDate()}`;
    const [selectedDate, setSelectedDate] = useState(todayString);

    const [activeStatus, setActiveStatus] = useState<LearningStatus>('ongoing');

    // const [courses, setCourses] = useState([
    //     {
    //         id: 1,
    //         title: 'Pengembangan AI & Ilmu Data menggunakan Python',
    //         mentor: 'Dodi Surdadi',
    //         institute: 'Ajar Academy',
    //         duration: '2 Hours',
    //         date: '2025-11-15',
    //         time: '09:00–11:00',
    //         image: '/images/image-1.jpg',
    //         meetingLink: 'https://zoom.us/j/uiux123',
    //         recordingLink: '',
    //         isApproved: false,
    //         status: 'progress',
    //     },
    //     {
    //         id: 2,
    //         title: 'UI/UX Design Fundamentals',
    //         mentor: 'Ayu Wulandari',
    //         institute: 'Ajar Design Lab',
    //         duration: '3 Hours',
    //         date: '2025-11-1',
    //         time: '13:00–16:00',
    //         image: '/images/image-1.jpg',
    //         meetingLink: 'https://zoom.us/j/uiux123',
    //         recordingLink: 'https://drive.google.com/rec123',
    //         isApproved: true,
    //         status: 'completed',
    //     },
    //     {
    //         id: 3,
    //         title: 'UI/UX Design Fundamentals',
    //         mentor: 'Ayu Wulandari',
    //         institute: 'Ajar Design Lab',
    //         duration: '3 Hours',
    //         date: '2025-11-1',
    //         time: '13:00–16:00',
    //         image: '/images/image-1.jpg',
    //         meetingLink: '',
    //         recordingLink: '',
    //         isApproved: false,
    //         status: 'progress',
    //     },
    // ]);

    // const ongoing = courses.filter((c) => c.status === 'progress');
    // const completed = courses.filter((c) => c.status === 'completed');

    // const learningMap: Record<LearningStatus, any[]> = {
    //     ongoing,
    //     completed,
    // };

    const isCourseFinished = (course: any) => new Date(course.date) < now;

    const handleActionClick = (course: any) => {
        setSelectedCourse(course);

        if (!course.meetingLink) {
            setModalType('warning');
        } else {
            window.open(course.meetingLink, '_blank');
        }
    };

    const handleSubmitLink = (type: 'meeting' | 'recording', value: string) => {
        if (!selectedCourse) return;

        // setCourses((prev) => prev.map((c) => (c.id === selectedCourse.id ? { ...c, [`${type}Link`]: value } : c)));
        setModalType('success');
    };

    const [reviewCourse, setReviewCourse] = useState<any>(null);
    const [showReviewModal, setShowReviewModal] = useState(false);

    const handleAddReview = (course: any) => {
        setReviewCourse(course);
        setShowReviewModal(true);
    };

    const handleSubmitReview = (reviewData: any) => {
        // setCourses((prev) => prev.map((c) => (c.id === reviewCourse.id ? { ...c, review: reviewData } : c)));
        setShowReviewModal(false);
        setModalType('success');
    };

    return (
        <div className="w-full space-y-4">
            <div className="2xl:hidden">
                {/* <CalendarSection
                    month={month}
                    year={year}
                    setMonth={setMonth}
                    setYear={setYear}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    todayString={todayString}
                    courses={courses}
                /> */}
            </div>

            <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">
                <div className="space-y-4 2xl:col-span-2">
                    <CourseSection courses={courses} />
                </div>

                <div className="hidden 2xl:col-span-1 2xl:inline">
                    {/* <CalendarSection
                        month={month}
                        year={year}
                        setMonth={setMonth}
                        setYear={setYear}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        todayString={todayString}
                        courses={courses}
                    /> */}
                </div>
            </div>

            {/* {modalType === 'warning' && (
                <DynamicModal
                    type="warning"
                    isOpen
                    onClose={() => setModalType(null)}
                    description="Your course has not started yet. You can join 10 minutes before schedule."
                />
            )}

            {modalType === 'addMeeting' && (
                <AddLinkModal
                    title="Meeting Link"
                    placeholder="Link Meeting"
                    onSubmit={(v) => handleSubmitLink('meeting', v)}
                    onClose={() => setModalType(null)}
                />
            )}

            {modalType === 'addRecording' && (
                <AddLinkModal
                    title="Recording Link"
                    placeholder="Link Recording"
                    onSubmit={(v) => handleSubmitLink('recording', v)}
                    onClose={() => setModalType(null)}
                />
            )}

            {modalType === 'success' && (
                <DynamicModal type="success" isOpen onClose={() => setModalType(null)} description="Your link has been added successfully!" />
            )}

            {showReviewModal && reviewCourse && (
                <AddReviewModal
                    onSubmit={handleSubmitReview}
                    onClose={() => setShowReviewModal(false)}
                    teacher={{
                        image: reviewCourse.image,
                        name: reviewCourse.mentor,
                        role: 'Teacher',
                    }}
                    institute={{
                        image: reviewCourse.image,
                        name: reviewCourse.institute,
                        role: 'Institute',
                    }}
                    course={{
                        image: reviewCourse.image,
                        name: reviewCourse.title,
                    }}
                />
            )} */}
        </div>
    );
}

MyLearningPage.layout = (page: React.ReactNode) => <LMSLayout title="My Learning">{page}</LMSLayout>;
