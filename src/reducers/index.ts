import { AllPasswordAction, passwordListReducer } from "./password-list";
import { AllPasswordEditAction, passwordEditReducer } from "./password-edit";
import { AllSystemActions, systemReducer } from "./system";
import { welcomeReducer, AllWelcomeActions } from "./welcome";

// Compose Interfaces
export const reducerMap = {
    locale: localeReducer,
    passwordList: passwordListReducer,
    passwordEdit: passwordEditReducer,
    system: systemReducer,
    welcome: welcomeReducer,
};

export type IRootState = { [ K in keyof typeof reducerMap ]: ReturnType<typeof reducerMap[K]> };
export type AllActions = LocaleActions |
    AllPasswordAction |
    AllPasswordEditAction |
    AllSystemActions |
    AllWelcomeActions
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