"use client";
// COMPONENTS
import { Button } from "@/components/ui/button";
import Spinner from "@/components/custom/spinner";
// HOOKS
import useSWRMutation from "swr/mutation";
import { useToast } from "@/hooks/use-toast";
import useForgotPasswordStore from "@/hooks/use-forgot-password";
// SERVICES
import { forgotPassword } from "@/services/auth";
// UTILS
import { getWebmailUrl } from "@/lib/utils";
import { motion } from "framer-motion";
// ASSETS
import { Mail } from "lucide-react";

const SentResetLink = () => {
  const { toast } = useToast();
  const { email = "" } = useForgotPasswordStore() ?? {};
  const handleOpen = () =>
    window.open(getWebmailUrl(email), "_blank", "noopener,noreferrer");
  const { trigger: performForgotPassword, isMutating } = useSWRMutation(
    "/forgot-password",
    (_, { arg }: { arg: object }) => forgotPassword(arg),
    {
      onSuccess: () => {
        toast({
          title: "Reset link sent successfully!",
        });
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

  const handleResend = () => performForgotPassword({ email });

  return (
    <div className="bg-form rounded-md p-4 space-y-4 w-3/4 md:w-1/3 xl:w-1/4">
      <div className="flex justify-center ">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Mail className="w-16 h-16 bg-transparent" />
        </motion.div>
      </div>
      <h2 className="text-xl font-bold">Please check your email</h2>
      <p className="text-muted-foreground">
        We&apos;ve sent a password reset link to your email address. Please
        check your inbox and follow the instructions.
      </p>
      <Button variant="outline" className="w-full" onClick={handleOpen}>
        Open Inbox
      </Button>
      <Button
        disabled={isMutating}
        onClick={handleResend}
        variant="secondary"
        className="w-full"
      >
        {isMutating ? <Spinner className="w-8 h-8" /> : "Resend Link"}
      </Button>
    </div>
  );
};

export default SentResetLink;
