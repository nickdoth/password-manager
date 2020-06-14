export interface BaseEntity extends PouchDB.Core.IdMeta, PouchDB.Core.GetMeta {
    // _id: string;
    // _rev: string;
    type: string;
}

export interface Password extends BaseEntity {
    recordName: string;
    username: string;
    passwordText: string;
}

export interface CredentialObject extends BaseEntity {
    now: number;
    version: 1;

}

export interface BundleService {
    /**
     * 
     * @param ph Passphrase
     * @returns bid: Bundle ID
     */
    createStorageWithPassphrase(ph: string): Promise<string>;
    changePassphrase(bid: string, ph: string, newPh: string): Promise<void>;

    getPasswordService(bid: string, ph: string): PasswordService;

    bundleExists(bid: string): Promise<boolean>;
}

export interface PasswordService {
    getAllPasswords(kw?: string): Promise<Password[]>;
    addPassword(password: Password): Promise<Password>;
    editPassword(password: Password): Promise<Password>;
    removePassword(pid: string): Promise<void>;
}

export const backendErrors = {
    bundleNotFound: () => new Error('ERR_BUNDLE_NOT_FOUND'),
};