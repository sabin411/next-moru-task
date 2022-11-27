export const BASE_URL = 'https://jsonplaceholder.typicode.com/users';
export const apiConstants = {
  Edit_User: (userId: number) => `${BASE_URL}/${userId}`,
  Delete_User: (userId: number) => `${BASE_URL}/${userId}`,
};
