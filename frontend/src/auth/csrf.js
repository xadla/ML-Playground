let csrfToken = null;

export const setCsrfToken = (token) => {
  csrfToken = token;
};

export const getStoredCsrfToken = () => csrfToken;
