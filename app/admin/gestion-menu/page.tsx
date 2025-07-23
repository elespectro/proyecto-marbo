"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { database, storage } from "@/lib/firebase"
import { ref, push, onValue, remove } from "firebase/database"
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import Link from "next/link"

type Product = {
  id: string
  name: string
  price: number
  category: string
  description: string
  imageUrl: string
}

export default function MenuManagementPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [menu, setMenu] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "", description: "" })
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAdminAuthenticated")
    if (isAuthenticated !== "true") {
      router.push("/admin")
    }

    const menuRef = ref(database, "menu")
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const menuList: Product[] = Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        setMenu(menuList)
      } else {
        setMenu([])
      }
    })
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewProduct((prev) => ({ ...prev, [id]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.price || !newProduct.category || !imageFile) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, completa todos los campos y selecciona una imagen.",
        variant: "destructive",
      })
      return
    }

    try {
      const imageStorageRef = storageRef(storage, `menu-images/${Date.now()}_${imageFile.name}`)
      await uploadBytes(imageStorageRef, imageFile)
      const imageUrl = await getDownloadURL(imageStorageRef)

      const menuRef = ref(database, "menu")
      await push(menuRef, {
        ...newProduct,
        price: Number.parseFloat(newProduct.price),
        imageUrl: imageUrl,
      })

      toast({ title: "Éxito", description: "Producto añadido correctamente." })
      setNewProduct({ name: "", price: "", category: "", description: "" })
      setImageFile(null)
      ;(document.getElementById("image") as HTMLInputElement).value = ""
    } catch (error) {
      console.error(error)
      toast({ title: "Error", description: "No se pudo añadir el producto.", variant: "destructive" })
    }
  }

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      const productRef = ref(database, `menu/${id}`)
      remove(productRef)
        .then(() => toast({ title: "Producto eliminado" }))
        .catch(() => toast({ title: "Error al eliminar", variant: "destructive" }))
    }
  }

  const filteredMenu = menu.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-brand-light-yellow p-8">
      <Button asChild variant="link" className="text-brand-brown mb-4">
        <Link href="/admin/dashboard">← Volver al Panel</Link>
      </Button>
      <h1 className="text-3xl font-bold text-brand-brown mb-8">Gestión de Menú</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 bg-white/80 border-brand-orange">
          <CardHeader>
            <CardTitle className="text-brand-brown">Añadir Nuevo Producto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" value={newProduct.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="price">Precio</Label>
                <Input id="price" type="number" value={newProduct.price} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Input id="category" value={newProduct.category} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" value={newProduct.description} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="image">Foto</Label>
                <Input id="image" type="file" onChange={handleFileChange} accept="image/*" />
              </div>
              <Button type="submit" className="w-full bg-brand-orange text-brand-brown font-bold">
                Añadir Producto
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-4">
            {filteredMenu.map((item) => (
              <Card key={item.id} className="flex items-center p-4 bg-white/80 border-brand-orange">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="font-bold text-brand-brown">{item.name}</h3>
                  <p className="text-sm text-brand-brown/80">
                    {item.category} - ${item.price.toFixed(2)}
                  </p>
                </div>
                <Button onClick={() => handleDeleteProduct(item.id)} variant="destructive" size="sm">
                  Eliminar
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
