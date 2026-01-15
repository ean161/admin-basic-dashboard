export type User = {
    id: string,
    username: string,
    role: "USER" | "ADMIN",
    balance: number
}