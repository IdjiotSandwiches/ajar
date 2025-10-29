import { Category } from "@/interfaces/shared";

export const dummyCategories: Category[] = [
  { id: 1, name: "Technology", parent_id: null },
  { id: 2, name: "Artificial Intelligence", parent_id: 1 },
  { id: 3, name: "Network", parent_id: 1 },
  { id: 4, name: "Cyber Security", parent_id: 1 },
  { id: 5, name: "Cloud Computing", parent_id: 1 },
  { id: 6, name: "Data Science", parent_id: 1 },
  { id: 7, name: "Design", parent_id: null },
  { id: 8, name: "Graphic Design", parent_id: 7 },
  { id: 9, name: "UI/UX Design", parent_id: 7 },
  { id: 10, name: "Illustration", parent_id: 7 },
  { id: 11, name: "Video Maker", parent_id: 7 },
  { id: 12, name: "Logo Maker", parent_id: 7 },
];

export const getCategoryNameById = (id: number): string => {
  const found = dummyCategories.find((cat) => cat.id === id);
  return found ? found.name : `Unknown (${id})`;
};
