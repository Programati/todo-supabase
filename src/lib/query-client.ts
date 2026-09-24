import { QueryClient } from "@tanstack/react-query";

// Este es "el cerebro" de TanStack Query: guarda la caché de datos del servidor.
// Se crea AQUÍ, fuera de cualquier componente, porque los loaders
// del router necesitarán importarlo y ellos no pueden usar hooks de React.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo (ms) durante el cual un dato en caché se considera "fresco".
      // Con 0, el loader traería los datos y el componente los pediría de nuevo
      // enseguida. Con 60s evitamos ese doble fetch.
      staleTime: 60_000,
      // Si una consulta falla, reintenta 1 vez (por defecto son 3).
      retry: 1,
    },
  },
});
