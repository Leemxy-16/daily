import { Home, Search, Bookmark, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const navItems = [
    { label: "Home", icon: <Home size={20} />, path: "/home"},
    { label: "Search", icon: <Search size={20} />, path: "/search" },
    { label: "Library", icon: <Bookmark size={20} />, path: "/library" },
    { label: "Profile", icon: <User size={20} />, path: "/profile" },
  ];

  return (
    <footer className="absolute w-full max-w-md bottom-0 bg-input text-white py-3 px-6 flex justify-between items-center shadow-inner z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${isActive ? "text-red-500" : "text-white"}`
          }
        >
          {item.icon}
          <span className="mt-1">{item.label}</span>
        </NavLink>
      ))}
    </footer>
  );
}