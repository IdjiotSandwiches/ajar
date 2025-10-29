import { CourseData } from "@/interfaces/shared";
import { dummyTeachers } from "./dummy-teacher";

export const dummyCourse: CourseData = {
  title: "Fullstack Web Development Bootcamp",
  description:
    "Kursus intensif selama 12 minggu untuk menjadi Fullstack Web Developer. Materi meliputi HTML, CSS, JavaScript, React, dan Node.js.",
  parent_category: 7,
  category: [8, 9],
  learning_objectives: [
    { id: 1, learning_objective: "Menguasai dasar-dasar HTML, CSS, dan JavaScript." },
    { id: 2, learning_objective: "Membangun aplikasi web dengan React dan Node.js." },
    { id: 3, learning_objective: "Menerapkan REST API dan konsep database relasional." },
  ],
  benefit_for_students: [
    { id: 1, benefit_for_students: "Dapat membuat website responsif dan interaktif." },
    { id: 2, benefit_for_students: "Mendapatkan sertifikat kelulusan." },
  ],
  benefit_for_teachers: [
    { id: 1, benefit_for_teachers: "Kesempatan mengajar dalam kelas profesional." },
    { id: 2, benefit_for_teachers: "Mendapatkan bonus dari performa kursus." },
  ],
  course_overviews: [
    { id: 1, course_overview: "Pendahuluan tentang web development." },
    { id: 2, course_overview: "Frontend dengan React." },
    { id: 3, course_overview: "Backend dengan Express & Node.js." },
  ],
  programming_language: [
    { id: 1, programming_language: "HTML" },
    { id: 2, programming_language: "CSS" },
    { id: 3, programming_language: "JavaScript" },
    { id: 4, programming_language: "TypeScript" },
  ],
  duration: 12,
  price_for_student: 1500000,
  discount: 10,
  teacher_salary: 700000,
  course_images: ["/images/image-1.jpg"],
  teacher: [
    {
      ...dummyTeachers[0],
    }, 
    {
      ...dummyTeachers[1],
    },
  ],
};
