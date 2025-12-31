import { usePage } from '@inertiajs/react';
import clsx from 'clsx';

export default function LeftBubble({ message, replyHandleState }: any) {
    const { props } = usePage();
    const user = props.auth?.user;
    return (
        <div className="col-start-1 col-end-9 p-1">
            <div className="group relative flex flex-row">
                <div
                    className={clsx(
                        message.message_deleted_at ? '' : 'lg:pr-12',
                        'rounded-md bg-gray-800 py-2 pr-3 pl-3 text-xs text-gray-300 lg:text-sm',
                    )}
                >
                    {/* Replied Chat */}
                    {message.reply && !message.message_deleted_at && (
                        <div className="mb-1.5 max-w-full rounded border-l-4 border-gray-600 bg-gray-700/50 px-2 py-1.5">
                            <div className="text-[10px] lg:text-xs">
                                <div className="mb-1 text-purple-400">
                                    {message.reply.sender_id === user?.id ? 'You' : message.reply.sender_name}
                                </div>
                                {!message.reply.message_deleted_at ? (
                                    <div
                                        className="overflow-hidden text-gray-300/80"
                                        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                                    >
                                        <div className="break-all whitespace-pre-wrap">{message.reply.message}</div>
                                    </div>
                                ) : (
                                    <div className="mr-1 flex items-center text-center text-xs text-gray-400/60 italic select-none">
                                        {message.reply.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Chat Body */}
                    {!message.message_deleted_at ? (
                        <div className="break-all whitespace-pre-wrap">{message.message}</div>
                    ) : (
                        <div className="mr-1 flex items-center justify-center text-center text-xs text-gray-400/60 italic select-none">
                            {message.message}
                        </div>
                    )}

                    {/* Chat Timestamp */}
                    {!message.message_deleted_at && (
                        <div className="flex items-center justify-end lg:-mt-2.5 lg:-mr-9">
                            <div className="text-[9px] text-gray-400/70 lg:text-[10px]">{message.sent_at}</div>
                        </div>
                    )}
                </div>

                {!message.message_deleted_at && (
                    <div className="relative">
                        <div className="absolute top-0 right-0 bottom-0 -mr-8 flex flex-row items-center justify-center text-xs text-gray-700 opacity-0 group-hover:opacity-100">
                            <button className="mr-1" onClick={() => replyHandleState(message)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="reply" fill="currentColor" className="h-5 w-5">
                                    <path d="M13.6 39.4l28 28c1.3 1.3 3.4.4 3.4-1.4V51.8c.6 0 1.2-.1 1.7-.1 12.8 0 23.2 10.3 23.2 22.9 0 5.2-1.8 9.7-5.4 14-1.4 1.6.5 4.1 2.4 3.1C79.5 85.3 87 73.4 87 59.9c0-20.2-16.7-36.5-37.3-36.5-1.6 0-3.3.1-4.7.3V10c0-1.8-2.1-2.7-3.4-1.4l-28 28c-.8.8-.8 2 0 2.8zm4.2-1.4L41 14.8V26c0 1.2 1.1 2.2 2.4 2 1.6-.3 4-.7 6.4-.7C68.1 27.3 83 41.9 83 59.9c0 9.1-3.9 17.5-10.7 23.4 1-2.7 1.6-5.6 1.6-8.6 0-14.9-12.2-26.9-27.2-26.9-3.1 0-5.7 0-5.7 2.2v11.2L17.8 38z"></path>
                                    <path d="M384-510v1684h-1784V-510H384m8-8h-1800v1700H392V-518z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* {isFirstMessage && <div className="absolute top-0 -left-2 h-4 w-4 rounded-bl-full bg-gray-800"></div>} */}
            </div>
        </div>
    );
}
