const BASE_URL = 'http://localhost:3000';

export const getData = (page: number) => async () => {
  const response = await fetch(`${BASE_URL}/posts?page=${page}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
