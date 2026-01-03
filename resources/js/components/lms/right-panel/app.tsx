import { Card, CardContent } from '@/components/ui/card';
import { router, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import ReminderList from './reminder-list';
import { storageUrl } from '@/utils/storage';

export default function RightPanel() {
    const { props } = usePage();
    const user = props.auth?.user;
    const roles = props.enums?.roles_enum;

    const isLoggedIn = !!user;
    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="flex flex-col gap-6">
            <Card className="relative rounded-2xl border-none shadow-sm">
                <div className={`${isLoggedIn ? '' : 'hidden'}`}>
                    <button
                        onClick={handleLogout}
                        className="absolute top-4 right-4 flex items-center gap-1 text-gray-400 transition hover:text-red-500"
                        title="Logout"
                    >
                        <LogOut size={16} /> <p className="text-sm">Logout</p>
                    </button>
                </div>

                <CardContent className="relative text-center">
                    <img src={storageUrl(user?.profile_picture)} alt={user?.name} className="mx-auto mb-3 h-20 w-20 rounded-full" />
                    <h3 className="text-lg font-semibold">{user?.name}</h3>
                    <p className="text-sm text-gray-500">{Object.keys(roles).find((key) => roles[key] === user?.role_id)}</p>
                </CardContent>
            </Card>

            <ReminderList />
        </div>
    );
}
