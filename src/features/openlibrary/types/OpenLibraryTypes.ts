export interface KeyData {
    name: string
    author_name: string[]
    key: string
    title: string
}

export interface SearchBookData {
    docs: KeyData[]
}

export interface WorkData {
    authors: { key: string; type: string }
    covers: number[]
}
