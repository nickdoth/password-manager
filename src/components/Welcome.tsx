import React from 'react';
import { Container, Typography, TextField, Button, Grid, useTheme } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { InputBinder } from '../reducers/form-reducer';

export interface WelcomeProps {
    loggedIn: boolean;
    bindInput: InputBinder<{ ph: string, phAgain: string }>;
    onConfirm: () => void;
}

window.document.body.style.margin = '0';

const lang = {
    titleWelcome: '歡迎',
    titleWelcomeBack: '歡迎回來',

    msgInputPh: '要繼續，請輸入您的加密密碼',
    msgCreatePh: '第一次使用，請創建加密密碼',
    msgPhNote: '請注意！加密密碼無法被找回。請使用最常用密碼中最安全的一個作爲加密密碼。',

    captionPh: '加密密碼',
}

const Welcome: React.FC<WelcomeProps> = (props) => {
    const { loggedIn, bindInput, onConfirm } = props;
    const theme = useTheme();

    return <Grid container direction="column" justify="space-between" style={{ minHeight: '100vh', width: '100vw', padding: 8 }}>
        <Grid item>
            <Typography color="primary" variant="h4" style={{ marginTop: 50, marginBottom: 50 }}>
                {loggedIn ? lang.titleWelcomeBack : lang.titleWelcome}
            </Typography>

            <Typography variant="body1">{loggedIn ? lang.msgInputPh : lang.msgCreatePh}</Typography>

            <TextField {...bindInput('ph')} style={{ marginTop: 10 }} InputProps={{ startAdornment: <LockIcon color="primary" /> }} autoFocus type="password" fullWidth
                label={'加密密碼'}
            />
            {loggedIn ? null : <>
                <TextField style={{ marginTop: 10, marginBottom: 15 }} InputProps={{ startAdornment: <LockIcon color="primary" /> }} autoFocus type="password" fullWidth
                    label={'再次輸入'}
                />

                <Typography {...bindInput('phAgain')} variant="caption" style={{ color: theme.palette.warning.main }}>{lang.msgPhNote}</Typography>

            </>}
            



        </Grid>

        <Grid item container direction="row" justify="center" style={{ paddingBottom: 30 }}>
            <Grid item>
                <Button onClick={onConfirm} style={{ width: 200 }} color="primary" variant="contained">OK</Button>
            </Grid>
        </Grid>
    </Grid>
}

export default Welcome;