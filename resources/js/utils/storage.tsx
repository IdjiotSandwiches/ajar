export function storageUrl(path: any, placeholder = 'https://placehold.co/40') {
    if (!path) return placeholder;
    if (/^(https?:|blob:)/.test(path)) return path;
    return `/storage/${path}`;
}
