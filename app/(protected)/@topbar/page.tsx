"use client";
// HOOKS
import useSWR from "swr";
// SERVICES
import { getUserProfile } from "@/services/user";
// COMPONENTS
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LogoutDialog from "@/components/custom/dialog/logout";
// ASSETS
import logo from "@/public/qie.png";
import { User, ChevronDown } from "lucide-react";

const TopBar = () => {
  const { data: { data: { email = '...' } = {} } = {} } = useSWR("/user", getUserProfile);
  return (
    <nav className="flex items-center justify-between p-4">
      <Image width={100} height={100} alt="qie" src={logo} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>{email}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <LogoutDialog />
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default TopBar;