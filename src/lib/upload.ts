import { UploadTicket } from "@/types/media/upload-ticket"

export async function uploadDirectly(ticket: UploadTicket, file: File) {
  const form = new FormData()
  Object.entries(ticket.fields).forEach(([key, value]) => form.append(key, value))
  form.append("file", file)
  const response = await fetch(ticket.uploadUrl, { method: "POST", body: form })
  if (!response.ok) throw new Error("Falha ao enviar o arquivo para o armazenamento.")
}

export const imageTypes = ["image/jpeg", "image/png", "image/webp"]
export const maxImageSize = 5 * 1024 * 1024
export const videoTypes = ["video/mp4"]
export const maxVideoSize = 2 * 1024 * 1024 * 1024

