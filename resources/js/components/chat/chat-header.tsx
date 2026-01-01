import { storageUrl } from '@/utils/storage';
import { router, usePage } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

export default function ChatHeader({ user, isMobile }: any) {
    const { props } = usePage();
    const roles = props.enums?.roles_enum;
    const roleName = Object.keys(roles).find((key) => roles[key] === user.role_id);

    return (
        <div className={`flex ${isMobile ? 'flex-shrink-0 p-2' : 'cursor-pointer pb-3'} items-center gap-3 border-b dark:border-white/20`}>
            {isMobile && (
                <button onClick={() => router.visit(route('chat.index'))}>
                    <ChevronLeft size={22} />
                </button>
            )}
            <div
                className={`flex ${isMobile ? 'flex-shrink-0' : 'cursor-pointer'} items-center gap-3`}
                onClick={() => {
                    switch (user.role_id) {
                        case roles.Teacher:
                            router.get(route('detail-teacher', user.id));
                            break;
                        case roles.Institute:
                            router.get(route('detail-institute', user.id));
                            break;
                        default:
                            break;
                    }
                }}
            >
                <img src={storageUrl(user.profile_picture)} className="h-12 w-12 rounded-full object-cover" />
                <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-white/70">{roleName}</p>
                </div>
            </div>
        </div>
    );
}
