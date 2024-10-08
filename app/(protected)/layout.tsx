"use client";
// TYPES
import { ReactNode } from "react";
// UTILS
import { useRouter } from "next/navigation";
import { SWRConfig } from "swr";
// HOOKS
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/hooks/use-auth";

const ProtectedLayout = ({
  topbar,
  sidebar,
  children,
}: {
  topbar: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
}) => {
  const router = useRouter();
  const { removeAccessToken } = useAuthStore();
  const { toast } = useToast();
  const handleGlobalError = (error) => {
    const { status = 400, message = "Something went wrong! " } = error ?? {};
    toast({
      title: message,
      variant: "destructive",
    });
    if (status === 401) {
      removeAccessToken();
      router.push("/login");
    }
  };
  return (
    <SWRConfig
      value={{
        onError: handleGlobalError,
      }}
    >
      <main className="grid grid-cols-10 h-auto w-svw">
        <section className="col-span-10 h-[12vh]">{topbar}</section>
        <section className="col-span-10 lg:col-span-2 lg:h-[88vh]">{sidebar}</section>
        <section className="col-span-10 lg:col-span-8">{children}</section>
      </main>
    </SWRConfig>
  );
};

export default ProtectedLayout;
