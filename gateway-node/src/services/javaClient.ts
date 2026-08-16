import axios from 'axios';
import type { AxiosInstance } from 'axios';

const JAVA_API_URL = process.env.JAVA_API_URL || 'http://localhost:8080';

export const javaClient: AxiosInstance = axios.create({
  baseURL: JAVA_API_URL,
  headers: { 'Content-Type': 'application/json' }
});