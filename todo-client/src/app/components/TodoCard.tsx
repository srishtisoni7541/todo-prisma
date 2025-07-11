import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, Edit, Heart, Lock, Trash2 } from "lucide-react";
interface Todo {
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

 export const TodoCard: React.FC<{
  todo: Todo;
  onToggleLike: (id: string) => void;
}> = ({ todo, onToggleLike }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle
              className={`text-lg ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getPriorityColor(todo.priority)}>
                {todo.priority}
              </Badge>
              <Badge>{todo.category}</Badge>
              {todo.isPrivate && <Lock className="w-4 h-4 text-gray-500" />}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleLike(todo.id)}
            className="ml-2"
          >
            <Heart
              className={`w-4 h-4 ${
                todo.isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-3">{todo.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Due: {todo.dueDate}</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
