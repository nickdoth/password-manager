import { GenericState, genericReducer, GenericActions, genericActions, genericActionKeys, genericInitState } from "./commons";
import { Password } from "../backend";
import { FormErrorsState } from "./form-reducer";


export type AllPasswordEditAction = GenericActions<Contents> | {
    type: 'PasswordEdit.Reset'
} | {
    type: 'PasswordEdit.EditField',
    payload: Contents,
} | {
    type: 'PasswordEdit.AddError',
    payload: {
        errors: FormErrorsState<Password>,
        replace: boolean,
    }
}
;

export type Contents = Partial<Password>;

export interface PasswordEditState extends GenericState<Contents> {
    mode: 'ADD' | 'EDIT';
    uneditedContents?: Contents;
    fieldErrors: FormErrorsState<Contents>;
    edited: boolean;
}

export const passwordListInitialState: PasswordEditState = {
    ...genericInitState(),
    contents: {},
    mode: 'ADD',
    uneditedContents: undefined,
    fieldErrors: {},
    edited: false,
};

const baseReducer = genericReducer<Contents>('PasswordEdit');
const keys = genericActionKeys('PasswordEdit');

export function passwordEditReducer(state = passwordListInitialState, action: AllPasswordEditAction): PasswordEditState {
    if (keys.is(action)) switch (action.type) {
        case keys.Loaded:
            return {
                mode: action.payload?.data?._id ? 'EDIT' : 'ADD',
                ...baseReducer(state, action),
                uneditedContents: action.payload?.data,
                fieldErrors: {},
                edited: false,
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
                },
                edited: true,
            };
        case 'PasswordEdit.AddError':
            return {
                ...state,
                fieldErrors: action.payload.replace ? action.payload.errors : {
                    ...state.fieldErrors,
                    ...action.payload.errors,
                },
            };
        default:
            return state;
    }
}

export const passwordEditActions = {
    ...genericActions<Contents>('PasswordEdit'),
    reset: () => ({ type: 'PasswordEdit.Reset' }),
    editField: (key: string, value: string) => ({ type: 'PasswordEdit.EditField', payload: { [key]: value } }),
    addFormError: (errors: FormErrorsState<Password>, replace: boolean) => ({ type: 'PasswordEdit.AddError', payload: { errors, replace } }),
};