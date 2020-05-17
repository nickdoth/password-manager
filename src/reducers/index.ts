import { AllPasswordAction, passwordListReducer } from "./password-list";
import { AllPasswordEditAction, passwordEditReducer } from "./password-edit";

// Compose Interfaces
export const reducerMap = {
    locale: localeReducer,
    passwordList: passwordListReducer,
    passwordEdit: passwordEditReducer,
};

export type IRootState = { [ K in keyof typeof reducerMap ]: ReturnType<typeof reducerMap[K]> };
export type AllActions = LocaleActions |
    AllPasswordAction |
    AllPasswordEditAction
;

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