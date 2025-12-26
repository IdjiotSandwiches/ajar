import SwitchDarkMode from "../ui/switch-dark-mode";

export default function PageHeader({ title }: { title: string }) {
    return (
        <div className="flex h-16 items-center border-b dark:border-white/20 mx-4 justify-between">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
            </h1>
            <SwitchDarkMode />
        </div>
    );
}