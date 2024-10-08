"use client";
// HOOKS
import { useEffect } from "react";
import useForgotPasswordStore from "@/hooks/use-forgot-password";
// TYPES
import { ReactNode } from "react";

const ForgotPasswordLayout = ({
  sent,
  send,
}: {
  sent: ReactNode;
  send: ReactNode;
}) => {
  const {
    isLinkSent = false,
    setEmail,
    setLinkSent,
  } = useForgotPasswordStore() ?? {};
  useEffect(() => {
    return () => {
      setEmail("");
      setLinkSent(false);
    };
  }, [setLinkSent, setEmail]);

  return <>{isLinkSent ? sent : send}</>;
};

export default ForgotPasswordLayout;
