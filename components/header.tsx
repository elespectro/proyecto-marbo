"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { Globe } from "lucide-react"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/menu", label: "Menú" },
    { href: "/reservacion", label: "Reservación" },
  ]

  const isHomePage = pathname === "/"

  return (
    <header
      className={`w-full p-4 flex justify-between items-center bg-black    ${isHomePage ? "bg-transparent" : "bg-brand-brown shadow-md"}`}
    >
      <Link href="/">
        <div className="flex items-center space-x-2">
          <Image src="/marbo-sin-fondo.png" alt="Logo" width={50} height={50} className={isHomePage ? "invert" : ""} />
          
        </div>
      </Link>
      <nav className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <span
              className={`font-medium ${isHomePage ? "text-white hover:text-brand-orange" : "text-brand-beige hover:text-brand-orange"}`}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className={isHomePage ? "text-white hover:bg-white/10" : "text-brand-beige hover:bg-white/10"}
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Cambiar idioma</span>
        </Button>
      </div>
    </header>
  )
}
