export type UploadTicket = {
    mediaId: number
    uploadUrl: string
    objectKey: string
    fields: Record<string, string>
    expiresAt: string
}