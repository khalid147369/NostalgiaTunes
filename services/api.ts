
import axios from "axios";
import { getAccessToken, setAccessToken } from "./authToken";
import { useUser } from "@/hooks/useUser";




export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // CRÍTICO: Obliga a Axios a enviar y recibir cookies httpOnly
  withCredentials: true, 
});

api.interceptors.request.use((config) => {

    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Control para evitar peticiones múltiples de refresco en paralelo
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

// INTERCEPTOR DE RESPUESTA
api.interceptors.response.use(
  (response) => response, // Si la petición es exitosa, no hace nada
  async (error) => {
    const originalRequest = error.config;
    //Para que refresh no refresca a sí mismo
    if (
    originalRequest.url === "/auth/refresh"
    ) {
        return Promise.reject(error);
    }
    // Si recibimos un 401 y la petición no ha sido reintentada aún
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Si ya hay un refresco en proceso, ponemos esta petición en espera
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Llamamos a nuestro Route Handler de Next.js (utilizando la URL relativa del frontend)
        const {data} = await api.post("/auth/refresh");

        
        setAccessToken(data?.token)

        // Si el refresco fue exitoso, notificamos a las peticiones en cola
        processQueue(null);

        // Reintentamos la petición original con la nueva cookie ya actualizada
        originalRequest.headers.Authorization =
        `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si el refresh token también expiró en el servidor
        processQueue(refreshError);
        
       
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);