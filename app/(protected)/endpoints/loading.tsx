// COMPONENTS
import Spinner from "@/components/custom/spinner";

const Loading = () => {
  return (
    <div className="flex flex-col gap-12 justify-center items-center h-full">
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
    </div>
  );
};

export default Loading;
