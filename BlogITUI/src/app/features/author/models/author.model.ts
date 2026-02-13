export interface AddAuthorRequest {
    name: string,
    urlHandle: string
}

export interface Author {
    id: string,
    name: string,
    urlHandle: string
}

export interface EditAuthorRequest {
    name: string,
    urlHandle: string
}