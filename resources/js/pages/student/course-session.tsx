import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LMSLayout from '@/layouts/lms-layout';
import { storageUrl } from '@/utils/storage';
import { router } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';

export default function CourseSession({ course }: any) {
    const sessions = course?.sessions.map((session: any, index: number) => ({
        value: `item-${index + 1}`,
        trigger: session.description,
        content: session.link,
    }));

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr]">
            <div className="flex flex-col gap-4">
                <img
                    src={storageUrl(course?.image)}
                    alt={course.name}
                    className="max-h-[320px] w-full rounded-xl object-cover shadow-sm ring-1 ring-gray-200"
                />
                <div>
                    <h2 className="text-2xl font-semibold">{course?.name}</h2>
                    <p className="text-sm text-gray-500">{course?.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                    {!course?.has_schedule && (
                        <p className="text-muted-foreground flex items-center justify-center gap-1 text-sm">
                            <InfoIcon size={20} /> Course has no live session
                        </p>
                    )}
                    <button
                        disabled={!course?.has_schedule}
                        onClick={() => router.get(route('payment-register', { course: course.course_id }))}
                        className={`w-full rounded-xl py-3 text-sm font-semibold ${
                            course?.has_schedule
                                ? 'bg-[#3ABEFF] text-white hover:bg-[#3ABEFF]/90'
                                : 'cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-white/70'
                        }`}
                    >
                        Book Session
                    </button>
                    <button
                        onClick={() => router.get(route('my-courses'))}
                        className="cursor-pointer rounded-xl bg-black/80 py-3 text-sm font-semibold text-white transition-all hover:bg-black/70 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        Back
                    </button>
                </div>
            </div>
            <div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Learning Materials</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="multiple" defaultValue={['item-1']}>
                            {sessions.map((session: any, index: number) => (
                                <AccordionItem key={session.value} value={session.value}>
                                    <AccordionTrigger>
                                        SESSION {index + 1} : {session.trigger}
                                    </AccordionTrigger>
                                    <AccordionContent className="flex justify-center">
                                        <iframe className="aspect-video w-1/2 rounded-md" src={session.content} allowFullScreen />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

CourseSession.layout = (page: React.ReactNode) => <LMSLayout title="My Course">{page}</LMSLayout>;
