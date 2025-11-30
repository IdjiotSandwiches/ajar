import { CourseData } from "@/interfaces/shared";
import { dummyTeachers } from "./dummy-teacher";
import { dummyInstitutions } from "./dummy-institute";

export const dummyCourses: CourseData[] = [
  // 1️⃣
  {
    id: 1,
    name: "Introduction to Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript to build your first website.",
    price: 499000,
    duration: 120,
    discount: 10,
    category: 2,
    learning_objectives: [
      { id: 1, description: "Understand HTML structure", course_id: 1 },
      { id: 2, description: "Style pages with CSS", course_id: 1 },
      { id: 3, description: "Create interactive features using JavaScript", course_id: 1 },
    ],
    benefit_for_students: [
      { id: 1, description: "Build real web projects", course_id: 1 },
      { id: 2, description: "Understand the fundamentals of web technology", course_id: 1 },
    ],
    benefit_for_teachers: [
      { id: 1, description: "Enhance teaching portfolio with web development expertise" },
      { id: 2, description: "Expand professional network among web developers" },
      { id: 3, description: "Receive recognition as a certified web instructor" },
    ],
    course_overviews: [
      { id: 1, description: "Module 1: HTML Basics", course_id: 1 },
      { id: 2, description: "Module 2: CSS Layouts", course_id: 1 },
    ],
    course_skills: [
      { id: 1, name: "HTML" },
      { id: 2, name: "CSS" },
      { id: 3, name: "JavaScript" },
    ],
    course_images: ["images/regis-teacher.jpg"],
    teacher: [dummyTeachers[0], dummyTeachers[1]],
    institution: dummyInstitutions[0],
    ratings: [5, 4, 5],
    reviews: ["Great course!", "Very beginner friendly."],
    teacher_salary: 2500000,
  },

  // 2️⃣
  {
    id: 2,
    name: "Advanced React.js Mastery",
    description: "Master modern React patterns, hooks, and performance optimization.",
    price: 799000,
    duration: 180,
    discount: 15,
    category: 3,
    learning_objectives: [
      { id: 1, description: "Learn React Hooks deeply", course_id: 2 },
      { id: 2, description: "Build scalable apps with Redux Toolkit", course_id: 2 },
    ],
    benefit_for_students: [
      { id: 1, description: "Build production-ready React apps", course_id: 2 },
    ],
    benefit_for_teachers: [
      { id: 1, description: "Showcase advanced React.js skills to global learners" },
      { id: 2, description: "Collaborate with industry experts and open-source contributors" },
      { id: 3, description: "Earn additional income through course enrollments" },
    ],
    course_overviews: [
      { id: 1, description: "Module 1: React Essentials Recap", course_id: 2 },
      { id: 2, description: "Module 2: Advanced Hooks and Context", course_id: 2 },
    ],
    course_skills: [
      { id: 1, name: "React.js" },
      { id: 2, name: "Redux" },
      { id: 3, name: "TypeScript" },
    ],
    course_images: ["images/regis-teacher.jpg"],
    teacher: [dummyTeachers[1], dummyTeachers[2]],
    institution: dummyInstitutions[1],
    ratings: [5, 5, 4, 5],
    reviews: ["Super detailed!", "The best React course I’ve taken."],
    teacher_salary: 4000000,
  },

  // 3️⃣
  {
    id: 3,
    name: "Data Science with Python",
    description: "Analyze and visualize data using Python, Pandas, and Matplotlib.",
    price: 699000,
    duration: 150,
    category: 4,
    learning_objectives: [
      { id: 1, description: "Master data manipulation with Pandas", course_id: 3 },
      { id: 2, description: "Visualize insights using Matplotlib", course_id: 3 },
    ],
    benefit_for_students: [
      { id: 1, description: "Prepare for a career in data analysis", course_id: 3 },
    ],
    benefit_for_teachers: [
      { id: 1, description: "Contribute to the growing data science community" },
      { id: 2, description: "Build credibility as a Python data expert" },
      { id: 3, description: "Collaborate with analytics professionals and students" },
    ],
    course_overviews: [
      { id: 1, description: "Module 1: Python for Data Science", course_id: 3 },
      { id: 2, description: "Module 2: Exploratory Data Analysis", course_id: 3 },
    ],
    course_skills: [
      { id: 1, name: "Python" },
      { id: 2, name: "Pandas" },
      { id: 3, name: "Matplotlib" },
    ],
    course_images: ["images/regis-teacher.jpg"],
    teacher: [dummyTeachers[2]],
    institution: dummyInstitutions[2],
    ratings: [4, 5, 5, 4],
    reviews: ["Very practical!", "Loved the exercises!"],
    teacher_salary: 3500000,
  },

  // 4️⃣
  {
    id: 4,
    name: "UI/UX Design Fundamentals",
    description: "Learn the essentials of user interface and experience design.",
    price: 599000,
    duration: 100,
    discount: 20,
    category: 5,
    learning_objectives: [
      { id: 1, description: "Understand the design thinking process", course_id: 4 },
      { id: 2, description: "Create wireframes and prototypes using Figma", course_id: 4 },
    ],
    benefit_for_students: [
      { id: 1, description: "Build a UI portfolio project", course_id: 4 },
    ],
    benefit_for_teachers: [
      { id: 1, description: "Showcase creative design methods to global learners" },
      { id: 2, description: "Collaborate with design professionals and tech startups" },
      { id: 3, description: "Strengthen credibility as a UI/UX mentor" },
    ],
    course_overviews: [
      { id: 1, description: "Module 1: Introduction to UX", course_id: 4 },
      { id: 2, description: "Module 2: Figma for Beginners", course_id: 4 },
    ],
    course_skills: [
      { id: 1, name: "Figma" },
      { id: 2, name: "Wireframing" },
      { id: 3, name: "User Research" },
    ],
    course_images: ["images/regis-teacher.jpg"],
    teacher: [dummyTeachers[3]],
    institution: dummyInstitutions[3],
    ratings: [4, 4, 5],
    reviews: ["Visually engaging course!", "Figma tutorial was top-notch!"],
    teacher_salary: 3000000,
  },

  // 5️⃣
  {
    id: 5,
    name: "Cybersecurity for Beginners",
    description: "Learn how to protect systems from security threats and vulnerabilities.",
    price: 899000,
    duration: 200,
    discount: 5,
    category: 6,
    learning_objectives: [
      { id: 1, description: "Understand common cyber attacks", course_id: 5 },
      { id: 2, description: "Implement basic security measures", course_id: 5 },
    ],
    benefit_for_students: [
      { id: 1, description: "Learn real-world cybersecurity practices", course_id: 5 },
    ],
    benefit_for_teachers: [
      { id: 1, description: "Build authority in cybersecurity education" },
      { id: 2, description: "Network with IT professionals and ethical hackers" },
      { id: 3, description: "Enhance technical teaching and leadership skills" },
    ],
    course_overviews: [
      { id: 1, description: "Module 1: Introduction to Cybersecurity", course_id: 5 },
      { id: 2, description: "Module 2: Security Tools Overview", course_id: 5 },
    ],
    course_skills: [
      { id: 1, name: "Network Security" },
      { id: 2, name: "Penetration Testing" },
      { id: 3, name: "Risk Assessment" },
    ],
    course_images: ["images/regis-teacher.jpg"],
    teacher: [dummyTeachers[4]],
    institution: dummyInstitutions[4],
    ratings: [5, 5, 4, 5, 4],
    reviews: ["Extremely informative!", "Perfect intro to cybersecurity!"],
    teacher_salary: 4500000,
  },
  {
    id: 6,
    name: "Introduction to Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript to build your first website.",
    price: 499000,
    duration: 120,
    discount: 10,
    category: 2,
    learning_objectives: [
      { id: 1, description: "Understand HTML structure", course_id: 1 },
      { id: 2, description: "Style pages with CSS", course_id: 1 },
      { id: 3, description: "Create interactive features using JavaScript", course_id: 1 },
    ],
    benefit_for_students: [
      { id: 1, description: "Build real web projects", course_id: 1 },
      { id: 2, description: "Understand the fundamentals of web technology", course_id: 1 },
    ],
    benefit_for_teachers: [
      { id: 1, description: "Enhance teaching portfolio with web development expertise" },
      { id: 2, description: "Expand professional network among web developers" },
      { id: 3, description: "Receive recognition as a certified web instructor" },
    ],
    course_overviews: [
      { id: 1, description: "Module 1: HTML Basics", course_id: 1 },
      { id: 2, description: "Module 2: CSS Layouts", course_id: 1 },
    ],
    course_skills: [
      { id: 1, name: "HTML" },
      { id: 2, name: "CSS" },
      { id: 3, name: "JavaScript" },
    ],
    course_images: ["images/regis-teacher.jpg"],
    teacher: [dummyTeachers[0]],
    institution: dummyInstitutions[0],
    ratings: [5, 4, 5],
    reviews: ["Great course!", "Very beginner friendly."],
    teacher_salary: 2500000,
  },
];
