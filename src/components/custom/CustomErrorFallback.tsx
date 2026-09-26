import { isRouteErrorResponse, useRouteError } from "react-router";

export const CustomErrorFallback = () => {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "Ocurrió un error inesperado";

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <p className="text-lg font-medium">Algo salió mal</p>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};
