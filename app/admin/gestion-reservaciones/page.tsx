"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { database } from "@/lib/firebase"
import { ref, onValue, update, remove } from "firebase/database"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

type Reservation = {
  id: string
  name: string
  phone: string
  people: string
  date: string
  time: string
  comments?: string
  status: "pending" | "confirmed" | "cancelled"
}

export default function ReservationManagementPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [reservations, setReservations] = useState<Reservation[]>([])

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated")
    if (isAuthenticated !== "true") {
      router.push("/admin")
    }

    const reservationsRef = ref(database, "reservations")
    onValue(reservationsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const reservationList: Reservation[] = Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        setReservations(reservationList.reverse()) // Show newest first
      } else {
        setReservations([])
      }
    })
  }, [router])

  const updateStatus = (id: string, status: Reservation["status"]) => {
    const reservationRef = ref(database, `reservations/${id}`)
    update(reservationRef, { status })
      .then(() => toast({ title: `Reservación ${status === "confirmed" ? "confirmada" : "cancelada"}` }))
      .catch(() => toast({ title: "Error al actualizar", variant: "destructive" }))
  }

  const deleteReservation = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta reservación permanentemente?")) {
      const reservationRef = ref(database, `reservations/${id}`)
      remove(reservationRef)
        .then(() => toast({ title: "Reservación eliminada" }))
        .catch(() => toast({ title: "Error al eliminar", variant: "destructive" }))
    }
  }

  const getStatusBadge = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmada</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelada</Badge>
      case "pending":
      default:
        return <Badge variant="secondary">Pendiente</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-brand-light-yellow p-8">
      <Button asChild variant="link" className="text-brand-brown mb-4">
        <Link href="/admin/dashboard">← Volver al Panel</Link>
      </Button>
      <h1 className="text-3xl font-bold text-brand-brown mb-8">Gestión de Reservaciones</h1>
      <div className="space-y-4">
        {reservations.length > 0 ? (
          reservations.map((res) => (
            <Card key={res.id} className="bg-white/80 border-brand-orange">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-brand-brown">{res.name}</CardTitle>
                {getStatusBadge(res.status)}
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Teléfono:</strong> {res.phone}
                </p>
                <p>
                  <strong>Personas:</strong> {res.people}
                </p>
                <p>
                  <strong>Fecha:</strong> {res.date} a las {res.time}
                </p>
                {res.comments && (
                  <p>
                    <strong>Comentarios:</strong> {res.comments}
                  </p>
                )}
                <div className="mt-4 space-x-2">
                  {res.status === "pending" && (
                    <>
                      <Button
                        onClick={() => updateStatus(res.id, "confirmed")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Confirmar
                      </Button>
                      <Button onClick={() => updateStatus(res.id, "cancelled")} variant="secondary">
                        Cancelar
                      </Button>
                    </>
                  )}
                  <Button onClick={() => deleteReservation(res.id)} variant="destructive">
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-brand-brown">No hay reservaciones.</p>
        )}
      </div>
    </div>
  )
}
