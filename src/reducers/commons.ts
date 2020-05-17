
export interface BasicState {
    loading: boolean;
    lastError?: string | undefined;
}

export interface GenericState<T> extends BasicState {
    contents: T | undefined;
}

export interface GenericActions<T> {
    type: string;
    payload?: {
        error?: string,
        data?: T,
    };
}

export const genericReducer = <T>(prefix: string) => {
    const keys = genericActionKeys(prefix);
    
    return (state: GenericState<T>, action: GenericActions<T>): GenericState<T>  => {
        switch (action.type) {
            case keys.LoadStart:
                return { contents: state.contents, loading: true, lastError: undefined };
            case keys.LoadFailed:
                return { contents: state.contents, loading: false, lastError: action.payload!.error };
            case keys.Loaded:
                return { contents: action.payload!.data!, loading: false, lastError: undefined };
            default:
                return state;
        }
    };
};

export const genericActionKeys = (prefix: string) => {
    const keys = {
        LoadStart: `${prefix}.LoadStarted`,
        Loaded: `${prefix}.Loaded`,
        LoadFailed: `${prefix}.LoadFailed`,
        is<T>(action: { type: string }): action is GenericActions<T> {
            return Object.values(keys).some(k => k === action.type);
        }
    };

    return keys;
}

export const genericActions = <T>(prefix: string) => {
    const keys = genericActionKeys(prefix);
    return {
        loadStart: () => ({ type: keys.LoadStart }),
        loadFailed: (error: string) => ({ type: keys.LoadFailed, payload: { error } }),
        loaded: (data: T) => ({ type: keys.Loaded, payload: { data } })
    };
}

export const genericInitState = <T>(): GenericState<T> => ({
    contents: undefined as T | undefined,
    loading: false,
    lastError: undefined,
});