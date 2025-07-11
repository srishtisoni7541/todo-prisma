"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateTodo } from "@/app/services/todo";

interface Props {
  onTodoCreated: () => void;
}

const AddTodoForm: React.FC<Props> = ({ onTodoCreated }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "PENDING",
    visibility: "PUBLIC",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      await CreateTodo(form, token);
      onTodoCreated();
    } catch (error) {
      console.error("Error creating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4">+ Add Todo</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input name="title" value={form.title} onChange={handleChange} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea name="description" value={form.description} onChange={handleChange} />
          </div>

          <div>
            <Label>Due Date</Label>
            <Input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
          </div>

          <div>
            <Label>Status</Label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded p-2">
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div>
            <Label>Visibility</Label>
            <select name="visibility" value={form.visibility} onChange={handleChange} className="w-full border rounded p-2">
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Todo"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoForm;
