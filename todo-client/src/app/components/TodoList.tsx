import { Todo } from "@/rypes";
import { TodoCard } from "./TodoCard";

export const TodoList = ({
  todos,
  onToggleLike,
  onEdit, 
  onDelete
}: {
  todos: Todo[];
  onToggleLike: (id: string) => void;
  onEdit: (todo: Todo) => void; 
  onDelete:(todo:Todo)=>void;
}) => {
  if (todos.length === 0)
    return <p className="text-center text-gray-500">No todos found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onEdit={onEdit} 
          onToggleLike={onToggleLike}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
