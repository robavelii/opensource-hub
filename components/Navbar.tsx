"use client";
import { NextPage } from "next";
import { Suspense } from "react";
import { NavLink } from "./NavLink";
import Link from "next/link";

interface NavLink {
  name: string;
  path: string;
  external?: boolean;
}

const Navbar: NextPage = () => {
  const navLinks: NavLink[] = [
    { name: "Home", path: "/" },
    {
      name: "Github",
      path: "https://github.com/robavelii",
      external: true,
    },
  ];

  return (
    <Suspense>
      <nav className="top-0 z-10 sticky border-b border-dashed border-gray-800 mx-auto bg-transparent backdrop-blur-sm">
        <div className="flex justify-between md:justify-around p-5 w-full">
          {/* Logo  */}
          <div className="item-navbar" id="logo-os">
            <Link
              href="/"
              className="inline-flex h-10 items-center text-white rounded-lg font-extrabold text-[2rem]"
            >
              OpenSource<span className="text-primary">Hub</span>
            </Link>
          </div>

          {/* Main navbar element*/}
          <div className="item-navbar hidden md:block" id="elements-of-navbar">
            <ul className="flex items-center gap-5 text-[1rem]">
              {navLinks.map((navLink) => (
                <li key={navLink.path}>
                  {navLink.external ? (
                    <NavLink
                      href={navLink.path}
                      aria-label="desktop navbar link"
                      target="_blank"
                      rel="noopenner noreferrer"
                      className={(active) =>
                        active
                          ? "inline-block py-2 px-3 text-center text-primary hover:text-primary rounded-lg"
                          : "inline-block py-2 px-3 text-center text-white hover:text-primary rounded-lg"
                      }
                    >
                      {navLink.name}
                    </NavLink>
                  ) : (
                    <NavLink
                      href={navLink.path}
                      className={(active) =>
                        active
                          ? "inline-block py-2 px-3 text-center text-primary hover:text-primary rounded-lg"
                          : "inline-block py-2 px-3 text-center text-white hover:text-primary rounded-lg"
                      }
                    >
                      {navLink.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </Suspense>
  );
};

export default Navbar;
