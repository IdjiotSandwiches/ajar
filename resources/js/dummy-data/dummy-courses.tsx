// dummy-courses.ts
export const availableCourses = [
    {
        id: 1,
        name: "Belajar React dari Nol",
        description: "Pelajari React dasar hingga membuat aplikasi modern.",
        image: "https://placehold.co/600x400",
        price: 300000,
        discount: 20,
        duration: 480,
        institute: {
            user: { name: "Tech Institute" },
        },
        course_reviews_avg_rating: 4.6,
        reviews_count: 120,
        teachers: [],
    },
    {
        id: 2,
        name: "Fullstack Laravel",
        description: "Bangun aplikasi web profesional dengan Laravel.",
        image: "https://placehold.co/600x400",
        price: 400000,
        discount: 0,
        duration: 600,
        institute: {
            user: { name: "Code Academy" },
        },
        course_reviews_avg_rating: 4.8,
        reviews_count: 89,
        teachers: [],
    },
];

export const pendingCourses = [
    {
        id: 3,
        name: "UI/UX Design Fundamental",
        description: "Dasar desain UI/UX untuk produk digital.",
        image: "https://placehold.co/600x400",
        price: 250000,
        discount: 10,
        duration: 360,
        institute: {
            user: { name: "Design School" },
        },
        course_reviews_avg_rating: 4.5,
        reviews_count: 40,
        teachers: [],
    },
];

export const joinedCourses = [
    {
        id: 4,
        name: "Advanced JavaScript",
        description: "Pendalaman JavaScript untuk developer profesional.",
        image: "https://placehold.co/600x400",
        price: 350000,
        discount: 15,
        duration: 540,
        institute: {
            user: { name: "JS Mastery" },
        },
        course_reviews_avg_rating: 4.9,
        reviews_count: 210,
        teachers: [],
    },
];
