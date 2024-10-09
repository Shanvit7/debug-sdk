import { ReactNode } from "react";

const AuthLayout = ({
  openTopbar,
  forms,
}: {
  openTopbar: ReactNode;
  forms: ReactNode;
}) => {
  return (
    <main className="min-h-dvh w-dvw overflow-x-hidden grid grid-rows-[auto_1fr]">
      <section>{openTopbar}</section>
      <section className="grid place-items-center">{forms}</section>
    </main>
  );
};

export default AuthLayout;
