import { cn } from "@/lib/utils";
const Spinner = ({ className }) => (
  <div className={cn("relative w-16 h-16", className)}>
    <div className="absolute inset-0 rounded-full border-[4px] border-zinc-500/50 border-t-primaryGradientEnd animate-spin" />
  </div>
);

export default Spinner;
