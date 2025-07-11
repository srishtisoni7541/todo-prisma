"use client";
import React, { useEffect, useState } from "react";
import { Lock, Heart } from "lucide-react";
import ProfileHeader from "../components/ProfileHeader";
import { SearchBar } from "../components/SearchBar";
import { TodoList } from "../components/TodoList";
import { getProfile } from "../services/auth";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AddTodoForm from "../components/forms/AddTodoForm";

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

const TodoUserProfile: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");

 const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const profileData = await getProfile(token);
    setUserData(profileData.user);
    if (profileData.user?.todos) {
      setTodos(profileData.user.todos); 
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleToggleLike = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isLiked: !todo.isLiked } : todo
      )
    );
  };

  const searchedTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const privateTodos = searchedTodos.filter((todo) => todo.isPrivate);
  const likedTodos = searchedTodos.filter((todo) => todo.isLiked);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <ProfileHeader user={userData} />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <SearchBar onSearch={handleSearch} />
          <AddTodoForm onTodoCreated={fetchProfile} />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All Todos ({searchedTodos.length})</TabsTrigger>
              <TabsTrigger value="private">
                <Lock className="w-4 h-4 mr-2" /> Private
              </TabsTrigger>
              <TabsTrigger value="liked">
                <Heart className="w-4 h-4 mr-2" /> Liked ({likedTodos.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <TodoList todos={searchedTodos} onToggleLike={handleToggleLike} />
            </TabsContent>

            <TabsContent value="private">
              <TodoList todos={privateTodos} onToggleLike={handleToggleLike} />
            </TabsContent>

            <TabsContent value="liked">
              <TodoList todos={likedTodos} onToggleLike={handleToggleLike} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TodoUserProfile;
