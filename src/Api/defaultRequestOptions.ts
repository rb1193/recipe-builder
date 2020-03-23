const defaultRequestOptions: RequestInit = {
    credentials: 'include',
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
}

export default defaultRequestOptions;