"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Textarea } from "@/components/atoms/textarea"
import { Label } from "@/components/atoms/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card"

export default function CreateCourse() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState<File | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log({ title, description, image })
  }

  function handleClearImage() {
    setImage(null)
    if (fileRef.current) {
      fileRef.current.value = ""
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#00335C] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-[2rem] text-[#00335C]">
            Criar Curso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title" className="text-[1.5rem]">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título do curso"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-[1.5rem]">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Digite a descrição do curso"
                className="min-h-24"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="image" className="text-sm">Imagem do curso</Label>
              <div className="flex gap-2">
                <Input
                  ref={fileRef}
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                  className="flex-1"
                />
                {image && (
                  <Button type="button" variant="destructive" onClick={handleClearImage}>
                    Apagar
                  </Button>
                )}
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-2 w-full text-sm">
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
