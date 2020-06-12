import { BundleService, PasswordService, Password } from ".";
import { v4 as uuidv4 } from 'uuid';

let dummyData = [
    {
        id: uuidv4(),
        username: 'Nick',
        recordName: 'ICBC Password',
        passwordText: '84839857837249',
    },
];

export default {
    bundleService: {
        async createStorageWithPassphrase(ph: string): Promise<string> {
            return 'default';
        },

        getPasswordService(bid, ph): PasswordService {
            return {
                async getAllPasswords(kw) {
                    return dummyData;
                },
                async addPassword(password: Password) {
                    password = { ...password, id: uuidv4() };
                    dummyData = [ password, ...dummyData ];
                    return password;
                },
                async editPassword(password: Password) {
                    dummyData = dummyData.map((n, i) => n.id === password.id ? password : n);
                    return password;
                },
                async removePassword(pid: string) {
                    dummyData = dummyData.filter((n, i) => n.id !== pid);
                },
            }
        },
    } as BundleService,
};