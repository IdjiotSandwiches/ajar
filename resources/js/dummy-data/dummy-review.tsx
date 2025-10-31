import { dummyInstitution } from "./dummy-institute";
import { dummyTeachers } from "./dummy-teacher";

export interface ReviewData {
  id: number;
  reviewer_name: string;
  role: "Pelajar" | "Pengajar";
  avatar: string;
  rating: number;
  review_text: string;
  review_to: {
    institution: {
      id: number;
      name: string;
      logo: string;
    };
    teacher: {
      name: string;
      description: string;
    };
  };
}

export const dummyReview: ReviewData[] = [
  {
    id: 1,
    reviewer_name: "Vincent Vincen",
    role: "Pelajar",
    avatar: "/images/image-1.jpg",
    rating: 5,
    review_text:
      "Kursusnya sangat membantu saya memahami dasar web development dengan cepat!",
    review_to: {
      institution: dummyInstitution[0], 
      teacher: {
        name: dummyTeachers[0].name,
        description: dummyTeachers[0].description,
      },
    },
  },
  {
    id: 2,
    reviewer_name: "Rudy Toni",
    role: "Pengajar",
    avatar: "/images/image-1.jpg",
    rating: 4,
    review_text:
      "Platform ini memudahkan saya dalam mengajar dan mengelola materi untuk murid.",
    review_to: {
      institution: dummyInstitution[1],
      teacher: {
        name: dummyTeachers[1].name, 
        description: dummyTeachers[1].description,
      },
    },
  },
  {
    id: 3,
    reviewer_name: "Nadia Putri",
    role: "Pelajar",
    avatar: "/images/image-1.jpg",
    rating: 5,
    review_text:
      "Instruktur menjelaskan dengan sangat jelas dan interaktif. Suka banget!",
    review_to: {
      institution: dummyInstitution[2], 
      teacher: {
        name: dummyTeachers[2].name,
        description: dummyTeachers[2].description,
      },
    },
  },
  {
    id: 4,
    reviewer_name: "Dodi Pratama",
    role: "Pengajar",
    avatar: "/images/image-1.jpg",
    rating: 5,
    review_text:
      "Sistem penjadwalan dan pembayaran sangat praktis, cocok untuk pengajar profesional.",
    review_to: {
      institution: dummyInstitution[3],
      teacher: {
        name: dummyTeachers[3].name,
        description: dummyTeachers[3].description,
      },
    },
  },
  {
    id: 5,
    reviewer_name: "Citra Lestari",
    role: "Pengajar",
    avatar: "/images/image-1    .jpg",
    rating: 4,
    review_text:
      "Sangat senang bisa membagikan ilmu desain di platform ini, banyak murid aktif!",
    review_to: {
      institution: dummyInstitution[4],
      teacher: {
        name: dummyTeachers[4].name, 
        description: dummyTeachers[4].description,
      },
    },
  },
];
