import { IRootState } from ".";

export interface SystemState {
    ph?: string | undefined;
}

export type AllSystemActions = {
    type: 'System.UpdatePassphrase',
    payload: { ph: string | undefined },
};

export function systemReducer(state: SystemState = {}, action: AllSystemActions): SystemState {
    switch (action.type) {
        case 'System.UpdatePassphrase':
            return {
                ...state,
                ph: action.payload.ph,
            };
        default:
            return state;
    }
}

export const systemActions = {
    updatePassphrase: (ph: string | undefined): AllSystemActions => ({ type: 'System.UpdatePassphrase', payload: { ph } }),
};

export const systemSelectors = {
    selectPassphrase: () => (state: IRootState) => state.system.ph,
}