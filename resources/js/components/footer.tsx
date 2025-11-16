import { router } from "@inertiajs/react";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="relative bg-[#3ABEFF] text-white pt-8 overflow-hidden mt-24">
            {/* Background gear icon */}
            <img
                src="/images/gear.png"
                alt="gear-bg"
                className="absolute bottom-0 right-0 opacity-100 w-48 md:w-64"
            />

            <div className="mx-auto px-8 grid grid-cols-21 md:grid-cols-2 gap-12 relative z-10">
                {/* Left section */}
                <div>
                    <h2 className="text-3xl font-bold mb-4 cursor-pointer">Ajar</h2>
                    <p className="text-sm leading-relaxed mb-6 cursor-default">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolores ipsam eum ullam accusantium ad, quae quibusdam. Obcaecati, ipsam corrupti sed porro voluptates perspiciatis in quaerat quod enim similique? Nobis sed aut iusto velit earum at maxime hic perferendis delectus recusandae saepe repellendus, placeat neque et sit, beatae voluptas. Quo!
                    </p>
                    <div className="flex space-x-6 text-white">
                        <a href="#" className="hover:opacity-80">
                            <FaInstagram size={24} />
                        </a>
                        <a href="#" className="hover:opacity-80">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="#" className="hover:opacity-80">
                            <FaGithub size={24} />
                        </a>
                    </div>
                </div>

                <div className="flex mx-auto gap-48">
                    {/* Middle section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 cursor-default">Site Map</h3>
                        <ul className="space-y-2">
                            <li>
                                <p className="hover:underline cursor-pointer" onClick={() => router.get(route('home'))}>
                                    Home
                                </p>
                            </li>
                            <li>
                                <p className="hover:underline cursor-pointer" onClick={() => router.get(route('list-course'))}>
                                    Course
                                </p>
                            </li>
                            <li>
                                <p className="hover:underline cursor-pointer">
                                    MyLearning
                                </p>
                            </li>
                        </ul>
                    </div>

                    {/* Right section */}
                    <div className="cursor-default">
                        <h3 className="text-xl font-semibold mb-4">Contact</h3>
                        <p className="font-medium mb-2">Support</p>
                        <p className="text-sm mb-1">+6281234567890</p>
                        <p className="text-sm">ajar@gmail.com</p>
                    </div>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="bg-[#FFFAFA]/50 mt-10 py-2 text-center text-sm text-white font-medium w-full cursor-default">
                Copyright © 2025{" "}
                <span className="font-semibold text-white">Ajar</span>. All Rights
                Reserved.
            </div>
        </footer>
    );
};

export default Footer;
