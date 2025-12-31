import ChatLayout from './layout';

export default function ChatIndex() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="tracking-tight text-gray-400">Search and select someone to start chatting with</div>
        </div>
    );
}

ChatIndex.layout = (page: React.ReactNode) => <ChatLayout>{page}</ChatLayout>;
