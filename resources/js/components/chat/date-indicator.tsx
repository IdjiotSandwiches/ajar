export default function DateIndicator({ date }: any) {
    return (
        <>
            <div className="col-start-1 col-end-13 my-3">
                <div className="flex items-center justify-center">
                    <div className="rounded border dark:border-white/20 bg-white-800/40 px-2 text-[10.2px] leading-relaxed tracking-wide text-gray-400 dark:text-white/60 lg:px-4 lg:py-0.5">
                        {date}
                    </div>
                </div>
            </div>
        </>
    );
}
