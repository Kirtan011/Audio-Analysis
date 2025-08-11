import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const NavBar = ({ className = "" }) => {
  const currentPath = useLocation().pathname;
  const isActive = (path) => currentPath === path;

  return (
    <div
      className={`fixed top-0 w-full flex justify-center py-4 z-50 ${className}`}
    >
      <div className="w-full max-w-4xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-md rounded-4xl  px-6">
        <div className="h-14 flex items-center justify-center">
          {/* Center the links using justify-center */}
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-10 justify-center">
              <NavigationMenuItem>
                <Link
                  to="/"
                  className={`transition-colors font-medium ${
                    isActive("/") || isActive("/home")
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/AudioModel"
                  className={`transition-colors font-medium ${
                    isActive("/AudioModel")
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  Audio Analysis
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
