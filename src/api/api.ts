// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'http://10.0.2.2:3000';

export const getData = async ({pageParam = 0}) => {
  const response = await fetch(`${BASE_URL}/posts?page=${pageParam}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
