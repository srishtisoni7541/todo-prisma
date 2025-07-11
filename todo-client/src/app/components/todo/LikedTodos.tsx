"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const likedTodos = [
  { id: 1, title: "Learn NestJS" },
  { id: 2, title: "Read Clean Code" },
];

export default function LikedTodos() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <h2 className="text-xl font-semibold">Liked Todos 💖</h2>
      </CardHeader>
      <CardContent className="space-y-2">
        {likedTodos.map((todo) => (
          <div key={todo.id} className="flex items-center justify-between">
            <span>{todo.title}</span>
            <Badge variant="default">Liked</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
