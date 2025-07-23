"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart } from "lucide-react"
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const reservationData = [
  { name: "Ene", confirmadas: 30, canceladas: 5, totalPersonas: 120 },
  { name: "Feb", confirmadas: 45, canceladas: 8, totalPersonas: 180 },
  { name: "Mar", confirmadas: 60, canceladas: 12, totalPersonas: 240 },
  { name: "Abr", confirmadas: 50, canceladas: 10, totalPersonas: 200 },
  { name: "May", confirmadas: 70, canceladas: 15, totalPersonas: 280 },
  { name: "Jun", confirmadas: 80, canceladas: 7, totalPersonas: 320 },
]

const pieData = [
  { name: "Confirmadas", value: 335 },
  { name: "Canceladas", value: 57 },
]
const COLORS = ["#D98324", "#443627"]

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated")
    if (isAuthenticated !== "true") {
      router.push("/admin")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-brand-light-yellow p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brand-brown">Panel de Control</h1>
        <Button
          onClick={() => {
            sessionStorage.removeItem("isAdminAuthenticated")
            router.push("/admin")
          }}
          variant="destructive"
        >
          Cerrar Sesión
        </Button>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Button asChild className="p-8 text-xl bg-brand-brown hover:bg-brand-brown/90">
          <Link href="/admin/gestion-menu">Gestionar Menú</Link>
        </Button>
        <Button asChild className="p-8 text-xl bg-brand-orange hover:bg-brand-orange/90">
          <Link href="/admin/gestion-reservaciones">Gestionar Reservaciones</Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-white/80 border-brand-orange">
          <CardHeader>
            <CardTitle className="flex items-center text-brand-brown">
              <BarChart className="mr-2" />
              Reservaciones por Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={reservationData}>
                <XAxis dataKey="name" stroke="#443627" />
                <YAxis stroke="#443627" />
                <Tooltip />
                <Legend />
                <Bar dataKey="confirmadas" fill="#D98324" />
                <Bar dataKey="canceladas" fill="#443627" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-brand-orange">
          <CardHeader>
            <CardTitle className="flex items-center text-brand-brown">
              <LineChart className="mr-2" />
              Total de Personas por Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={reservationData}>
                <XAxis dataKey="name" stroke="#443627" />
                <YAxis stroke="#443627" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalPersonas" stroke="#D98324" strokeWidth={2} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
