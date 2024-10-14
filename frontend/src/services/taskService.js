import axios from 'axios';

const API_TASKS_URL = process.env.REACT_APP_API_TASKS;
const GRAPHQL_URL = process.env.REACT_APP_API_GRAPHQL;

export const getTasks = async () => {
    const response = await axios.get(API_TASKS_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
};

export const createTaskGraphQL = async (task) => {
    const response = await axios.post(GRAPHQL_URL, {
        query: `
      mutation {
        createTask(title: "${task.title}", description: "${task.description}", deadlineDate: "${task.deadlineDate}", status: "${task.status}", userId: ${task.userId}) {
          id
          title
          description
        }
      }
    `,
    }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data.data.createTask;
};
