/**
 * useApi composable
 * Handles all API calls to the backend
 * Automatically attaches the auth token to every request
 * Use this in every page instead of writing fetch() directly
 */
export const useApi = () => {
  // Base URL of the backend API
  const baseUrl = "http://localhost:3333/api";

  // Get the auth token from localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  };

  // Build headers for every request
  const getHeaders = (includeAuth = true) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (includeAuth) {
      const token = getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return headers;
  };

  /**
   * GET request
   * e.g. await api.get('/businesses')
   */
  const get = async (endpoint: string, requiresAuth = true) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: getHeaders(requiresAuth),
    });
    return response.json();
  };

  /**
   * POST request
   * e.g. await api.post('/businesses', { name: 'Luxe Salon' })
   */
  const post = async (
    endpoint: string,
    body: Record<string, any>,
    requiresAuth = true,
  ) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: getHeaders(requiresAuth),
      body: JSON.stringify(body),
    });
    return response.json();
  };

  /**
   * PUT request
   * e.g. await api.put('/businesses/1', { name: 'Updated Name' })
   */
  const put = async (
    endpoint: string,
    body: Record<string, any>,
    requiresAuth = true,
  ) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "PUT",
      headers: getHeaders(requiresAuth),
      body: JSON.stringify(body),
    });
    return response.json();
  };

  /**
   * DELETE request
   * e.g. await api.del('/businesses/1/branches/2')
   */
  const del = async (endpoint: string, requiresAuth = true) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: getHeaders(requiresAuth),
    });
    return response.json();
  };

  /**
   * Save auth token after login
   * Called after a successful login response
   */
  const saveToken = (token: string) => {
    localStorage.setItem("auth_token", token);
  };

  /**
   * Save user data after login
   */
  const saveUser = (user: Record<string, any>) => {
    localStorage.setItem("auth_user", JSON.stringify(user));
  };

  /**
   * Get logged in user data
   */
  const getUser = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("auth_user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  };

  /**
   * Check if user is logged in
   */
  const isLoggedIn = () => {
    return !!getToken();
  };

  /**
   * Log out — clear token and user data
   */
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  return {
    get,
    post,
    put,
    del,
    saveToken,
    saveUser,
    getUser,
    isLoggedIn,
    logout,
  };
};
