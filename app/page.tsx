import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="relative flex flex-col items-center justify-center flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/Fondo-marbo.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10">
          <Header />
          <main className="flex flex-col items-center justify-center text-center text-white px-4">
            <Image
              src="/marbo-sin-fondo.png"
              alt="Marbo Bistro & Café Logo"
              width={300}
              height={300}
              className="mb-8 invert"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-brand-light-yellow mb-4">
              {"Bienvenido"}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 text-brand-beige">
              Disfruta de una experiencia culinaria única en un ambiente acogedor. Permitenos que cada bocado sea una experiencia.         
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-brand-brown font-bold">
                <Link href="/menu">Ver Menú</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-brand-brown font-bold bg-transparent"
              >
                <Link href="/reservacion">Reservar Mesa</Link>
              </Button>
            </div>
          </main>
        </div>
        <div className="absolute bottom-4 right-4 z-10">
          <Link href="/admin" className="text-xs text-gray-400 hover:text-white">
            Administrador
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
