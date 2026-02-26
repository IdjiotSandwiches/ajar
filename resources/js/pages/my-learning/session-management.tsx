import SessionDetail from '@/components/teacher/session-detail';
import StudentAnswer from '@/components/teacher/student-answer';
import LMSLayout from '@/layouts/lms-layout';

export default function SessionManagement({ session, students, answers, preQuestion }: any) {
    return (
        <div className="flex min-h-screen flex-col gap-6">
            <SessionDetail session={session} />
            <StudentAnswer students={students} answers={answers} preQuestion={preQuestion} />
        </div>
    );
}

SessionManagement.layout = (page: React.ReactNode) => <LMSLayout title="Session Management">{page}</LMSLayout>;
