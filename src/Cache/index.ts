export interface ICache {
    set: (key: string, value?: { [key:string]: any }, expireInSeconds?: number) => void;
    get: <T = any>(key: string) => Promise<T>
}

export { RedisCache } from "./Redis"
export { MemoryCache } from "./Memory"