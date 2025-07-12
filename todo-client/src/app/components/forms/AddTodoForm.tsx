import { CreateTodo, UpdateTodo } from "@/app/services/todo";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddTodoForm = ({
  onTodoCreated,
  selectedTodo,
  clearSelectedTodo,
}: {
  onTodoCreated: () => void;
  selectedTodo: Todo | null;
  clearSelectedTodo: () => void;
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (selectedTodo) {
      setValue("title", selectedTodo.title);
      setValue("description", selectedTodo.description);
      setValue("status", selectedTodo.status);
      setValue("visibility", selectedTodo.visibility);
      setValue("dueDate", selectedTodo.dueDate?.split("T")[0] || "");
    }
  }, [selectedTodo]);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Token missing. Please login again.");

    const payload = {
      title: data.title,
      description: data.description,
      status: data.status || "PENDING",
      visibility: data.visibility || "PUBLIC",
    };

    try {
      if (selectedTodo) {
        await UpdateTodo(payload, token);
        toast.success(" Todo updated successfully");
      } else {
        await CreateTodo(payload, token);
        toast.success("🎉 Todo created successfully");
      }

      reset();
      onTodoCreated();
      clearSelectedTodo();
    } catch (err: any) {
      console.error(" Error saving todo:", err.response?.data || err);
      toast.error(
        err?.response?.data?.message || "Something went wrong while saving todo."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4">
      <input {...register("title")} placeholder="Title" className="w-full" />
      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full"
      />
      <select {...register("status")} className="w-full">
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
        <option value="PENDING">Pending</option>
      </select>
      <select {...register("visibility")} className="w-full">
        <option value="PUBLIC">Public</option>
        <option value="PRIVATE">Private</option>
      </select>
      <input type="date" {...register("dueDate")} className="w-full" />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {selectedTodo ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default AddTodoForm;
