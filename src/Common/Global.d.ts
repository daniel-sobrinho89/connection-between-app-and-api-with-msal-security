export {};

declare global {
    interface Order {
        description: string,
        amount: number
    }
}