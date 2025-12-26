import { router } from '@inertiajs/react';

export default function BecomeTeacherSection() {
    return (
        <section className="px-4 pt-4 pb-8 sm:px-6 md:px-12 md:pt-8 md:pb-16">
            <div className="w-full">
                <div className="flex min-h-[320px] flex-col items-stretch overflow-hidden rounded-lg bg-white shadow-md lg:flex-row dark:bg-[#222831] dark:shadow-[#ffffff]/20">
                    <div className="flex w-full flex-col justify-center gap-y-3 p-6 sm:p-8 md:p-10 lg:w-2/3 lg:p-12">
                        <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:text-2xl md:text-2xl lg:text-3xl dark:text-white">
                            Interested in becoming a Teacher at Ajar?
                            <br />
                            <span className="text-[#3ABEFF]">Register now!</span>
                        </h2>

                        <p className="mb-6 max-w-4xl text-sm leading-relaxed text-gray-600 sm:mb-8 sm:text-base md:text-sm lg:text-base dark:text-white/80">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nisi suscipit cupiditate ipsam dignissimos. Nam, neque. Animi
                            doloremque veritatis delectus nostrum molestiae quam libero placeat accusantium rerum ratione! Repellat, nisi.
                        </p>

                        <button
                            className="inline-block w-fit rounded-md bg-[#42C2FF] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#42C2FF]/90 sm:px-6 sm:py-3 sm:text-base md:px-7"
                            onClick={() => router.get(route('register.teacher'))}
                        >
                            Register
                        </button>
                    </div>

                    <div className="relative hidden w-full lg:block lg:w-1/3">
                        <img src="/images/regis-teacher.jpg" alt="Apply as a Teacher" className="h-full w-full object-cover" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/70 via-white/40 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}
