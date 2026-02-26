import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { BookUser, Check, FileQuestion, Menu, X } from 'lucide-react';
import Pagination from '../pagination';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';

export default function StudentAnswer({ students, answers, preQuestion }: any) {
    const hasStudents = students?.data && students.data.length > 0;
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Students Quizzes Answers</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 lg:hidden">
                    {!hasStudents && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <BookUser className="mb-4 h-10 w-10 text-gray-400 dark:text-white/40" />
                            <p className="text-base font-semibold text-gray-700 dark:text-white">Quiz has not been answered.</p>
                        </div>
                    )}
                    {hasStudents &&
                        students.data.map((student: any) => (
                            <div key={student.id} className="rounded-xl border p-4 shadow-sm dark:border-white/20 dark:shadow-white/20">
                                <p className="text-sm font-medium text-gray-700 dark:text-white/90">{student.name}</p>
                                <p className="mb-3 text-xs text-gray-500 dark:text-white/70">Score: {student.score == null ? '-' : student.score}</p>
                                <p className="mb-3 text-xs text-gray-500 dark:text-white/70">
                                    {student.status ? (
                                        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">Attempted</Badge>
                                    ) : (
                                        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">Not Attempted</Badge>
                                    )}
                                </p>
                                <div className="flex justify-end gap-2">
                                    {student.status && ViewQuizDetail({ id: student.id, answers })}
                                    {ViewPreQuestion({ studentId: student.student_id, enrollId: student.enroll_id, preQuestion: preQuestion })}
                                </div>
                            </div>
                        ))}
                </div>

                <div className="hidden overflow-x-auto rounded-lg border shadow-sm lg:block dark:border-white/20 dark:shadow-white/20">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="border-b bg-[#3ABEFF]/10 dark:text-white">
                            <tr>
                                <th className="p-1 text-center font-semibold">No</th>
                                <th className="p-3 text-left font-semibold">Student Name</th>
                                <th className="p-3 text-center font-semibold">Score</th>
                                <th className="p-3 text-center font-semibold">Status</th>
                                <th className="p-3 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!hasStudents && (
                                <tr>
                                    <td colSpan={5} className="p-6 text-center text-sm text-gray-500 dark:text-white/70">
                                        Quiz has not been answered.
                                    </td>
                                </tr>
                            )}
                            {hasStudents &&
                                students.data.map((student: any, index: number) => (
                                    <tr
                                        key={student.id}
                                        className={`border-b transition hover:bg-[#42C2FF]/10 ${
                                            index % 2 === 0 ? 'bg-[#F9FCFF] dark:bg-[#31363F]' : 'bg-white dark:bg-[#222831]'
                                        }`}
                                    >
                                        <td className="p-1 text-center dark:text-white">{students.from + index}</td>
                                        <td className="p-3">{student.name}</td>
                                        <td className="p-3 text-center">{student.score == null ? '-' : student.score}</td>
                                        <td className="p-3 text-center">
                                            {student.status ? (
                                                <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">Attempted</Badge>
                                            ) : (
                                                <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">Not Attempted</Badge>
                                            )}
                                        </td>
                                        <td className="space-x-2 p-3 text-center">
                                            {student.status && ViewQuizDetail({ id: student.id, answers })}
                                            {ViewPreQuestion({
                                                studentId: student.student_id,
                                                enrollId: student.enroll_id,
                                                preQuestion: preQuestion,
                                            })}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <Pagination links={students.links} />
            </CardContent>
        </Card>
    );
}

function ViewQuizDetail({ id, answers }: any) {
    const attempt = answers?.attempt;
    const handleAction = () => {
        router.reload({
            only: ['answers'],
            data: { my_course_id: id },
        });
    };

    const getUserAnswer = (questionId: number) => {
        if (!attempt) return null;
        const answer = attempt.answers?.find((a: any) => a.quiz_id === questionId);
        return answer?.selected_option_id;
    };

    const getIsCorrect = (questionId: number) => {
        if (!attempt) return false;
        const answer = attempt.answers?.find((a: any) => a.quiz_id === questionId);
        return answer?.is_correct;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button onClick={handleAction} className="cursor-pointer rounded-md bg-[#42C2FF] p-2 text-white shadow-sm hover:bg-[#42C2FF]/90">
                    <Menu />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{answers?.name}'s Quiz Results</DialogTitle>
                </DialogHeader>
                {answers?.quizzes?.map((q: any, qIndex: number) => {
                    const selected = getUserAnswer(q.id);
                    const isCorrect = getIsCorrect(q.id);
                    return (
                        <Card key={q.id}>
                            <CardHeader>
                                <CardTitle>
                                    {qIndex + 1}. {q.question}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-2">
                                    {q.options.map((opt: any) => {
                                        const isSelected = selected == opt.id;

                                        let color = 'border-gray-300';

                                        if (opt.is_correct) {
                                            color = 'border-green-500 bg-green-50';
                                        }

                                        if (isSelected && !opt.is_correct) {
                                            color = 'border-red-500 bg-red-50';
                                        }

                                        return (
                                            <label key={opt.id} className={`flex cursor-pointer items-center gap-2 rounded border p-2 ${color}`}>
                                                <input type="radio" name={`question_${q.id}`} checked={isSelected} disabled={true} />

                                                <span>{opt.option_text}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                                <div className="text-sm font-semibold">
                                    {isCorrect ? (
                                        <span className="flex items-center gap-2 text-green-600">
                                            <Check /> Correct
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2 text-red-600">
                                            <X /> Wrong
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </DialogContent>
        </Dialog>
    );
}

function ViewPreQuestion({ studentId, enrollId, preQuestion }: any) {
    const handleAction = () => {
        router.reload({
            only: ['preQuestion'],
            data: { student_id: studentId, enroll_id: enrollId },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button onClick={handleAction} className="cursor-pointer rounded-md bg-[#42C2FF] p-2 text-white shadow-sm hover:bg-[#42C2FF]/90">
                    <FileQuestion />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{preQuestion?.name}'s Question</DialogTitle>
                </DialogHeader>
                <Textarea
                    id="question"
                    name="question"
                    placeholder="Write your question for the teacher..."
                    value={preQuestion?.question}
                    disabled={true}
                />
            </DialogContent>
        </Dialog>
    );
}
