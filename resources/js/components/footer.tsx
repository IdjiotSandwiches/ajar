import { router } from "@inertiajs/react";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="relative bg-[#42C2FF] text-white pt-12 overflow-hidden mt-24 mb-20 sm:mb-0">
            <img
                src="/images/gear.png"
                alt="gear-bg"
                className="absolute bottom-0 right-0 w-64 opacity-60 pointer-events-none select-none"
            />

            <div className="max-w-8xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 cursor-pointer">Ajar</h2>
                        <p className="text-sm leading-relaxed mb-6 cursor-default">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Consectetur dolores ipsam eum ullam accusantium ad, quae 
                            quibusdam perspiciatis in quaerat quod enim similique?
                        </p>

                        <div className="flex space-x-6 text-white">
                            <a href="#" className="hover:opacity-80 transition">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className="hover:opacity-80 transition">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="#" className="hover:opacity-80 transition">
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </div>

                    <div className="cursor-default">
                        <h3 className="text-xl font-semibold mb-4">Site Map</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <p
                                    className="hover:underline cursor-pointer"
                                    onClick={() => router.get(route("home"))}
                                >
                                    Home
                                </p>
                            </li>
                            <li>
                                <p
                                    className="hover:underline cursor-pointer"
                                    onClick={() => router.get(route("list-course"))}
                                >
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

                    <div className="cursor-default">
                        <h3 className="text-xl font-semibold mb-4">Contact</h3>
                        <p className="font-medium mb-2">Support</p>
                        <p className="text-sm mb-1">+62 812-3456-7890</p>
                        <p className="text-sm">ajar@gmail.com</p>
                    </div>
                </div>
            </div>

            <div className="bg-[#FFFAFA]/40 mt-10 py-3 text-center text-sm text-white font-medium w-full cursor-default">
                © 2025 <span className="font-semibold">Ajar</span>. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
