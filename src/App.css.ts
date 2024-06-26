import { createGlobalTheme, style } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root",{
    color : {
        main : "#ffa726",
        mainDarker : "#f57c00",
        mainFaded : "#ffb74da6",
        mainFadedBright : "#ffb74da6",
        list : "rgb(235,236,240)",
        task : "rgb(255,255,255)",
        taskHover : "rgb(245,245,245)",
        brightText : "rgb(255,255,255)",
        darkText : "rgb(24,42,77)",
        secondaryDarkText : "rgb(94,108,132)",
        secondaryDarkTextHover : "rgb(218,219,225)",
        selectedTab : "rgb(137,176,173)",
        updatedButton : "rgb(237,180,88)",
        deleteButton : "rgb(237,51,88)"
    },
    fontSizing : {
        T1:"32px",
        T2:"24px",
        T3:"18px",
        T4:"14px",
        P1:"12px"
    },
    spacing : {
        small : '5px',
        medium : '10px',
        big1 : '20px',
        big2 : '15px',
        listSpacing : '30px'
    },
    font : {
        body : "arial",
    },
    shadow : {
        basic : "4px 4px 8px 0px rgab(34,60,80, 0.2)"
    },
    minWidth : {
        list : "250px"
    }
});

export const appContainer = style({
    display : 'flex',
    flexDirection : 'column',
    minHeight : '100vh',
    height : 'max-content',
    width : '100%'
});

export const board = style({
    display : "flex",
    flexDirection : 'row',
    height : '100%'
});

export const buttons = style({
    marginTop : 'auto',
    paddingLeft : vars.spacing.big2
});