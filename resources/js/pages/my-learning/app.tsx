import AppLayout from '@/layouts/app-layout';
import React, { useState } from 'react';

import DynamicModal from '@/components/modal/modal';
import AddLinkModal from '@/components/modal/my-learning/add-link-modal';
import { AddReviewModal } from '@/components/modal/my-learning/add-review-modal';

import CalendarSection from '@/components/lms/my-learning/calender-section';
import CourseList from '@/components/lms/my-learning/course-list';
import Sidebar from '@/components/lms/my-learning/sidebar';

import useMediaQuery from '@/hooks/use-media-query';
import { CalendarDays } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function MyLearningPage() {
    const [role] = useState<'student' | 'teacher'>('student');
    const [tab, setTab] = useState<'progress' | 'completed'>('progress');
    const [modalType, setModalType] = useState<string | null>(null);

    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const now = new Date();
    const [month, setMonth] = useState(now.getMonth());
    const [year, setYear] = useState(now.getFullYear());
    const todayString = `${year}-${month + 1}-${now.getDate()}`;

    const [selectedDate, setSelectedDate] = useState(todayString);
    const [showCalendarModal, setShowCalendarModal] = useState(false);

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

    const isMedium = useMediaQuery('(max-width: 1024px)');

    return (
        <>
            <Head title='My Learning' />
            <div className={`min-h-screen w-full bg-[#F7FCFF] ${isMedium ? 'px-6 pt-6' : 'px-20 pt-10'}`}>
                <h1 className="mb-6 text-2xl font-semibold text-gray-800">My Learning</h1>

                {isMedium && (
                    <div className="mb-6 flex items-center justify-between">
                        <Sidebar tab={tab} setTab={setTab} />

                        <button onClick={() => setShowCalendarModal(true)} className="rounded-full border bg-white p-2 shadow hover:bg-gray-50">
                            <CalendarDays className="h-5 w-5 text-gray-700" />
                        </button>
                    </div>
                )}

                <div className={`grid gap-10 ${isMedium ? 'grid-cols-1' : 'grid-cols-4 lg:grid-cols-13 xl:grid-cols-13 2xl:grid-cols-12'}`}>
                    {!isMedium && (
                        <div className="col-span-2">
                            <Sidebar tab={tab} setTab={setTab} />
                        </div>
                    )}

                    <div className={`${isMedium ? 'col-span-1' : 'col-span-7'} space-y-5`}>
                        <CourseList
                            courses={courses}
                            tab={tab}
                            role={role}
                            isCourseFinished={isCourseFinished}
                            onActionClick={handleActionClick}
                            onAddReview={handleAddReview}
                        />
                    </div>

                    {!isMedium && (
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
                    )}
                </div>

                {showCalendarModal && isMedium && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#3ABEFF]/40 backdrop-blur-sm"
                        onClick={() => setShowCalendarModal(false)}
                    >
                        <div className="w-11/12 max-w-md rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-800">Schedule</h3>
                                <button onClick={() => setShowCalendarModal(false)} className="text-gray-500 hover:text-gray-700">
                                    ✕
                                </button>
                            </div>

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
                    </div>
                )}

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

MyLearningPage.layout = (page: React.ReactNode) => {
    const is2XL = typeof window !== 'undefined' && window.matchMedia('(min-width: 1536px)').matches;

    return <AppLayout useContainer={is2XL}>{page}</AppLayout>;
};
