import React from 'react'

import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, ThemeProvider, createTheme } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createTheme({
    direction: 'rtl',
});

function SetRtl(props) {
    return (
        <ThemeProvider theme={theme}>
            <div dir="rtl">
                <StylesProvider jss={jss}>
                    {props.children}
                </StylesProvider>

            </div>
        </ThemeProvider>
    )
}

export default SetRtl
