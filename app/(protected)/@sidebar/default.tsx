"use client";
// HOOKS
import { usePathname } from "next/navigation";
import Link from "next/link";
// UTILS
import { motion } from "framer-motion";
// ASSETS
import { KeyRound, FileCode } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const sections = [
    { name: "API Keys", route: "/credentials", icon: KeyRound },
    { name: "Endpoints", route: "/endpoints", icon: FileCode },
  ];

  return (
    <div className="h-full p-4 flex flex-col">
      <nav className="flex-1">
        <ul className="space-y-4">
          {sections.map((section) => (
            <li key={section.name} className="relative">
              <Link
                href={section.route}
                className={`block w-full text-left text-white py-2 px-4 rounded-lg transition-colors ${
                  pathname === section.route
                    ? "bg-white bg-opacity-10"
                    : "hover:bg-white hover:bg-opacity-5"
                }`}
              >
                <div className="flex items-center">
                  <section.icon className="w-5 h-5 mr-3" />
                  {section.name}
                </div>
              </Link>
              {pathname === section.route && (
                <motion.div
                  className="absolute left-0 top-0 w-1 h-full bg-white rounded-full"
                  layoutId="sidebar-selection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
