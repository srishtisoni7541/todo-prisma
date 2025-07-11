export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  category: string;
  dueDate: string;
  isPrivate: boolean;
  isLiked: boolean;
}
