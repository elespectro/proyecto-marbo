import { MapPin, Phone, Star } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="font-bold text-lg mb-2 text-brand-orange">Contacto</h3>
          <p className="flex items-center justify-center md:justify-start">
            <Phone className="mr-2 h-4 w-4" /> +52 1 988 170 1472
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2 text-brand-orange">Ubicación</h3>
          <p className="flex items-center justify-center md:justify-start">
            <MapPin className="mr-2 h-4 w-4" /> Calle 31 #317 x 32 y 34. Col. Centro
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2 text-brand-orange">Calificaciones</h3>
          <Link
            href="https://maps.app.goo.gl/ti5sHQD3bTGYVSc67"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-brand-orange"
          >
            <div className="flex items-center mr-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
            </div>
            Ver en Google Maps
          </Link>
        </div>
      </div>
    </footer>
  )
}
