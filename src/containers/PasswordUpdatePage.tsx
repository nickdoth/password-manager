import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../reducers";
import PageFrame from "../components/PageFrame";
import React, { useEffect } from "react";
import { saveEditingPassword } from "../thunks/password-thunks";
import { passwordEditActions } from "../reducers/password-edit";
import { useParams, useHistory } from "react-router";
import { PasswordEdit } from "../components/PasswordEdit";
import useFormReducer from "../reducers/form-reducer";

const BLANK_OBJBECT: object = {};

const PasswordUpdatePage = () => {
    const passwordList = useSelector((state: IRootState) => state.passwordList);
    const { mode } = useSelector((state: IRootState) => state.passwordEdit);
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    // const { id } = { id: 'new' };
    const isNew = id === 'new';

    const bind = useFormReducer(
        (state: IRootState) => state.passwordEdit.contents ?? {},
        passwordEditActions.editField,
    ).bindInput;

    useEffect(() => {
        dispatch(passwordEditActions.loaded(isNew ? BLANK_OBJBECT : (passwordList.contents?.filter(n => n.id === id)[0]) ?? BLANK_OBJBECT));

        return () => {
            dispatch(passwordEditActions.reset());
        }

    }, [ dispatch, id, isNew, passwordList.contents ]);

    return <PageFrame title={`${mode === 'ADD' ? 'New' : 'Edit'} Password`} onSave={() => {
        dispatch(saveEditingPassword());
    }} onBack={() => {
        history.goBack();
    }}>
        <PasswordEdit bind={bind} />
    </PageFrame>
};

export default PasswordUpdatePage;