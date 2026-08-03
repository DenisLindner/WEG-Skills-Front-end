import "server-only";

import {getAccessToken} from "@/lib/session";
import {ApiError} from "@/services/api-error";
import {proxyMediaUrls} from "@/lib/media";

type BackendOptions = RequestInit & {
    auth?: boolean
}

function getBaseUrl() {
    const url = process.env.API_URL;
    if (!url) {
        throw new Error('Missing API URL');
    }
    return url;
}

function getMediaUrl() {
    const url = process.env.MEDIA_URL;
    if (!url) {
        return 'http://localhost:9000';
    }
    return url;
}

export async function backendFetch<T>(path: string, options: BackendOptions = {}): Promise<T> {
    const headers = new Headers(options.headers);
    const isFormData = options.body instanceof FormData;

    headers.set('Accept', 'application/json');
    if (options.body && !isFormData && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    if (options.auth !== false) {
        const token = await getAccessToken();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }

    const response = await fetch(`${getBaseUrl()}/${path}`, {
        ...options,
        headers,
        cache: options.cache ?? 'no-store'
    });

    if (!response.ok) {
        throw await ApiError.fromResponse(response);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    const body: unknown = await response.json();
    return proxyMediaUrls(body, getMediaUrl()) as T;
}
