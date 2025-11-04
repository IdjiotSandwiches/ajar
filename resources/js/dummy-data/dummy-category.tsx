import { Category } from "@/interfaces/shared";

export const dummyCategories: Category[] = [
  {
    id: 1,
    name: "Technology",
    parent_id: null,
    children: [
      { id: 3, name: "Artificial Intelligence", parent_id: 1 },
      { id: 4, name: "Network", parent_id: 1 },
      { id: 5, name: "Cyber Security", parent_id: 1 },
      { id: 6, name: "Cloud Computing", parent_id: 1 },
      { id: 7, name: "Data Science", parent_id: 1 },
    ],
  },
  {
    id: 2,
    name: "Design",
    parent_id: null,
    children: [
      { id: 8, name: "Photoshop", parent_id: 2 },
      { id: 9, name: "Illustrator", parent_id: 2 },
      { id: 10, name: "Blender", parent_id: 2 },
      { id: 11, name: "Color Theory", parent_id: 2 },
      { id: 12, name: "Figma", parent_id: 2 },
    ],
  },
];
