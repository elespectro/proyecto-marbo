"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function AdminLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de autenticación simple. Reemplazar con una real.
    if (username === "admin" && password === "password") {
      // En una app real, guardarías un token de sesión.
      sessionStorage.setItem("isAdminAuthenticated", "true")
      router.push("/admin/dashboard")
    } else {
      toast({
        title: "Error de inicio de sesión",
        description: "Usuario o contraseña incorrectos.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-beige">
      <Card className="w-full max-w-sm bg-white/80 border-brand-orange">
        <CardHeader>
          <CardTitle className="text-2xl text-brand-brown">Panel de Administrador</CardTitle>
          <CardDescription className="text-brand-brown/80">
            Inicia sesión para gestionar el restaurante.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-brand-brown font-bold"
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
