export const serUrlParams = (states) => {
    const url = new URL(window.location);
    url.searchParams.set('foo', 'bar');
    window.history.pushState({}, '', url);
}