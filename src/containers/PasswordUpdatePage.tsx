import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../reducers";
import PageFrame from "../components/PageFrame";
import React, { useEffect } from "react";
import { saveEditingPassword } from "../thunks/password-thunks";
import { passwordEditActions } from "../reducers/password-edit";
import { useParams, useHistory } from "react-router";
import { PasswordEdit } from "../components/PasswordEdit";
import useFormReducer from "../reducers/form-reducer";
import { Password } from "../backend";

const BLANK_OBJECT: object = {};

const PasswordUpdatePage = () => {
    const passwordList = useSelector((state: IRootState) => state.passwordList);
    const { mode, fieldErrors, edited } = useSelector((state: IRootState) => state.passwordEdit);
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    // const { id } = { id: 'new' };
    const isNew = id === 'new';

    const { bindInput: bind, validateAll } = useFormReducer(
        (state: IRootState) => state.passwordEdit.contents ?? {},
        passwordEditActions.editField,
        passwordEditActions.addFormError,
        (state: IRootState) => state.passwordEdit.fieldErrors,
        [
            async (values: Partial<Password>) => ({
                passwordText: values.passwordText ? null : 'Please input password text'
            }),
        ]
        
    );

    useEffect(() => {
        dispatch(passwordEditActions.loaded(isNew ? BLANK_OBJECT : (passwordList.contents?.filter(n => n.id === id)[0]) ?? BLANK_OBJECT));

        return () => {
            dispatch(passwordEditActions.reset());
        }

    }, [ dispatch, id, isNew, passwordList.contents ]);

    return <PageFrame title={`${mode === 'ADD' ? 'New' : 'Edit'} Password`} onSave={async () => {
        if (await validateAll()) {
            dispatch(saveEditingPassword());
        }
    }} edited={edited} onBack={() => {
        history.goBack();
    }}>
        <PasswordEdit bind={bind} edited={edited} />
    </PageFrame>
};

export default PasswordUpdatePage;