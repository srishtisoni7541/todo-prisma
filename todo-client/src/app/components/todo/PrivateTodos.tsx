"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock } from "lucide-react";

const privateTodos = [
  { id: 1, title: "Secret Project Plan" },
  { id: 2, title: "Financial Goals" },
];

export default function PrivateTodos() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lock size={18} /> Private Todos
        </h2>
      </CardHeader>
      <CardContent className="space-y-2">
        {privateTodos.map((todo) => (
          <div key={todo.id} className="text-gray-800">
            🔒 {todo.title}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
