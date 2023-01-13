export interface Response<T> {
    data: T,
    status?: string,
    message?: string
}