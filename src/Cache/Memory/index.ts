import { ICache } from "..";

export class MemoryCache implements ICache {

    private _memory: {[key: string]: any};

    constructor() {
        this._memory = {};
    }

    set(key: string, value?: { [key: string]: any; } | undefined, expireInSeconds?: number | undefined) {
        if (value == null || value == undefined) {
            if(this._memory[key] !== null && this._memory[key] !== undefined) 
                this._memory[key] = undefined;
        } else {
            this._memory[key] = value;
        }
    };

    get<T = any>(key: string): Promise<T> {
        return new Promise((resolve, reject) => {
            resolve(this._memory[key]);
        });
    };
}