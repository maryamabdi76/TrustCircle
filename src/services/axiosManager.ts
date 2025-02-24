import axios, { AxiosInstance } from 'axios';

class AxiosManager {
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: '/api', // Set your base API URL
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // Include cookies if needed
      });

      // Add interceptors if needed
      this.instance.interceptors.response.use(
        (response) => response,
        (error) => {
          console.error('API Error:', error.response?.data || error.message);
          return Promise.reject(error);
        }
      );
    }

    return this.instance;
  }
}

export default AxiosManager;
