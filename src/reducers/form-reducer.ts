import { AnyAction } from "redux";
import { useSelector, useDispatch } from "react-redux";

export type InputBinder<T> = (key: keyof T) => {
    value: string | NonNullable<Partial<T>[keyof T]>;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function useFormReducer<S, T>(selector: (state: S) => Partial<T>, editAction: (key: keyof T, value: any) => AnyAction) {
    const contents = useSelector(selector);
    const dispatch = useDispatch();
    return {
        bindInput: (key: keyof T) => {
            return {
                value: contents[key] ?? '',
                onChange: (ev: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(editAction(key, ev.target.value));
                }
            }
        }
    }
}