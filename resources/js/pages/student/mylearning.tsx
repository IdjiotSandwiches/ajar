import React, { useState } from 'react';

import DynamicModal from '@/components/modal/modal';
import AddLinkModal from '@/components/modal/my-learning/add-link-modal';
import { AddReviewModal } from '@/components/modal/my-learning/add-review-modal';

import CalendarSection from '@/components/my-learning/calender-section';
import CourseCard from '@/components/my-learning/course-card';

import useMediaQuery from '@/hooks/use-media-query';
import { Head, router } from '@inertiajs/react';
import LMSLayout from '@/layouts/lms-layout';

export default function MyLearningPage() {
    const [role] = useState<'student' | 'teacher'>('student');
    const [modalType, setModalType] = useState<string | null>(null);

    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const now = new Date();
    const [month, setMonth] = useState(now.getMonth());
    const [year, setYear] = useState(now.getFullYear());
    const todayString = `${year}-${month + 1}-${now.getDate()}`;

    const [selectedDate, setSelectedDate] = useState(todayString);

    const [courses, setCourses] = useState([
        {
            id: 1,
            title: 'Pengembangan AI & Ilmu Data menggunakan Python',
            mentor: 'Dodi Surdadi',
            institute: 'Ajar Academy',
            duration: '2 Hours',
            date: '2025-11-15',
            time: '09:00–11:00',
            image: '/images/image-1.jpg',
            meetingLink: 'https://zoom.us/j/uiux123',
            recordingLink: '',
            isApproved: false,
            status: 'progress',
        },
        {
            id: 2,
            title: 'UI/UX Design Fundamentals',
            mentor: 'Ayu Wulandari',
            institute: 'Ajar Design Lab',
            duration: '3 Hours',
            date: '2025-11-1',
            time: '13:00–16:00',
            image: '/images/image-1.jpg',
            meetingLink: 'https://zoom.us/j/uiux123',
            recordingLink: 'https://drive.google.com/rec123',
            isApproved: true,
            status: 'completed',
        },
        {
            id: 3,
            title: 'UI/UX Design Fundamentals',
            mentor: 'Ayu Wulandari',
            institute: 'Ajar Design Lab',
            duration: '3 Hours',
            date: '2025-11-1',
            time: '13:00–16:00',
            image: '/images/image-1.jpg',
            meetingLink: '',
            recordingLink: '',
            isApproved: false,
            status: 'progress',
        },
    ]);

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
        setCourses((prev) => prev.map((c) => (c.id === selectedCourse.id ? { ...c, [`${type}Link`]: value } : c)));
        setModalType('success');
    };

    const [reviewCourse, setReviewCourse] = useState(null as any);
    const [showReviewModal, setShowReviewModal] = useState(false);

    const handleAddReview = (course: any) => {
        setReviewCourse(course);
        setShowReviewModal(true);
    };

    const handleSubmitReview = (reviewData: any) => {
        setCourses((prev) => prev.map((c) => (c.id === reviewCourse.id ? { ...c, review: reviewData } : c)));
        setShowReviewModal(false);
        setModalType('success');
    };

    // const isMedium = useMediaQuery('(max-width: 1024px)');
    const isMedium = useMediaQuery('(max-width: 1536px)');


    const ongoing = courses.filter((c) => c.status === 'progress');
    const completed = courses.filter((c) => c.status === 'completed');

    return (
        <>
            <Head title="My Learning" />
            <div className="h-screen w-full">
                <h1 className="hidden md:flex mb-6 text-2xl font-semibold text-gray-800">My Learning</h1>
                <div className="grid gap-10 grid-cols-1 2xl:grid-cols-3">
                    {isMedium && (
                        <div className="col-span-1 order-1">
                            <CalendarSection
                                month={month}
                                year={year}
                                setMonth={setMonth}
                                setYear={setYear}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                todayString={todayString}
                                courses={courses}
                            />
                        </div>
                    )}

                    <div className={`${isMedium ? 'col-span-1 order-2' : 'col-span-2'} space-y-5`}>
                        <div className="rounded-2xl shadow-sm border-none">
                            <div className="bg-white rounded-2xl p-6 border">
                                <h3 className="font-semibold text-lg mb-4">Ongoing Courses</h3>
                                {ongoing.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
                                        <p className="font-medium text-gray-700 mb-1">No ongoing courses.</p>
                                        <p className="text-sm mb-4 max-w-xs">Start learning by enrolling in a course!</p>

                                        <button
                                            onClick={() => router.get(route('list-course', { category_id: 1 }))}
                                            className="bg-[#3ABEFF] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3ABEFF]/90 transition"
                                        >
                                            Browse Courses
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        {ongoing.map((course) => (
                                            <CourseCard
                                                key={course.id}
                                                {...course}
                                                role={role}
                                                status={course.status}
                                                isCourseFinished={isCourseFinished(course)}
                                                onActionClick={() => handleActionClick(course)}
                                                onAddReview={() => handleAddReview(course)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl shadow-sm border-none">
                            <div className="bg-white rounded-2xl p-6 border">
                                <h3 className="font-semibold text-lg mb-4">Completed Courses</h3>

                                {completed.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
                                        <p className="font-medium text-gray-700 mb-1">No completed courses yet.</p>
                                        <p className="text-sm mb-4 max-w-xs">Finish a course to see it here!</p>

                                        <button
                                            onClick={() => router.get(route('list-course', { category_id: 1 }))}
                                            className="bg-[#3ABEFF] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3ABEFF]/90 transition"
                                        >
                                            Browse Courses
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        {completed.map((course) => (
                                            <CourseCard
                                                key={course.id}
                                                {...course}
                                                role={role}
                                                status={course.status}
                                                isCourseFinished={isCourseFinished(course)}
                                                onActionClick={() => handleActionClick(course)}
                                                onAddReview={() => handleAddReview(course)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {!isMedium && (
                        <div className="col-span-1">
                            <CalendarSection
                                month={month}
                                year={year}
                                setMonth={setMonth}
                                setYear={setYear}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                todayString={todayString}
                                courses={courses}
                            />
                        </div>
                    )}
                </div>

                {modalType === 'warning' && (
                    <DynamicModal
                        type="warning"
                        isOpen={true}
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
                    <DynamicModal
                        type="success"
                        isOpen={true}
                        onClose={() => setModalType(null)}
                        description="Your link has been added successfully!"
                    />
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
                )}
            </div>
        </>
    );
}

MyLearningPage.layout = (page: React.ReactNode) => <LMSLayout title="My Learning">{page}</LMSLayout>;
