
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Heart, Lock, Trash2 } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  status: "IN_PROGRESS" | "COMPLETED" | "PENDING";
  visibility: "PUBLIC" | "PRIVATE";
  isLiked: boolean;
}

export const TodoCard: React.FC<{
  todo: Todo;
  onToggleLike: (id: string) => void;
  onEdit: (todo: Todo) => void; 
  onDelete:(todo:Todo)=>void;
}> = ({ todo, onToggleLike, onEdit,onDelete }) => {
  const statusColor = {
    IN_PROGRESS: "bg-yellow-200 text-yellow-800",
    COMPLETED: "bg-green-200 text-green-800",
    PENDING: "bg-red-200 text-red-800",
  };

  return (
    <Card className="hover:shadow-lg border rounded-lg transition-shadow bg-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle
              className={`text-lg font-semibold ${
                todo.status === "COMPLETED"
                  ? "line-through text-gray-500"
                  : "text-gray-800"
              }`}
            >
              {todo.title}
            </CardTitle>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge className={statusColor[todo.status]}>
                {todo.status.replace("_", " ")}
              </Badge>

              <Badge
                variant="outline"
                className={`border ${
                  todo.visibility === "PRIVATE"
                    ? "border-gray-400 text-gray-600"
                    : "border-blue-400 text-blue-600"
                }`}
              >
                {todo.visibility}
              </Badge>

              {todo.visibility === "PRIVATE" && (
                <Lock className="w-4 h-4 text-gray-500" />
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleLike(todo.id)}
            className="ml-2 hover:bg-red-100"
          >
            <Heart
              className={`w-5 h-5 ${
                todo.isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 mb-4">{todo.description}</p>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            🕒 Due:{" "}
            {todo.dueDate
              ? new Date(todo.dueDate).toLocaleDateString()
              : "No due date"}
          </span>

          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(todo)} 
              className="hover:bg-blue-100"
            >
              <Edit className="w-4 h-4 text-blue-600" />
            </Button>

            <Button variant="ghost"   onClick={() => onDelete(todo)}  size="icon" className="hover:bg-red-100">
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
