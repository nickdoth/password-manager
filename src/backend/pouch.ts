import { BundleService, PasswordService, Password, CredentialObject, backendErrors } from ".";

import PouchDB from 'pouchdb';
import pouchDbFind from 'pouchdb-find';
// @ts-ignore
import pouchDbDebug from 'pouchdb-debug';
import { v4 as uuidv4 } from 'uuid';

PouchDB.plugin(pouchDbDebug);
PouchDB.plugin(pouchDbFind);
PouchDB.debug.enable('pouchdb:find');


export const DEFAULT_DB_NAME = 'password-manager-db';
export const TYPE_PASSWORD = 'Password';
export const TYPE_CREDENTIAL_OBJECT = 'CredentialObject';

export const CREDENTIAL_KEY_NAME = 'PASSWORD_MANAGER_CREDENTIAL';

export const bundleService: BundleService = {
    createStorageWithPassphrase: async (ph) => {
        const db = new PouchDB(DEFAULT_DB_NAME);
        const existingCredentialCount = await db.find({
            selector: {
                type: TYPE_CREDENTIAL_OBJECT,
            }
        }).then((result) => result.docs.length);

        if (existingCredentialCount > 0) {
            console.info('Already created');
            return DEFAULT_DB_NAME;
        }

        const id = `_local/${uuidv4()}`;
        
        const credentialObject: CredentialObject = {
            _id: id,
            now: Date.now(),
            version: 1,
            type: TYPE_CREDENTIAL_OBJECT,
            _rev: '',
        };

        
        const response = await db.put(credentialObject);
        await db.putAttachment(id,
            CREDENTIAL_KEY_NAME,
            new Blob([
                await slowDigest(ph)
            ]),
            'application/octet-stream',
        );

        return DEFAULT_DB_NAME;
    },

    changePassphrase: async (bid, ph, newPh) => {
        throw new Error('Not implemented');
    },

    bundleExists: async (bid) => {
        const db = new PouchDB(bid);
        const credentialObject = await db.find({
            selector: {
                type: TYPE_CREDENTIAL_OBJECT,
            }
        }).then(result => result.docs[0] as CredentialObject | undefined);
        return !!credentialObject;
    },

    getPasswordService: (bid, ph) => {
        const db = new PouchDB(bid);

        const getKeyData = async () => {
            const credentialObject = await db.find({
                selector: {
                    type: TYPE_CREDENTIAL_OBJECT,
                }
            }).then(result => result.docs[0] as CredentialObject | undefined);

            if (credentialObject) {
                return await db.getAttachment(credentialObject._id, CREDENTIAL_KEY_NAME).then(async (blob) => {
                    return new Uint8Array(await (blob as Blob).arrayBuffer());
                });
            } else {
                throw backendErrors.bundleNotFound();
            }
        };
        
        return {
            async getAllPasswords(kw) {
                await db.createIndex({
                    index: {
                        fields: [ 'type' ],
                    },
                });

                const docs = await db.find({
                    selector: {
                        type: TYPE_PASSWORD,
                    },
                }).then(results => {
                    console.log(results);
                    return results.docs;
                });
                return docs;
            },
            async addPassword(password: Password) {
                const keyData = await getKeyData();
                const key = await prepareKeyWithPassphrase(keyData, ph);

                const encryptedText = await encryptText(password.passwordText, key).then(arrayBufferToBase64);

                password = { ...password, passwordText: encryptedText, _id: uuidv4(), type: TYPE_PASSWORD };
                const res = await db.put(password);
                return { ...password, _rev: res.rev };
            },
            async editPassword(password: Password) {
                const res = await db.put(password);
                return { ...password, _rev: res.rev };
            },
            async removePassword(pid: string) {
                const password = await db.get(pid);
                await db.remove(password);
            },
        } as PasswordService;
    },
};

const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer): Promise<string> => {
    return new Promise((resolve) => {
        const blob = new Blob([arrayBuffer]);
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target!.result;
            resolve(base64 as string);
        };
        reader.readAsDataURL(blob);
    });
}

const DIGEST_ALGO = () => ({ name: "SHA-256" });
const ENCRYPT_ALGO_AES_GCM = (iv: Uint8Array) => ({ name: 'AES-GCM', iv });
const createGCMInitialVector = () => window.crypto.getRandomValues(new Uint8Array(12));

export const encryptText = async (text: string, key: CryptoKey) => {
    const iv = createGCMInitialVector();
    const data = (new TextEncoder()).encode(text);
    const encryptedData = await window.crypto.subtle.encrypt(ENCRYPT_ALGO_AES_GCM(iv), key, data);
    const ivAndEncrypted = new Uint8Array(iv.byteLength + encryptedData.byteLength);
    ivAndEncrypted.set(iv, 0);
    ivAndEncrypted.set(new Uint8Array(encryptedData), iv.byteLength);

    return ivAndEncrypted;
}

export const decryptText = async (ivAndEncrypted: Uint8Array, key: CryptoKey) => {
    const iv = ivAndEncrypted.slice(0, 12);
    const encrypted = ivAndEncrypted.slice(12);
    // console.log(iv, encrypted);
    const data = await window.crypto.subtle.decrypt(ENCRYPT_ALGO_AES_GCM(iv), key, encrypted);
    return (new TextDecoder()).decode(data);
}


export const prepareKeyWithPassphrase = async (keyData: Uint8Array, passphrase: string) => {
    const phData = (new TextEncoder()).encode(passphrase);
    const data = new Uint8Array(phData.byteLength + keyData.byteLength);
    data.set(phData, 0);
    data.set(keyData, phData.byteLength);

    const digest = await window.crypto.subtle.digest(DIGEST_ALGO(), data);
    return await window.crypto.subtle.importKey('raw', digest, 'AES-GCM',
        false, [ 'decrypt', 'encrypt' ],
    );
}

export const slowDigest = async (passphrase: string) => {
    let data = (new TextEncoder()).encode(passphrase);
    console.time('slowDigest');
    for (let i = 0; i < 5000; ++i) {
        let intermediate = await window.crypto.subtle.digest(DIGEST_ALGO(), data);
        let next = new Uint8Array(data.byteLength + intermediate.byteLength);
        next.set(data, 0);
        next.set(new Uint8Array(intermediate), data.byteLength);
        data = next;
    }

    const final = await window.crypto.subtle.digest(DIGEST_ALGO(), data)
    
    console.timeEnd('slowDigest');

    return final;
}

(window as any).encryptionTest = {
    encryptText, decryptText, prepareKeyWithPassphrase, slowDigest,
    case: async () => {
        // const text = 'Hello World!';
        // const key1 = await createKeyFromPassphrase('password');
        // const enc = await encryptText(text, key1);
        // const dec = await decryptText(enc, key1);
        // console.info(text === dec);
    }
};