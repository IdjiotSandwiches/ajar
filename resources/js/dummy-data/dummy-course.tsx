// dummy-course.ts
import { CourseData } from "@/interfaces/shared";
import { dummyTeachers } from "./dummy-teacher";

// === Daftar gambar online acak untuk course (unsplash) ===
const courseImages = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&w=800&q=80",
  "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&w=800&q=80",
  "https://images.unsplash.com/photo-1590608897129-79da98d15971?auto=format&w=800&q=80",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981d?auto=format&w=800&q=80",
  "https://images.unsplash.com/photo-1612831819393-22fdde8c6a49?auto=format&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=800&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&w=800&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&w=800&q=80",
  "https://images.unsplash.com/photo-1523473827532-1c0ed3d85b7b?auto=format&w=800&q=80",
  "https://images.unsplash.com/photo-1587620931283-d91f3d69bfc3?auto=format&w=800&q=80",
];

// === Helper: ambil minimal 2 teacher acak dari dummyTeachers ===
const getRandomTeachers = (count = 2) => {
  const shuffled = [...dummyTeachers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.max(count, 2));
};

export const dummyCourse: CourseData[] = [
  {
    title: "Fullstack Web Development Bootcamp",
    description:
      "Kursus intensif 12 minggu untuk menguasai HTML, CSS, JavaScript, React, dan Node.js hingga siap kerja.",
    parent_category: "Technology",
    category: ["Web Development", "Frontend", "Backend"],
    learning_objectives: [
      { id: 1, learning_objective: "Menguasai HTML, CSS, dan JavaScript." },
      { id: 2, learning_objective: "Membangun aplikasi dengan React dan Node.js." },
    ],
    benefit_for_students: [
      { id: 1, benefit_for_students: "Mampu membuat website dari nol." },
      { id: 2, benefit_for_students: "Sertifikat resmi kelulusan." },
    ],
    benefit_for_teachers: [],
    course_overviews: [],
    programming_language: [
      { id: 1, programming_language: "JavaScript" },
      { id: 2, programming_language: "TypeScript" },
    ],
    duration: 12,
    price_for_student: 1500000,
    discount: 10,
    teacher_salary: 700000,
    course_images: [courseImages[0]],
    teacher: getRandomTeachers(2),
    institution: "Ajar Academy",
    ratings: [5, 4, 5, 4, 5],
    reviews: ["Materi lengkap!", "Instruktur menjelaskan dengan sangat jelas."],
  },
  {
    title: "UI/UX Design Masterclass",
    description:
      "Belajar prinsip desain dan prototyping menggunakan Figma dan Design Thinking.",
    parent_category: "Design",
    category: ["UI Design", "UX Design", "Figma"],
    learning_objectives: [
      { id: 1, learning_objective: "Memahami prinsip desain UI/UX." },
      { id: 2, learning_objective: "Membuat prototipe profesional di Figma." },
    ],
    benefit_for_students: [
      { id: 1, benefit_for_students: "Portofolio desain siap kerja." },
    ],
    benefit_for_teachers: [],
    course_overviews: [],
    programming_language: [],
    duration: 8,
    price_for_student: 1200000,
    discount: 0,
    teacher_salary: 600000,
    course_images: [courseImages[1]],
    teacher: getRandomTeachers(2),
    institution: "DesignHub Indonesia",
    ratings: [4, 4, 5, 5],
    reviews: ["Kelasnya keren banget!", "Mentor sangat berpengalaman."],
  },
  {
    title: "Data Science with Python",
    description:
      "Pelajari analisis data dan machine learning menggunakan Python, Pandas, dan Scikit-Learn.",
    parent_category: "Technology",
    category: ["Data Science", "Machine Learning"],
    learning_objectives: [
      { id: 1, learning_objective: "Menganalisis dan memvisualisasikan data." },
      { id: 2, learning_objective: "Membangun model machine learning sederhana." },
    ],
    benefit_for_students: [
      { id: 1, benefit_for_students: "Keterampilan analisis data tingkat lanjut." },
    ],
    benefit_for_teachers: [],
    course_overviews: [],
    programming_language: [{ id: 1, programming_language: "Python" }],
    duration: 10,
    price_for_student: 1800000,
    discount: 5,
    teacher_salary: 900000,
    course_images: [courseImages[2]],
    teacher: getRandomTeachers(2),
    institution: "DataLab Institute",
    ratings: [4, 4, 5, 5],
    reviews: ["Sangat insightful!", "Banyak studi kasus nyata."],
  },
  {
    title: "Introduction to Cybersecurity",
    description:
      "Pelajari dasar keamanan siber, enkripsi, dan teknik melindungi sistem digital.",
    parent_category: "Technology",
    category: ["Cybersecurity", "Network"],
    learning_objectives: [
      { id: 1, learning_objective: "Memahami konsep dasar keamanan jaringan." },
    ],
    benefit_for_students: [
      { id: 1, benefit_for_students: "Kemampuan melindungi sistem digital." },
    ],
    benefit_for_teachers: [],
    course_overviews: [],
    programming_language: [{ id: 1, programming_language: "C++" }],
    duration: 6,
    price_for_student: 1000000,
    discount: 0,
    teacher_salary: 500000,
    course_images: [courseImages[3]],
    teacher: getRandomTeachers(2),
    institution: "CyberSafe Academy",
    ratings: [4, 5, 4],
    reviews: ["Sangat berguna!", "Cocok untuk pemula di bidang keamanan."],
  },
  {
    title: "Illustration for Beginners",
    description:
      "Pelajari dasar-dasar ilustrasi digital menggunakan tablet dan Adobe Illustrator.",
    parent_category: "Design",
    category: ["Illustration", "Digital Art"],
    learning_objectives: [
      { id: 1, learning_objective: "Menguasai teknik menggambar digital." },
    ],
    benefit_for_students: [
      { id: 1, benefit_for_students: "Dapat membuat karya ilustrasi digital." },
    ],
    benefit_for_teachers: [],
    course_overviews: [],
    programming_language: [],
    duration: 8,
    price_for_student: 900000,
    discount: 0,
    teacher_salary: 450000,
    course_images: [courseImages[4]],
    teacher: getRandomTeachers(2),
    institution: "Creative Studio",
    ratings: [4, 5, 5, 4],
    reviews: ["Menarik dan menyenangkan!", "Instruktur sabar menjelaskan."],
  },
];
