import {UploadTicket} from "@/types/media/upload-ticket";

export async function uploadMedia(ticket: UploadTicket, file: File) {
    const formData = new FormData();

    Object.entries(ticket.fields).forEach(([key, value]) => {
        formData.append(key, value);
    });
    formData.append("file", file);

    const response = await fetch(ticket.uploadUrl, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Não foi possível enviar o arquivo.");
    }
}
