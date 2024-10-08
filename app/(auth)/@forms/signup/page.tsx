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
import PasswordInput from "@/components/custom/password-input";
import Spinner from "@/components/custom/spinner";
import Link from "next/link";
// HOOKS
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import useAuthStore from "@/hooks/use-auth";
// SERVICES
import { signUp } from "@/services/auth";
// UTILS
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// SCHEMA
import { signUpSchema, SignUpSchemaType } from "@/lib/schema";

const SignUp = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { setEmail } = useAuthStore() ?? {};
  const {
    trigger: performSignUp,
    isMutating,
    data,
    error,
  } = useSWRMutation("/signup", (_, { arg }: { arg: object }) => signUp(arg), {
    onSuccess: ({ data }) => {
      const { admin: { email = "" } = {} } = data ?? {};
      setEmail(email);
      router.push("/otp");
    },
    onError: ({
      message: title = "Something went wrong!. Please try again later",
    }) => {
      toast({
        title,
        variant: "destructive",
      });
    },
  });

  const isSuccess = data?.data && !error;

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (
    values: FieldValues
  ) => performSignUp({ ...values });

  return (
    <div className="bg-form rounded-md p-4 w-4/5 md:w-1/3">
      <div className="p-2 space-y-4 text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-gray-400">
          Get full-access to{" "}
          <b className="text-primaryGradientStart text-lg">
            QIE Web3 ecosystem
          </b>
        </p>
      </div>
      <Form {...form}>
        <form
          className="grid grid-cols-2 items-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            name="name"
            render={() => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#1E242D] border-[#2A2F38] placeholder-gray-500 focus:border-[#3A404A] focus:ring-[#3A404A]"
                    type="text"
                    {...register("name")}
                  />
                </FormControl>
                <FormMessage>{errors?.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="organizationName"
            render={() => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#1E242D] border-[#2A2F38] placeholder-gray-500 focus:border-[#3A404A] focus:ring-[#3A404A]"
                    type="text"
                    {...register("organizationName")}
                  />
                </FormControl>
                <FormMessage>{errors?.organizationName?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={() => (
              <FormItem className="col-span-2">
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
              <FormItem className="col-span-2">
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
          <FormField
            name="phoneNumber"
            render={() => (
              <FormItem className="col-span-2">
                <FormLabel>
                  Phone Number{" "}
                  <span className="text-zinc-300 text-sm">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-[#1E242D] border-[#2A2F38] placeholder-gray-500 focus:border-[#3A404A] focus:ring-[#3A404A]"
                    type="tel"
                    {...register("phoneNumber")}
                  />
                </FormControl>
                <FormMessage>{errors?.phoneNumber?.message}</FormMessage>
              </FormItem>
            )}
          />
          <div className="col-span-2 flex justify-center items-center">
            <Button disabled={isMutating || isSuccess} variant="secondary">
              {isMutating || isSuccess ? (
                <Spinner className="w-8 h-8" />
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
          <Link
            href="/login"
            className="col-span-2 py-1 block text-xs text-center text-zinc-300 hover:text-primaryGradientStart"
          >
            Already have an account ?
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
