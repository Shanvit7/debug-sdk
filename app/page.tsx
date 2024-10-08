// COMPONENTS
import Image from "next/image";
import Link from "next/link";
// ASSETS
import logo from "@/public/qie.png";
import { Button } from "@/components/ui/button";

const Landing = () => (
  <main className="w-screen h-screen p-6">
    <section className="space-y-8">
      <Image
        className="mx-auto py-12"
        src={logo}
        width={150}
        height={150}
        alt="Qie"
      />
      <h1 className="uppercase font-bold text-2xl text-center">
        The only <span className="text-primaryGradientStart font-black">blockchain</span> the world will ever need
      </h1>
    </section>
    <h4 className="py-8 text-center">
      <span className="text-primaryGradientEnd font-bold">QIE Blockchain</span> stands as a cornerstone for Web 3 and DeFi, offering a
      robust, low-cost network featuring rapid settlement for transaction
      efficiency.
    </h4>
    <div className="flex items-center justify-center w-full">
    <Button size="lg" className="bg-primaryGradientStart hover:bg-primaryGradientEnd" asChild>
        <Link href="/login">
         Get Started
        </Link>
    </Button>
    </div>
  </main>
);

export default Landing;
