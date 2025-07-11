import { Button } from "@/components/ui/button";
import { TodoCard } from "./TodoCard";
import { Plus } from "lucide-react";
import { Todo } from "@/rypes";


interface TodoListProps {
  todos: Todo[];
  onToggleLike: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggleLike }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No todos found</p>
        <Button className="mt-4">
          <Plus className="w-4 h-4 mr-2" />
          Add First Todo
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} onToggleLike={onToggleLike} />
      ))}
    </div>
  );
};
