import ChatHeader from '@/components/chat/chat-header';
import ChatInputMessage from '@/components/chat/chat-input';
import DateIndicator from '@/components/chat/date-indicator';
import LeftBubble from '@/components/chat/left-bubble';
import RightBubble from '@/components/chat/right-bubble';
import { usePage } from '@inertiajs/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import ChatLayout from './layout';
import useMediaQuery from '@/hooks/use-media-query';

export default function ChatShow() {
    const { auth, chat_with: chatWithUser, messages }: any = usePage().props;
    const scrollRef = useRef<HTMLDivElement>(null);
    const [reply, setReply] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState<any>([]);
    const [isTyping, setIsTyping] = useState(false);
    const isMobile = useMediaQuery('(max-width: 1024px)');

    useEffect(() => {
        window.Echo.join('online-users')
            .here((users: any) => {
                setOnlineUsers(users);
            })
            .joining((user: any) => {
                setOnlineUsers((prev: any) => [...prev, user]);
            })
            .leaving((user: any) => {
                setOnlineUsers((prev: any) => prev.filter((u: any) => u.id !== user.id));
            });
    }, []);

    const replyHandleState = (message: any) => {
        setReply(message);
    };

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight);
    }, [messages, reply]);

    window.Echo.private('message.' + auth.user?.uuid).listenForWhisper('typing', () => {
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
        }, 2000);
    });

    const renderMessage = (messages: any, auth: any) => {
        return messages.map((date: any) => (
            <Fragment key={date.date}>
                <DateIndicator date={date.date} />
                {date.messages.map((message: any) => {
                    return (
                        <Fragment key={message.id}>
                            {message.sender_id === auth.user.id ? (
                                <RightBubble message={message} replyHandleState={replyHandleState} />
                            ) : (
                                <LeftBubble message={message} replyHandleState={replyHandleState} />
                            )}
                        </Fragment>
                    );
                })}
            </Fragment>
        ));
    };

    return (
        <>
            <ChatHeader user={chatWithUser} isMobile={isMobile} />
            <div className="h-screen flex-1 overflow-y-auto px-2 pb-5 lg:px-8" ref={scrollRef}>
                <div className="grid grid-cols-12">{renderMessage(messages, auth)}</div>
            </div>
            <div className={`transform transition-transform ${reply ? 'translate-y-0' : 'translate-y-full'} duration-150 ease-in-out`}>
                {reply && (
                    <div className="flex items-center p-3">
                        <div className="flex w-full items-center justify-between rounded-md border-l-4 border-[#3ABEFF] bg-gray-200/50 dark:bg-gray-700/50 px-2 py-1.5">
                            <div className="text-[10px] lg:text-xs">
                                <div className="mb-1 text-[#3ABEFF]">{reply.sender_id === auth.user.id ? 'You' : chatWithUser.name}</div>
                                <div
                                    className="overflow-hidden text-gray-600/80 dark:text-white/80"
                                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                                >
                                    <div className="whitespace-pre-wrap">{reply.message}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => replyHandleState(null)}
                                className="h-6 w-6 rounded-full text-gray-500 transition duration-300 hover:text-gray-400 focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-shrink-0 items-end border-t p-3 dark:border-white/20">
                <ChatInputMessage reply={reply} setReply={setReply} setIsTyping={setIsTyping} />
            </div>
        </>
    );
}

ChatShow.layout = (page: React.ReactNode) => <ChatLayout>{page}</ChatLayout>;
