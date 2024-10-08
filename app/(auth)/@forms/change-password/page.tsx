"use client";
// HOOKS
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import useSWRMutation from "swr/mutation";
// COMPONENTS
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/custom/spinner";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/custom/password-input";
import Link from "next/link";
// SERVICES
import { resetPassword } from "@/services/auth";
// UTILS
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { changePasswordSchema, ChangePasswordSchemaType } from "@/lib/schema";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const {
    trigger: performChangePassword,
    isMutating,
    data,
    error,
  } = useSWRMutation(
    "/reset-password",
    (_, { arg }: { arg: object }) => resetPassword(arg),
    {
      onSuccess: () => {
        toast({
          title: "Password changed successfully",
        });
        router.push("/login");
      },
      onError: ({
        message: title = "Something went wrong!. Please try again later",
      }) => {
        toast({
          title,
          variant: "destructive",
        });
      },
    }
  );

  const isSuccess = data?.data && !error;

  const { toast } = useToast();

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<ChangePasswordSchemaType> = async (
    values: FieldValues
  ) => {
    const { newPassword = "" } = values ?? {};
    performChangePassword({ newPassword, token });
  };

  useEffect(() => {
    if (token?.length === 0) router.push("/forgot-password");
  }, [token?.length, router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-form rounded-md p-4 w-3/4 md:w-1/3 xl:w-1/4">
      <div className="p-2 space-y-4 text-center">
        <h1 className="text-2xl font-bold">Change Password</h1>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter new password</FormLabel>
                <FormControl>
                  <PasswordInput
                    className="bg-[#1E242D] border-[#2A2F38] placeholder-gray-500 focus:border-[#3A404A] focus:ring-[#3A404A]"
                    {...field}
                    showPassword={showPassword}
                    onToggleVisibility={togglePasswordVisibility}
                  />
                </FormControl>
                <FormMessage>{errors?.newPassword?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <PasswordInput
                    className="bg-[#1E242D] border-[#2A2F38] placeholder-gray-500 focus:border-[#3A404A] focus:ring-[#3A404A]"
                    {...field}
                    showPassword={showPassword}
                    onToggleVisibility={togglePasswordVisibility}
                  />
                </FormControl>
                <FormMessage>{errors?.confirmPassword?.message}</FormMessage>
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center">
            <Button disabled={isMutating || isSuccess} variant="secondary">
              {isMutating || isSuccess ? (
                <Spinner className="w-8 h-8" />
              ) : (
                "Continue"
              )}
            </Button>
          </div>
          <Link
            href="/login"
            className="block py-1 text-xs text-center text-zinc-300 hover:text-primaryGradientStart"
          >
            Back to login ?
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
