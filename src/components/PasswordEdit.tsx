import React from "react";

import { Password } from "../backend";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { InputBinder } from "../reducers/form-reducer";

export interface PasswordEditProps {
    bind: InputBinder<Password>;
}

export const PasswordEdit = ({ bind }: PasswordEditProps) => {
    return (
        <Grid container direction="column" spacing={1} style={{ padding: 8 }}>
            <Grid item>
                <TextField {...bind('recordName')} fullWidth label="Name" variant="filled" />
            </Grid>

            <Grid item>
                <TextField {...bind('passwordText')} fullWidth label="Password" variant="filled" />
            </Grid>

            <Grid item>
                <TextField {...bind('username')} fullWidth label="Owner Name (Optional)" variant="filled" />
            </Grid>
        </Grid>
    );
}