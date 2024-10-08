"use client";
// HOOKS
import { ReactNode } from "react";
// COMPONENTS
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// SERVICES
import { deActivateApiKey } from "@/services/apiKey";
// HOOKS
import { useToast } from "@/hooks/use-toast";
import useSWRMutation from "swr/mutation";
// UTILS
import { mutate } from "swr";

const DeActivateKeyDialog = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const { toast } = useToast();
  const { trigger: performDeActivateKey, isMutating = false } = useSWRMutation(
    "/deactivate-api-keys",
    () => deActivateApiKey(id),
    {
      onSuccess: () => {
        mutate("/get-active-api");
        toast({
          title: "API Key deactivated successfully",
        });
      },
    }
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deactivate API Key</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-200">
            This API key will immediately be deactivated. API requests made
            using this key will be rejected, which could cause any systems
            depending on it to break. Once deactivated, you&apos;ll no longer be
            able to view this key
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-800"
            onClick={performDeActivateKey}
            disabled={isMutating}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeActivateKeyDialog;
