export function proxyMediaUrls<T>(data: T, mediaBaseUrl: string): T {
  if (data === null || data === undefined) {
    return data
  }

  if (typeof data === "string") {
    if (data.startsWith("/medias/") || data.startsWith("/media/")) {
      const baseUrl = mediaBaseUrl.replace(/\/$/, "")
      return `${baseUrl}${data}` as unknown as T
    }
    return data
  }

  if (Array.isArray(data)) {
    return data.map((item) => proxyMediaUrls(item, mediaBaseUrl)) as unknown as T
  }

  if (typeof data === "object") {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      result[key] = proxyMediaUrls(value, mediaBaseUrl)
    }
    return result as T
  }

  return data
}
