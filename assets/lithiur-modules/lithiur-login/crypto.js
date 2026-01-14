// crypto.js — custom lightweight cryptography helper

// Node.js crypto detection
let nodeCrypto = null;
try {
    nodeCrypto = require("crypto");
} catch (err) {
    nodeCrypto = null;
}

// Browser fallback for SHA-256
async function browserSHA256(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// Main SHA-256 function
async function sha256(message) {
    if (nodeCrypto) {
        return nodeCrypto.createHash("sha256")
            .update(message)
            .digest("hex");
    }
    return await browserSHA256(message);
}

// Create random token (32 chars)
function randomToken(length = 32) {
    if (nodeCrypto) {
        return nodeCrypto.randomBytes(length).toString("hex");
    }
    // Browser fallback
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array)
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// Salt generator
function generateSalt(size = 16) {
    if (nodeCrypto) {
        return nodeCrypto.randomBytes(size).toString("hex");
    }
    const array = new Uint8Array(size);
    crypto.getRandomValues(array);
    return Array.from(array)
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// Salted hash
async function hashWithSalt(message, salt) {
    const hashed = await sha256(message + salt);
    return `${salt}:${hashed}`;
}

// Verify salted hash
async function verifyHash(message, stored) {
    const [salt, hash] = stored.split(":");
    const newHash = await sha256(message + salt);
    return newHash === hash;
}

// Export
module.exports = {
    sha256,
    randomToken,
    generateSalt,
    hashWithSalt,
    verifyHash
};
