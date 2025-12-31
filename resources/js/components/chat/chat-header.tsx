import { storageUrl } from "@/utils/storage";
import { router, usePage } from "@inertiajs/react";

export default function ChatHeader({ user }: any) {
    const { props } = usePage();
    const roles = props.enums?.roles_enum;
    const roleName = Object.keys(roles).find(key => roles[key] === user.role_id);

    return (
        <div
            className="flex cursor-pointer items-center gap-3 border-b pb-3 dark:border-white/20"
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
    );
}
