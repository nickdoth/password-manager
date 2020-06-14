import { useSelector } from "react-redux";
import { IRootState } from "../reducers";
import React from "react";
import { useHistory } from "react-router";
import useFormReducer from "../reducers/form-reducer";
import Welcome from "../components/Welcome";
import { welcomeActions, welcomeSelectors } from "../reducers/welcome";

const WelcomePage = () => {
    // const dispatch = useDispatch();
    const form = useFormReducer(
        welcomeSelectors.selectEditFields(),
        welcomeActions.updateFields,
    );
    const { loggedIn } = useSelector((state: IRootState) => state.welcome);

    const history = useHistory();
    return <Welcome 
        loggedIn={loggedIn}
        bindInput={form.bindInput}
        onConfirm={() => {
            history.replace(`/password`);
        }}
    />;
};

export default WelcomePage;