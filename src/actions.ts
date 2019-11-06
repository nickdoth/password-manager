import { Password, PasswordActionReloadSuccess } from "./reducers";

export function reloadPasswordList(list: Password[]): PasswordActionReloadSuccess {
    return { type: 'Password.ReloadSuccess', list };
}