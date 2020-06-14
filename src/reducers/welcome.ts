import { IRootState } from ".";

export interface WelcomeState {
    loggedIn: boolean;
    ph: string;
    phAgain: string;
}

const initialState = (): WelcomeState => ({
    loggedIn: false,
    ph: '',
    phAgain: '', 
});

export type AllWelcomeActions = { type: 'Welcome.EditField', payload: { ph?: string, phAgain?: string } } |
    { type: 'Welcome.Reset' }
;

export function welcomeReducer(state = initialState(), action: AllWelcomeActions): WelcomeState {
    switch (action.type) {
        case 'Welcome.EditField':
            return { ...state, ...action.payload };
        case 'Welcome.Reset':
            return initialState();
        default:
            return state;
    }
}

export const welcomeActions = {
    updateFields: (key: 'ph' | 'phAgain', value: string) => ({ type: 'Welcome.EditField', payload: { [key]: value } }),
};

export const welcomeSelectors = {
    selectEditFields: () => (state: IRootState) => ({ ph: state.welcome.ph, phAgain: state.welcome.phAgain }),
}