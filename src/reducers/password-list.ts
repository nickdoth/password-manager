import { GenericState, genericReducer, GenericActions, genericActions } from "./commons";
import { Password } from "../backend";


export type AllPasswordAction = GenericActions<Password[]>;

export interface PasswordListState extends GenericState<Password[]> {

}

export const passwordListInitialState: PasswordListState = {
    contents: [],
    loading: false,
    lastError: undefined,
};

const baseReducer = genericReducer<Password[]>('PasswordList');

export function passwordListReducer(state = passwordListInitialState, action: AllPasswordAction): PasswordListState {
    switch (action.type) {
        default:
            return baseReducer(state, action);
    }
}

export const passwordListActions = {
    ...genericActions<Password[]>('PasswordList'),
};