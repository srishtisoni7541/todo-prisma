import API from "../lib/axios";
export const CreateTodo = async (form: any, token: string) => {
  const res = await API.post('/todos/create-todo', form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data);
  return res.data;
};
export const getPrivateTodos = async () => {
    const res = await API.get('/todos/private-todo');
    return res.data;
  
};
export const getAllTodo = async ()=>{
    const res = await API.get('/todos/all');
    console.log(res.data);
    return res.data;
}

export const UpdateTodo = async (form: any, token: string) => {
  const res = await API.put('/todos/update-todo', form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data);
  return res.data;
};

export const DeleteTodo = async (id: number, token: string) => {
  const res = await API.post(
    "/todos/delete-todo", 
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};