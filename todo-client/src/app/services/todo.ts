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