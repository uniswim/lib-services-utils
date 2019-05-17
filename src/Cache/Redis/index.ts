import * as Redis from "redis"
import * as Flat from "flat"
import { ICache } from "..";

export class RedisCache implements ICache {

    private _RedisClient: Redis.RedisClient;

    constructor(redisOptions: Redis.ClientOpts) {
        this._RedisClient = Redis.createClient(redisOptions);
    }

    set(key: string, value?: { [key: string]: any; } | undefined, expireInSeconds?: number | undefined) {
        if (value == null || value == undefined) {
            this._RedisClient.del(key);
        } else {
            let _objToStock: { [key: string]: string | number } = Flat(value);
            this._RedisClient.hmset(key, _objToStock);
            if (expireInSeconds) this._RedisClient.expire(key, expireInSeconds);
        }
    };

    get<T = any>(key: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this._RedisClient.hgetall(key, (err, obj) => {
                if (err) reject(err);
                else resolve(Flat.unflatten(obj as any))
            })
        });
    };
}