import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../reducers";
import PageFrame from "../components/PageFrame";
import PasswordList from "../components/PasswordList";
import React, { useEffect } from "react";
import { loadPasswordList } from "../thunks/password-thunks";
import { useHistory } from "react-router";

const BLANK_ARRAY: any[] = [];

const PasswordListPage = () => {
    const passwordList = useSelector((state: IRootState) => state.passwordList);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadPasswordList());
    }, [ dispatch ]);

    return <PageFrame title={'Passwords'} onSearch={(kw) => console.log(kw)} onAdd={() => {
        history.push(`/password/new`);
    }}>
        <PasswordList passwords={passwordList.contents ?? BLANK_ARRAY} onClickItem={(pid) => {
            history.push(`/password/${pid}`);
        }}/>
    </PageFrame>
};

export default PasswordListPage;