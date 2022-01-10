import httpService from "./httpService";

const todosEndpoint = "todos/";
const todoService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: {
        _page: 1,
        _limit: 5,
      },
    });
    return data;
  },
  fetchPost: async () => {
    const { data } = await httpService.post(todosEndpoint, {
      completed: false,
      title: "Это то, что нужно",
    });
    return data;
  },
};

export default todoService;
