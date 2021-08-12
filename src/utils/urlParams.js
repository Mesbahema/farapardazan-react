export const setUrlParams = (states) => {
    const url = new URL(window.location);
    for (const [key, value] of Object.entries(states)) {
        if (value !== null)
            url.searchParams.set(key, value);
    }
    window.history.pushState({}, '', url);
}

export const getUrlParams = (states) => {
    const queryString = window.location.search;

    let object = {}

    const urlParams = new URLSearchParams(queryString);

    for (const [key, value] of Object.entries(states)) {
        
        const param = urlParams.get(key)

        object[key] = param
    }
    return object
}