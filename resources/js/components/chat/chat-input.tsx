import { useForm, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import { Send } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function ChatInputMessage(props: any) {
    const { chat_with: chatWithUser }: any = usePage().props;
    const { data, setData, reset, post, processing } = useForm({
        message: '',
        reply_id: props.reply?.id,
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        setData('reply_id', props.reply?.id);
    }, [props.reply]);

    const handleInputChange = (e: any) => {
        setData('message', e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const customKeyEvent = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!processing && data.message) {
                submitHandler(e);
            }
        }
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (!data.message) return;

        post(route('chat.store', chatWithUser.uuid), {
            onSuccess: () => {
                reset();
                if (textareaRef.current) textareaRef.current.style.height = 'auto';
                props.setReply(null);
                props.setIsTyping(false);
            },
            preserveScroll: true,
        });
    };

    const onTyping = debounce(() => {
        window.Echo.private(`message.${chatWithUser.uuid}`).whisper('typing', { name: chatWithUser.name });
    }, 300);

    return (
        <>
            <form className="flex flex-1 items-center" onSubmit={submitHandler}>
                <textarea
                    name="message"
                    id="message"
                    autoComplete="off"
                    className="flex-1 resize-none overflow-y-auto rounded-xl border border-gray-200 px-4 py-2 text-sm"
                    placeholder="Type a message"
                    value={data.message}
                    rows={1}
                    onChange={handleInputChange}
                    onKeyDown={customKeyEvent}
                    onKeyUp={onTyping}
                    style={{ maxHeight: '100px', resize: 'none', overflowY: data.message ? 'auto' : 'hidden' }}
                />

                <button type="submit" disabled={processing} className="ml-2 rounded-xl bg-[#3ABEFF] p-2 text-white hover:bg-[#3ABEFF]/90">
                    <Send size={20} />
                </button>
            </form>
        </>
    );
}
