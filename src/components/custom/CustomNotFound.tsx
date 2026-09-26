import { Link } from "react-router";

export const CustomNotFound = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <p className="text-4xl font-bold">404</p>
      <p className="text-muted-foreground">Esta página no existe.</p>
      <Link to="/" className="text-sm underline underline-offset-4">
        Volver al inicio
      </Link>
    </div>
  );
};
