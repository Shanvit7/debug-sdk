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
import Spinner from "@/components/custom/spinner";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/custom/password-input";
import Link from "next/link";
// HOOKS
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import useSWRMutation from "swr/mutation";
import useAuthStore from "@/hooks/use-auth";
// SERVICES
import { login } from "@/services/auth";
// UTILS
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// SCHEMA
import { loginSchema, LoginSchemaType } from "@/lib/schema";

const Login = () => {
  const router = useRouter();
  const { setEmail, setAccessToken } = useAuthStore() ?? {};
  const {
    trigger: performLogin,
    isMutating,
    data = {},
    error,
  } = useSWRMutation("/login", (_, { arg }: { arg: object }) => login(arg), {
    onSuccess: ({ data }) => {
      const { token = "", user: { email = "" } = {} } = data ?? {};
      setEmail(email);
      setAccessToken(token);
      router.push("/credentials");
    },
    onError: ({ message: title = "Something went wrong. Please try again later !"}) => {
      toast({
        title,
        variant: "destructive",
      });
    },
  });

  const { toast } = useToast();

  const isSuccess = data?.data && !error;

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<LoginSchemaType> = async (
    values: FieldValues
  ) => performLogin({ ...values });

  return (
    <div className="bg-form rounded-md p-4 w-3/4 md:w-1/3 xl:w-1/4">
      <div className="p-2 space-y-4 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-gray-400">
          Enter your credentials to access your account
        </p>
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
          <FormField
            name="password"
            render={() => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    className="bg-[#1E242D] border-[#2A2F38] placeholder-gray-500 focus:border-[#3A404A] focus:ring-[#3A404A]"
                    {...register("password")}
                  />
                </FormControl>
                <FormMessage>{errors?.password?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Link
            className="block text-end text-xs text-zinc-300 hover:text-primaryGradientStart"
            href="/forgot-password"
          >
            Forgot your password ?
          </Link>
          <div className="flex justify-center items-center">
            <Button disabled={isMutating || isSuccess} variant="secondary">
              {isMutating || isSuccess ? <Spinner className="w-8 h-8" /> : "Continue"}
            </Button>
          </div>
          <Link
            href="/signup"
            className="block py-1 text-xs text-center text-zinc-300 hover:text-primaryGradientStart"
          >
            Don&apos;t have an Account ?
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default Login;
