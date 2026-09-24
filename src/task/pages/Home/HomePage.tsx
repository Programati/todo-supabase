import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const HomePage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-background text-foreground">
      <Button onClick={() => toast.success("Setup correcto")}>
        Probar setup
      </Button>
    </main>
  );
};
