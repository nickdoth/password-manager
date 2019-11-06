// Compose Interfaces
export const reducerMap = {
    locale: localeReducer,
    passwordList: passwordListReducer,
};

export type IRootState = { [ K in keyof typeof reducerMap ]: ReturnType<typeof reducerMap[K]> };
export type AllActions = LocaleActions | AllPasswordAction;

////////////////////////////////////////////////////////////////////
////////////////////////////// Locale //////////////////////////////
////////////////////////////////////////////////////////////////////

export type LocaleActions = { type: 'Root.SwitchLocale', locale: string };

export function localeReducer(state = 'zh_CN', action: LocaleActions) {
    switch (action.type) {
        case 'Root.SwitchLocale':
            return action.locale;
        default:
            return state;
    }
}

///////////////////////////////////////////////////////////////////////////
////////////////////////////// Password List //////////////////////////////
///////////////////////////////////////////////////////////////////////////

export interface Password {
    recordName: string;
    username: string;
    passwordText: string;
}

export type PasswordActionReloadSuccess = { type: 'Password.ReloadSuccess', list: Password[] };
export type PasswordActionReloading = { type: 'Password.Reloading' };
export type PasswordActionReloadFail = { type: 'Password.ReloadFail' }

type AllPasswordAction = PasswordActionReloadSuccess | PasswordActionReloadFail | PasswordActionReloading;

export const passwordListInitialState = {
    list: [] as Password[],
    loading: false,
};

export function passwordListReducer(state = passwordListInitialState, action: AllPasswordAction) {
    switch (action.type) {
        case 'Password.ReloadSuccess':
            return { list: action.list, loading: false };
        case 'Password.ReloadFail':
            return { ...state, loading: false };
        case 'Password.Reloading':
            return { ...state, loading: true };
        default:
            return state;
    }
}