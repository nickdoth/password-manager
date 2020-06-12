import { AnyAction } from "redux";
import { useSelector, useDispatch } from "react-redux";

export type InputBinder<T> = (key: keyof T) => {
    value: string | NonNullable<Partial<T>[keyof T]>;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

export type FormErrorsState<T> = { [k: string]: string | null | undefined };

const emptySelector: (s: any) => any = (_) => ({});

export interface FormContentSelector<S, T> {
    (state: S): Partial<T>;
}

export interface FormValidator<T> {
    (values: Partial<T>): Promise<FormErrorsState<T>>
}

export interface FormErrorsSelector<S, T> {
    (state: S): FormErrorsState<T>
}

export interface AddFormErrorAction<T> {
    (errors: FormErrorsState<T>, replace: boolean): AnyAction;
}

export interface FormEditAction<T> {
    (key: keyof T, value: any): AnyAction;
}

export default function useFormReducer<S, T>(selector: FormContentSelector<S, T>,
        editAction: FormEditAction<T>,
        addFormErrorAction?: AddFormErrorAction<T>,
        formErrorsSelector: FormErrorsSelector<S, T> = emptySelector,
        validators: FormValidator<T>[] = [],
    ) {
    const contents = useSelector(selector);
    const currentErrors = useSelector(formErrorsSelector);
    const dispatch = useDispatch();
    return {
        bindInput: (key: keyof T) => {
            return {
                value: contents[key] ?? '',
                onChange: (ev: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(editAction(key, ev.target.value));
                },
                onBlur: async () => {
                    const validationTasks = validators.map(func => func(contents));
                    const errors = (await Promise.all(validationTasks))
                        .reduce((a, b) => ({ ...a, ...b }), {});
                    if (errors.hasOwnProperty(key as string)) {
                        // Show only error of this field
                        const action = addFormErrorAction?.({ [key]: errors[key as string] }, false);
                        action && dispatch(action);
                    }
                },
                error: Boolean(currentErrors[key as string]),
                helperText: currentErrors[key as string],
            }
        },
        validateAll: async () => {
            const validationTasks = validators.map(func => func(contents));
            const errors = (await Promise.all(validationTasks))
                .reduce((a, b) => ({ ...a, ...b }), {});
            addFormErrorAction?.(errors, true);
            return Object.keys(errors).filter(k => errors[k]).length === 0;
        }
    }
}