import { GenericState, genericReducer, GenericActions, genericActions, genericActionKeys, genericInitState } from "./commons";
import { Password } from "../backend";


export type AllPasswordEditAction = GenericActions<Contents> | {
    type: 'PasswordEdit.Reset'
} | {
    type: 'PasswordEdit.EditField',
    payload: Contents,
};

export type Contents = Partial<Password>;

export interface PasswordEditState extends GenericState<Contents> {
    mode: 'ADD' | 'EDIT';
    uneditedContents?: Contents;
    fieldErrors: { [key: string]: string };
}

export const passwordListInitialState: PasswordEditState = {
    ...genericInitState(),
    contents: {},
    mode: 'ADD',
    uneditedContents: undefined,
    fieldErrors: {},
};

const baseReducer = genericReducer<Contents>('PasswordEdit');
const keys = genericActionKeys('PasswordEdit');

export function passwordEditReducer(state = passwordListInitialState, action: AllPasswordEditAction): PasswordEditState {
    if (keys.is(action)) switch (action.type) {
        case keys.Loaded:
            return {
                mode: action.payload?.data?.id ? 'EDIT' : 'ADD',
                ...baseReducer(state, action),
                uneditedContents: action.payload?.data,
                fieldErrors: {},
            };
        default:
            return {
                ...state,
                ...baseReducer(state, action),
            };
    } else switch (action.type) {
        case 'PasswordEdit.Reset':
            return passwordListInitialState;
        case 'PasswordEdit.EditField':
            return {
                ...state,
                contents: {
                    ...state.contents,
                    ...action.payload,
                }
            };
        default:
            return state;
    }
}

export const passwordEditActions = {
    ...genericActions<Contents>('PasswordEdit'),
    reset: () => ({ type: 'PasswordEdit.Reset' }),
    editField: (key: string, value: string) => ({ type: 'PasswordEdit.EditField', payload: { [key]: value } })
};