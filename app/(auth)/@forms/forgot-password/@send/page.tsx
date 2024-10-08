"use client";
// COMPONENTS
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Spinner from "@/components/custom/spinner";
// HOOKS
import useForgotPasswordStore from "@/hooks/use-forgot-password";
import { useToast } from "@/hooks/use-toast";
import useSWRMutation from "swr/mutation";
// SERVICES
import { forgotPassword } from "@/services/auth";
// UTILS
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// SCHEMA
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "@/lib/schema";

const ForgotPassword = () => {
  const { setLinkSent, setEmail } = useForgotPasswordStore() ?? {};
  const {
    trigger: performForgotPassword,
    isMutating,
    data,
    error,
  } = useSWRMutation("/forgot-password", (_, { arg }: { arg: object }) =>
    forgotPassword(arg)
  );

  const isSuccess = data?.data && !error;

  const { toast } = useToast();

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<ForgotPasswordSchemaType> = async (
    values: FieldValues
  ) => {
    const { email = "" } = values ?? {};
    performForgotPassword(
      { ...values },
      {
        onSuccess: () => {
          setEmail(email);
          setLinkSent(true);
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
  };

  return (
    <div className="bg-form rounded-md p-4 w-3/4 md:w-1/3 xl:w-1/4">
      <div className="p-2 space-y-4 text-center">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-gray-400">Enter your email address</p>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="email"
            render={() => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#1E242D] border-[#2A2F38] placeholder-gray-500 focus:border-[#3A404A] focus:ring-[#3A404A]"
                    type="email"
                    {...register("email")}
                  />
                </FormControl>
                <FormMessage>{errors?.email?.message}</FormMessage>
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center">
            <Button disabled={isMutating || isSuccess} variant="secondary">
              {isMutating || isSuccess ? (
                <Spinner className="w-8 h-8" />
              ) : (
                "Send Reset Link"
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

export default ForgotPassword;
