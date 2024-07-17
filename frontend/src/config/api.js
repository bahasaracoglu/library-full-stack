const BASE_URL = "http://localhost:3000";

const API_URLS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
  },
  BOOKS: {
    LIST: `${BASE_URL}/books`,
    DETAIL: (bookId) => `${BASE_URL}/books/${bookId}`,
    RENT: `${BASE_URL}/books/rent`,
    RETURN: `${BASE_URL}/books/return`,
  },
};

export default API_URLS;
