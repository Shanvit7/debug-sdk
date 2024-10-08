// COMPONENTS
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// ASSETS
import logo from "@/public/qie.png";

const TopBar = () => (
  <nav className="flex items-center justify-between p-4">
    <Link href="/">
      <Image width={100} height={100} alt="qie" src={logo} />
    </Link>
    <div className="flex items-center gap-8">
      <Button variant={"outline"} asChild>
        <Link href={"/login"}>Login</Link>
      </Button>
      <Button variant={"secondary"} asChild>
        <Link href={"/signup"}>Signup</Link>
      </Button>
    </div>
  </nav>
);

export default TopBar;
