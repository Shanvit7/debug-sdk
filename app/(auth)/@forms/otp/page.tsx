"use client";
// COMPONENTS
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Spinner from "@/components/custom/spinner";
import { Button } from "@/components/ui/button";
// HOOKS
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/hooks/use-auth";
// SERVICES
import { verfiyAccount } from "@/services/auth";
// UTILS
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// SCHEMA
import {
  accountVerificationSchema,
  AccountVerificationSchemaType,
} from "@/lib/schema";

const OTP = () => {
  const { email = "" } = useAuthStore() ?? {};
  const { toast } = useToast();
  const router = useRouter();

  const {
    trigger: performVerification,
    isMutating,
    data,
    error,
  } = useSWRMutation(
    "/verify-account",
    (_, { arg }: { arg: object }) => verfiyAccount(arg),
    {
      onSuccess: ({ message: title = "Your Email is now verified" }) => {
        toast({
          title,
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

  const form = useForm<AccountVerificationSchemaType>({
    resolver: zodResolver(accountVerificationSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<AccountVerificationSchemaType> = async (
    values: FieldValues
  ) => performVerification({ email, ...values });

  useEffect(() => {
    if (!email) {
      router.push("/signup");
      toast({
        title: "Please provide your email first !",
        variant: "destructive",
      });
    }
  }, [email, router, toast]);

  return (
    <div className="bg-form rounded-md p-4 w-4/5 md:w-1/3 xl:w-1/4 mb-20">
      <div className="p-2 space-y-4 text-center">
        <h1 className="text-2xl font-bold">Verify Account</h1>
        <p className="text-gray-400">
          We&apos;ve sent a 6-digit code to your email
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="otp"
            defaultValue={""}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="font-semibold flex gap-2 items-center">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage>{errors?.otp?.message}</FormMessage>
              </FormItem>
            )}
          />
          <div className="col-span-2 py-6 flex flex-col gap-8 justify-center items-center">
            <Button disabled={isMutating || isSuccess} variant="secondary">
              {isMutating || isSuccess ? (
                <Spinner className="w-8 h-8" />
              ) : (
                "Verify OTP"
              )}
            </Button>
            <Link
              href="/signup"
              className="block py-1 text-xs text-center text-zinc-300 hover:text-primaryGradientStart"
            >
              Back to Signup ?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OTP;
