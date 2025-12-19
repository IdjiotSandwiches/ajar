export default function PageHeader({ title }: { title: string }) {
    return (
        <div className="flex h-16 items-center border-b mx-4">
            <h1 className="text-xl font-semibold text-gray-900">
                {title}
            </h1>
        </div>
    );
}