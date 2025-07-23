"use client"
import { useState } from "react"
import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, MapPin, Clock } from "lucide-react"
import { database } from "@/lib/firebase"
import { ref, push } from "firebase/database"
import { useToast } from "@/hooks/use-toast"

export default function ReservationPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    people: "",
    date: "",
    time: "",
    comments: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const reservationsRef = ref(database, "reservations")
    push(reservationsRef, { ...formData, status: "pending", createdAt: new Date().toISOString() })
      .then(() => {
        toast({
          title: "¡Reservación Realizada! 😊",
          description: "Se realizó su reservación, nos pondremos en contacto con usted para terminar de confirmar.",
        })
        setFormData({ name: "", phone: "", people: "", date: "", time: "", comments: "" })
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "No se pudo enviar la reservación. Inténtalo de nuevo.",
          variant: "destructive",
        })
        console.error(error)
      })
  }

  return (
    <div className="bg-brand-beige min-h-screen">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-brand-brown mb-8">Haz tu Reservación</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="bg-white/50 border-brand-orange">
            <CardHeader>
              <CardTitle className="text-brand-brown">Completa el formulario</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-brand-brown">
                    Nombre Completo
                  </Label>
                  <Input id="name" value={formData.name} onChange={handleChange} required className="bg-white" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-brand-brown">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="people" className="text-brand-brown">
                    Número de Personas (Máx. 4)
                  </Label>
                  <Input
                    id="people"
                    type="number"
                    min="1"
                    max="4"
                    value={formData.people}
                    onChange={handleChange}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="date" className="text-brand-brown">
                    Fecha
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-brand-brown">
                    Hora
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="comments" className="text-brand-brown">
                    Comentarios (Opcional)
                  </Label>
                  <Textarea id="comments" value={formData.comments} onChange={handleChange} className="bg-white" />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-brand-brown font-bold"
                >
                  Enviar Reservación
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-8">
            <Card className="bg-white/50 border-brand-orange">
              <CardHeader>
                <CardTitle className="text-brand-brown">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-brand-brown">
                <p className="flex items-center">
                  <MapPin className="mr-2 text-brand-orange" /> Calle 31 #317 x 32 y 34. Col. Centro
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2 text-brand-orange" /> +52 1 988 170 1472
                </p>
                <p className="flex items-center">
                  <Clock className="mr-2 text-brand-orange" /> Lunes a Domingo: 08:00 - 23:00 (Cerrado Miércoles)
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/50 border-brand-orange">
              <CardHeader>
                <CardTitle className="text-brand-brown">Consideraciones</CardTitle>
              </CardHeader>
              <CardContent className="text-brand-brown">
                <ul className="list-disc list-inside space-y-2">
                  <li>Por favor, llega 15 minutos antes de tu hora de reservación.</li>
                  <li>Contamos con 10 minutos de tolerancia.</li>
                  <li>Si necesitas cancelar, avísanos con al menos 2 horas de antelación.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
