// COMPONENTS
import Spinner from "@/components/custom/spinner";

const Loading = () => {
  return (
    <section className="col-span-10 flex flex-col gap-12 justify-center items-center h-[70vh]">
      <Spinner />
      <b className="animate-pulse">Please wait while we load</b>
      <div className="">
        <p className="font-semibold">Did you know ?</p>
        <p className="font-medium">
          QIE is able to handle{" "}
          <span className="text-primaryGradientEnd font-semibold text-xl">
            15 times
          </span>{" "}
          more transactions than SWIFT
        </p>
      </div>
    </section>
  );
};

export default Loading;
