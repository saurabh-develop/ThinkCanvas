"use client";

import React, { useEffect, useState } from "react";
import { FaUserCircle, FaLayerGroup, FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { FiCode } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import Image from "next/image";

interface HeaderProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="relative z-50 flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-800 shadow-md rounded-full mx-4 mt-4 transition-colors duration-300">
      {/* Left Logo */}
      <Image src="/logo1.png" alt="logo" width={120} height={120} />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-black dark:text-white">
        <div className="flex items-center gap-1 cursor-pointer">
          <FaLayerGroup className="text-indigo-600" />
          <span className="font-medium">Pages</span>
          <BsChevronDown size={12} />
        </div>

        <div className="flex items-center gap-1 cursor-pointer">
          <FaUserCircle className="text-indigo-600" />
          <span className="font-medium">Account</span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer">
          <HiOutlineDotsCircleHorizontal className="text-indigo-600" />
          <span className="font-medium">Blocks</span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer">
          <FiCode className="text-indigo-600" />
          <span className="font-medium">Docs</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-xl text-black dark:text-white"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        <div className="text-black dark:text-white font-bold text-sm text-right leading-4">
          LOG IN
        </div>

        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="rounded-full w-10 h-10"
        />
        {/* Hamburger (Mobile only) */}
        <button
          className="md:hidden text-black dark:text-white text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-gray-700 dark:bg-white"></div>
            <div className="w-6 h-0.5 bg-gray-700 dark:bg-white"></div>
            <div className="w-6 h-0.5 bg-gray-700 dark:bg-white"></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col gap-4 px-8 py-6 md:hidden rounded-b-xl transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-2 cursor-pointer text-black dark:text-white">
            <FaLayerGroup className="text-indigo-600" />
            <span>Pages</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer text-black dark:text-white">
            <FaUserCircle className="text-indigo-600" />
            <span>Account</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer text-black dark:text-white">
            <HiOutlineDotsCircleHorizontal className="text-indigo-600" />
            <span>Blocks</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer text-black dark:text-white">
            <FiCode className="text-indigo-600" />
            <span>Docs</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
