export interface Password {
    id: string;
    recordName: string;
    username: string;
    passwordText: string;
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
}

export interface PasswordService {
    getAllPasswords(kw?: string): Promise<Password[]>;
    addPassword(password: Password): Promise<Password>;
    editPassword(password: Password): Promise<Password>;
    removePassword(pid: string): Promise<void>;
}