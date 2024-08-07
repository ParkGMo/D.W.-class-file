"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
          {path === "/" ? "🍀" : ""}
        </li>
        <li>
          <Link href="/about-us">about-us</Link>
          {path === "/about-us" ? "☘" : ""}
        </li>
        <li>
          <Link href="/company">company</Link>
          {path === "/company" ? "🥀" : ""}
        </li>
        <li>
          <Link href="/sales">sales</Link>
          {path === "/sales" ? "🌷" : ""}
        </li>
      </ul>
    </nav>
  );
}
