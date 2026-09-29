import { useState } from "react";
import { Form, useNavigation } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CreateUserDialog = () => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const isCreating =
    navigation.state === "submitting" &&
    navigation.formData?.get("intent") === "create-user";

  // Patrón oficial de React para "reaccionar a un cambio" sin useEffect:
  // comparamos contra el valor anterior y ajustamos en el mismo render.
  const [wasCreating, setWasCreating] = useState(isCreating);
  if (isCreating !== wasCreating) {
    setWasCreating(isCreating);
    if (wasCreating && !isCreating) {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button">Crear usuario</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear usuario nuevo</DialogTitle>
        </DialogHeader>
        <Form method="post" className="flex flex-col gap-4">
          <input type="hidden" name="intent" value="create-user" />
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-email">Email</Label>
            <Input id="new-email" name="email" type="email" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-password">Contraseña temporal</Label>
            <Input
              id="new-password"
              name="password"
              type="password"
              minLength={6}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creando..." : "Crear"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
