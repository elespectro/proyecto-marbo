"use client"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { database } from "@/lib/firebase"
import { ref, onValue } from "firebase/database"
import Image from "next/image"

type Product = {
  id: string
  name: string
  price: number
  category: string
  description: string
  imageUrl: string
}

export default function MenuPage() {
  const [menu, setMenu] = useState<Product[]>([])
  const [filteredMenu, setFilteredMenu] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")

  useEffect(() => {
    const menuRef = ref(database, "menu")
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const menuList: Product[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
        setMenu(menuList)
        setFilteredMenu(menuList)
        const uniqueCategories = ["Todos", ...Array.from(new Set(menuList.map((item) => item.category)))]
        setCategories(uniqueCategories)
      }
    })
  }, [])

  const filterByCategory = (category: string) => {
    setSelectedCategory(category)
    if (category === "Todos") {
      setFilteredMenu(menu)
    } else {
      setFilteredMenu(menu.filter((item) => item.category === category))
    }
  }

  return (
    <div className="bg-brand-light-yellow min-h-screen">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-brand-brown mb-8">Nuestro Menú</h1>
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => filterByCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`${selectedCategory === category ? "bg-brand-orange text-white" : "text-brand-brown border-brand-orange"} hover:bg-brand-orange/80`}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMenu.map((item) => (
            <Card key={item.id} className="bg-brand-beige border-brand-brown overflow-hidden shadow-lg">
              <CardHeader className="p-0">
                <div className="w-full h-48 relative">
                  <Image
                    src={item.imageUrl || "/placeholder.svg?width=400&height=300&query=Comida"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-bold text-brand-brown">{item.name}</CardTitle>
                <p className="text-brand-brown/80 mt-2">{item.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <p className="text-lg font-semibold text-brand-orange">${item.price.toFixed(2)}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
