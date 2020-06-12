import { AppThunkAction } from "./thunk-commons";
import { passwordListActions } from "../reducers/password-list";
import { Password } from "../backend";
import { passwordEditActions } from "../reducers/password-edit";

export function loadPasswordList(kw?: string): AppThunkAction {
    return async (dispatch, getState, { bundleService }) => {
        try {
            // const state = getState();
            dispatch(passwordListActions.loadStart());
            const data = await bundleService.getPasswordService('', '').getAllPasswords(kw);
            dispatch(passwordListActions.loaded(data));
        } catch (e) {
            dispatch(passwordListActions.loadFailed(String(e)));
        }
    };
}

export function saveEditingPassword(): AppThunkAction {
    return async (dispatch, getState, { bundleService }) => {
        try {
            const state = getState();
            const password = state.passwordEdit.contents as Password;
            // dispatch(passwordListActions.loadStart());
            if (password.id) {
                const data = await bundleService.getPasswordService('', '').editPassword(password);
                dispatch(passwordEditActions.loaded(data));
            } else {
                const data = await bundleService.getPasswordService('', '').addPassword(password);
                dispatch(passwordEditActions.loaded(data));
            }
            
        } catch (e) {
            dispatch(passwordEditActions.loadFailed(String(e)));
        }
    };
}