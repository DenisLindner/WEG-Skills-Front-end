export const mediaProxyPrefix = '/_media';

export function proxyMediaUrl(value: string, sourceUrl: string) {
    try {
        const url = new URL(value);
        const source = new URL(sourceUrl);

        if (url.origin !== source.origin) {
            return value;
        }

        return `${mediaProxyPrefix}${url.pathname}${url.search}${url.hash}`;
    } catch {
        return value;
    }
}

export function proxyMediaUrls(value: unknown, sourceUrl: string): unknown {
    if (typeof value === "string") {
        return proxyMediaUrl(value, sourceUrl);
    }

    if (Array.isArray(value)) {
        return value.map((item) => proxyMediaUrls(item, sourceUrl));
    }

    if (value && typeof value === "object") {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [
                key,
                proxyMediaUrls(item, sourceUrl),
            ]),
        );
    }

    return value;
}