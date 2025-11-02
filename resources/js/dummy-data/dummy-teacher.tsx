import { TeacherRegisterProps } from "@/interfaces/shared";

export const dummyTeachers: TeacherRegisterProps[] = [
  {
    name: "Dodi Pratama",
    email: "dodi.pratama@example.com",
    phone_number: "081234567890",
    password: "password123",
    password_confirmation: "password123",
    role_id: 2,
    description:
      "Seorang instruktur berpengalaman di bidang Web Development, berfokus pada React, Node.js, dan desain sistem modern.",
    category: 1,
    graduates: [
      {
        id: 1,
        degree_title: "Bachelor of Computer Science",
        university_name: "Universitas Indonesia",
        degree_type: 1,
      },
    ],
    works: [
      {
        id: 1,
        position: "Frontend Engineer",
        institution: "TechnoID",
        duration: 36,
      },
    ],
    certificates: [
      "https://cdn-icons-png.flaticon.com/512/6340/6340906.png",
      "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    ] as unknown as File[],
     image: [
      "https://randomuser.me/api/portraits/men/33.jpg",
    ] as unknown as File[],
  },
  {
    name: "Maria Anggraini",
    email: "maria.anggraini@example.com",
    phone_number: "081298765432",
    password: "password123",
    password_confirmation: "password123",
    role_id: 2,
    description:
      "Desainer UI/UX profesional dengan pengalaman lebih dari 5 tahun dalam pembuatan desain sistem aplikasi dan website modern.",
    category: 2,
    graduates: [
      {
        id: 2,
        degree_title: "Bachelor of Visual Communication Design",
        university_name: "Institut Teknologi Bandung",
        degree_type: 1,
      },
    ],
    works: [
      {
        id: 2,
        position: "UI/UX Designer",
        institution: "CreativeLabs",
        duration: 48,
      },
    ],
    certificates: [
      "https://cdn-icons-png.flaticon.com/512/2965/2965879.png",
    ] as unknown as File[],
    image: [
      "https://randomuser.me/api/portraits/women/10.jpg",
    ] as unknown as File[],
  },
  {
    name: "Rani Wulandari",
    email: "rani.wulandari@example.com",
    phone_number: "081345678901",
    password: "password123",
    password_confirmation: "password123",
    role_id: 2,
    description:
      "Ahli data science dengan pengalaman di analisis data, machine learning, dan AI menggunakan Python dan TensorFlow.",
    category: 3,
    graduates: [
      {
        id: 3,
        degree_title: "Master of Data Science",
        university_name: "Universitas Gadjah Mada",
        degree_type: 2,
      },
    ],
    works: [
      {
        id: 3,
        position: "Data Scientist",
        institution: "InsightLab",
        duration: 60,
      },
    ],
    certificates: [
      "https://cdn-icons-png.flaticon.com/512/1055/1055646.png",
    ] as unknown as File[],
    image: [
      "https://randomuser.me/api/portraits/women/12.jpg",
    ] as unknown as File[],
  },
  {
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    phone_number: "081222334455",
    password: "password123",
    password_confirmation: "password123",
    role_id: 2,
    description:
      "Instruktur backend development dengan keahlian dalam Node.js, Express, dan arsitektur REST API.",
    category: 1,
    graduates: [
      {
        id: 4,
        degree_title: "Bachelor of Information Technology",
        university_name: "Universitas Bina Nusantara",
        degree_type: 1,
      },
    ],
    works: [
      {
        id: 4,
        position: "Backend Engineer",
        institution: "CodeWorks",
        duration: 42,
      },
    ],
    certificates: [
      "https://cdn-icons-png.flaticon.com/512/3305/3305897.png",
    ] as unknown as File[],
    image: [
      "https://randomuser.me/api/portraits/women/33.jpg",
    ] as unknown as File[],
  },
  {
    name: "Citra Lestari",
    email: "citra.lestari@example.com",
    phone_number: "081377788899",
    password: "password123",
    password_confirmation: "password123",
    role_id: 2,
    description:
      "Ahli motion graphics dan animasi digital menggunakan After Effects dan Blender.",
    category: 2,
    graduates: [
      {
        id: 5,
        degree_title: "Bachelor of Multimedia Design",
        university_name: "Universitas Multimedia Nusantara",
        degree_type: 1,
      },
    ],
    works: [
      {
        id: 5,
        position: "Motion Graphic Designer",
        institution: "Kreativa Studio",
        duration: 54,
      },
    ],
    certificates: [
      "https://cdn-icons-png.flaticon.com/512/4341/4341053.png",
    ] as unknown as File[],
  },
  {
    name: "Andika Saputra",
    email: "andika.saputra@example.com",
    phone_number: "081211223344",
    password: "password123",
    password_confirmation: "password123",
    role_id: 2,
    description:
      "Instruktur keamanan siber dengan fokus pada penetration testing dan keamanan jaringan.",
    category: 3,
    graduates: [
      {
        id: 6,
        degree_title: "Bachelor of Cyber Security",
        university_name: "Telkom University",
        degree_type: 1,
      },
    ],
    works: [
      {
        id: 6,
        position: "Cyber Security Analyst",
        institution: "SecureNet",
        duration: 40,
      },
    ],
    certificates: [
      "https://cdn-icons-png.flaticon.com/512/595/595067.png",
    ] as unknown as File[],
    image: [
      "https://randomuser.me/api/portraits/women/20.jpg",
    ] as unknown as File[],
  },
  {
    name: "Lina Marlina",
    email: "lina.marlina@example.com",
    phone_number: "081300112233",
    password: "password123",
    password_confirmation: "password123",
    role_id: 2,
    description:
      "Spesialis digital marketing dengan pengalaman dalam strategi SEO, SEM, dan konten kreatif.",
    category: 4,
    graduates: [
      {
        id: 7,
        degree_title: "Bachelor of Business Administration",
        university_name: "Universitas Padjadjaran",
        degree_type: 1,
      },
    ],
    works: [
      {
        id: 7,
        position: "Digital Marketing Strategist",
        institution: "GrowUp Agency",
        duration: 50,
      },
    ],
    certificates: [
      "https://cdn-icons-png.flaticon.com/512/3141/3141156.png",
    ] as unknown as File[],
    image: [
      "https://randomuser.me/api/portraits/women/8.jpg",
    ] as unknown as File[],
  },
  {
    name: "Rizky Maulana",
    email: "rizky.maulana@example.com",
    phone_number: "081255667788",
    password: "password123",
    password_confirmation: "password123",
    role_id: 2,
    description:
      "Instruktur DevOps berpengalaman dalam Docker, Kubernetes, dan CI/CD pipeline.",
    category: 1,
    graduates: [
      {
        id: 8,
        degree_title: "Master of Software Engineering",
        university_name: "Universitas Airlangga",
        degree_type: 2,
      },
    ],
    works: [
      {
        id: 8,
        position: "DevOps Engineer",
        institution: "CloudBridge",
        duration: 48,
      },
    ],
    certificates: [
      "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
    ] as unknown as File[],
    image: [
      "https://randomuser.me/api/portraits/men/10.jpg",
    ] as unknown as File[],
  },
  {
    name: "Nur Aisyah",
    email: "nur.aisyah@example.com",
    phone_number: "081234555666",
    password: "password123",
    password_confirmation: "password123",
    role_id: 2,
    description:
      "Ahli Artificial Intelligence dengan fokus pada Natural Language Processing dan Deep Learning.",
    category: 3,
    graduates: [
      {
        id: 9,
        degree_title: "Master of Artificial Intelligence",
        university_name: "Universitas Diponegoro",
        degree_type: 2,
      },
    ],
    works: [
      {
        id: 9,
        position: "AI Researcher",
        institution: "CognitiveLab",
        duration: 60,
      },
    ],
    certificates: [
      "https://cdn-icons-png.flaticon.com/512/4341/4341013.png",
    ] as unknown as File[],
    image: [
      "https://randomuser.me/api/portraits/women/22.jpg",
    ] as unknown as File[],
  },
  {
    name: "Bayu Kurniawan",
    email: "bayu.kurniawan@example.com",
    phone_number: "081322334455",
    password: "password123",
    password_confirmation: "password123",
    role_id: 2,
    description:
      "Instruktur mobile development yang berpengalaman dalam pengembangan aplikasi Flutter dan Kotlin.",
    category: 1,
    graduates: [
      {
        id: 10,
        degree_title: "Bachelor of Computer Engineering",
        university_name: "Politeknik Negeri Bandung",
        degree_type: 1,
      },
    ],
    works: [
      {
        id: 10,
        position: "Mobile Developer",
        institution: "Appify",
        duration: 45,
      },
    ],
    certificates: [
      "https://cdn-icons-png.flaticon.com/512/4208/4208396.png",
    ] as unknown as File[],
    image: [
      "https://randomuser.me/api/portraits/men/20.jpg",
    ] as unknown as File[],
  },
  {
    name: "Siti Rahmawati",
    email: "siti.rahmawati@example.com",
    phone_number: "081312349876",
    password: "password123",
    password_confirmation: "password123",
    role_id: 2,
    description:
      "Instruktur grafis dan branding dengan pengalaman dalam Adobe Illustrator dan strategi identitas visual.",
    category: 2,
    graduates: [
      {
        id: 11,
        degree_title: "Bachelor of Visual Design",
        university_name: "Universitas Sebelas Maret",
        degree_type: 1,
      },
    ],
    works: [
      {
        id: 11,
        position: "Graphic Designer",
        institution: "Designify Studio",
        duration: 52,
      },
    ],
    certificates: [
      "https://cdn-icons-png.flaticon.com/512/1027/1027471.png",
    ] as unknown as File[],
    image: [
      "https://randomuser.me/api/portraits/women/34.jpg",
    ] as unknown as File[],
  },
];
