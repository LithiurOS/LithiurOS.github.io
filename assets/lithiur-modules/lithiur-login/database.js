// database.js — browser DB using localStorage (no JSON files)

// Import SHA256
import { sha256 } from "./crypto.js";

class BrowserDB {
    constructor(prefix = "db_") {
        this.prefix = prefix;
    }

    async setUser(username) {
        const hash = await sha256(username);
        const key = this.prefix + hash;
        localStorage.setItem(key, username);
        return key;
    }

    async getUser(username) {
        const hash = await sha256(username);
        const key = this.prefix + hash;
        return localStorage.getItem(key);
    }

    async userExists(username) {
        const hash = await sha256(username);
        return localStorage.getItem(this.prefix + hash) !== null;
    }

    deleteUser(username) {
        const items = Object.keys(localStorage);
        for (const key of items) {
            if (key.startsWith(this.prefix)) {
                const value = localStorage.getItem(key);
                if (value === username) {
                    localStorage.removeItem(key);
                    return true;
                }
            }
        }
        return false;
    }

    getAll() {
        let users = [];
        for (const key in localStorage) {
            if (key.startsWith(this.prefix)) {
                users.push(localStorage.getItem(key));
            }
        }
        return users;
    }
}

export default BrowserDB;
