import { grey } from '@mui/material/colors';
import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const dividerColor = "rgba(180, 248, 176, 0.16)"

const darkShadowColor = [0,0,0].join(',')

const darkTheme:ThemeOptions = {
    palette:{
        mode:"dark",
        primary:{
            // main:"#2c0073",
            // light: '#7654a1',
            // dark: '#1e112d',
            // contrastText: '#000',
            main:"#70f071",
            light: '#b4f8b0',
            dark: '#00af37',
            contrastText: '#000',
        },
        divider: dividerColor
    },
    shadows:[
        "none",
        `0px 2px 1px -1px rgba(${darkShadowColor},0.2),0px 1px 1px 0px rgba(${darkShadowColor},0.14),0px 1px 3px 0px rgba(${darkShadowColor},0.12)`,
        `0px 3px 1px -2px rgba(${darkShadowColor},0.2),0px 2px 2px 0px rgba(${darkShadowColor},0.14),0px 1px 5px 0px rgba(${darkShadowColor},0.12)`,
        `0px 3px 3px -2px rgba(${darkShadowColor},0.2),0px 3px 4px 0px rgba(${darkShadowColor},0.14),0px 1px 8px 0px rgba(${darkShadowColor},0.12)`,
        `0px 2px 4px -1px rgba(${darkShadowColor},0.2),0px 4px 5px 0px rgba(${darkShadowColor},0.14),0px 1px 10px 0px rgba(${darkShadowColor},0.12)`,
        `0px 3px 5px -1px rgba(${darkShadowColor},0.2),0px 5px 8px 0px rgba(${darkShadowColor},0.14),0px 1px 14px 0px rgba(${darkShadowColor},0.12)`,
        `0px 3px 5px -1px rgba(${darkShadowColor},0.2),0px 6px 10px 0px rgba(${darkShadowColor},0.14),0px 1px 18px 0px rgba(${darkShadowColor},0.12)`,
        `0px 4px 5px -2px rgba(${darkShadowColor},0.2),0px 7px 10px 1px rgba(${darkShadowColor},0.14),0px 2px 16px 1px rgba(${darkShadowColor},0.12)`,
        `0px 5px 5px -3px rgba(${darkShadowColor},0.2),0px 8px 10px 1px rgba(${darkShadowColor},0.14),0px 3px 14px 2px rgba(${darkShadowColor},0.12)`,
        `0px 5px 6px -3px rgba(${darkShadowColor},0.2),0px 9px 12px 1px rgba(${darkShadowColor},0.14),0px 3px 16px 2px rgba(${darkShadowColor},0.12)`,
        `0px 6px 6px -3px rgba(${darkShadowColor},0.2),0px 10px 14px 1px rgba(${darkShadowColor},0.14),0px 4px 18px 3px rgba(${darkShadowColor},0.12)`,
        `0px 6px 7px -4px rgba(${darkShadowColor},0.2),0px 11px 15px 1px rgba(${darkShadowColor},0.14),0px 4px 20px 3px rgba(${darkShadowColor},0.12)`,
        `0px 7px 8px -4px rgba(${darkShadowColor},0.2),0px 12px 17px 2px rgba(${darkShadowColor},0.14),0px 5px 22px 4px rgba(${darkShadowColor},0.12)`,
        `0px 7px 8px -4px rgba(${darkShadowColor},0.2),0px 13px 19px 2px rgba(${darkShadowColor},0.14),0px 5px 24px 4px rgba(${darkShadowColor},0.12)`,
        `0px 7px 9px -4px rgba(${darkShadowColor},0.2),0px 14px 21px 2px rgba(${darkShadowColor},0.14),0px 5px 26px 4px rgba(${darkShadowColor},0.12)`,
        `0px 8px 9px -5px rgba(${darkShadowColor},0.2),0px 15px 22px 2px rgba(${darkShadowColor},0.14),0px 6px 28px 5px rgba(${darkShadowColor},0.12)`,
        `0px 8px 10px -5px rgba(${darkShadowColor},0.2),0px 16px 24px 2px rgba(${darkShadowColor},0.14),0px 6px 30px 5px rgba(${darkShadowColor},0.12)`,
        `0px 8px 11px -5px rgba(${darkShadowColor},0.2),0px 17px 26px 2px rgba(${darkShadowColor},0.14),0px 6px 32px 5px rgba(${darkShadowColor},0.12)`,
        `0px 9px 11px -5px rgba(${darkShadowColor},0.2),0px 18px 28px 2px rgba(${darkShadowColor},0.14),0px 7px 34px 6px rgba(${darkShadowColor},0.12)`,
        `0px 9px 12px -6px rgba(${darkShadowColor},0.2),0px 19px 29px 2px rgba(${darkShadowColor},0.14),0px 7px 36px 6px rgba(${darkShadowColor},0.12)`,
        `0px 10px 13px -6px rgba(${darkShadowColor},0.2),0px 20px 31px 3px rgba(${darkShadowColor},0.14),0px 8px 38px 7px rgba(${darkShadowColor},0.12)`,
        `0px 10px 13px -6px rgba(${darkShadowColor},0.2),0px 21px 33px 3px rgba(${darkShadowColor},0.14),0px 8px 40px 7px rgba(${darkShadowColor},0.12)`,
        `0px 10px 14px -6px rgba(${darkShadowColor},0.2),0px 22px 35px 3px rgba(${darkShadowColor},0.14),0px 8px 42px 7px rgba(${darkShadowColor},0.12)`,
        `0px 11px 14px -7px rgba(${darkShadowColor},0.2),0px 23px 36px 3px rgba(${darkShadowColor},0.14),0px 9px 44px 8px rgba(${darkShadowColor},0.12)`,
        `0px 11px 15px -7px rgba(${darkShadowColor},0.2),0px 24px 38px 3px rgba(${darkShadowColor},0.14),0px 9px 46px 8px rgba(${darkShadowColor},0.12)`,
    ]
}

const lightShadowColor = [189,189,189].join(',')

const lightTheme:ThemeOptions = {
    palette:{
        mode:"light",
        primary:{
            main:"#70f071",
            light: '#b4f8b0',
            dark: '#00af37',
            contrastText: '#000',
        },
        background: {
            default: '#f5f5f5',
            paper: '#fafafa',
        },
        divider: grey[900]
    },
    shadows:[
        "none",
        `0px 2px 1px -1px rgba(${lightShadowColor},0.2),0px 1px 1px 0px rgba(${lightShadowColor},0.14),0px 1px 3px 0px rgba(${lightShadowColor},0.12)`,
        `0px 3px 1px -2px rgba(${lightShadowColor},0.2),0px 2px 2px 0px rgba(${lightShadowColor},0.14),0px 1px 5px 0px rgba(${lightShadowColor},0.12)`,
        `0px 3px 3px -2px rgba(${lightShadowColor},0.2),0px 3px 4px 0px rgba(${lightShadowColor},0.14),0px 1px 8px 0px rgba(${lightShadowColor},0.12)`,
        `0px 2px 4px -1px rgba(${lightShadowColor},0.2),0px 4px 5px 0px rgba(${lightShadowColor},0.14),0px 1px 10px 0px rgba(${lightShadowColor},0.12)`,
        `0px 3px 5px -1px rgba(${lightShadowColor},0.2),0px 5px 8px 0px rgba(${lightShadowColor},0.14),0px 1px 14px 0px rgba(${lightShadowColor},0.12)`,
        `0px 3px 5px -1px rgba(${lightShadowColor},0.2),0px 6px 10px 0px rgba(${lightShadowColor},0.14),0px 1px 18px 0px rgba(${lightShadowColor},0.12)`,
        `0px 4px 5px -2px rgba(${lightShadowColor},0.2),0px 7px 10px 1px rgba(${lightShadowColor},0.14),0px 2px 16px 1px rgba(${lightShadowColor},0.12)`,
        `0px 5px 5px -3px rgba(${lightShadowColor},0.2),0px 8px 10px 1px rgba(${lightShadowColor},0.14),0px 3px 14px 2px rgba(${lightShadowColor},0.12)`,
        `0px 5px 6px -3px rgba(${lightShadowColor},0.2),0px 9px 12px 1px rgba(${lightShadowColor},0.14),0px 3px 16px 2px rgba(${lightShadowColor},0.12)`,
        `0px 6px 6px -3px rgba(${lightShadowColor},0.2),0px 10px 14px 1px rgba(${lightShadowColor},0.14),0px 4px 18px 3px rgba(${lightShadowColor},0.12)`,
        `0px 6px 7px -4px rgba(${lightShadowColor},0.2),0px 11px 15px 1px rgba(${lightShadowColor},0.14),0px 4px 20px 3px rgba(${lightShadowColor},0.12)`,
        `0px 7px 8px -4px rgba(${lightShadowColor},0.2),0px 12px 17px 2px rgba(${lightShadowColor},0.14),0px 5px 22px 4px rgba(${lightShadowColor},0.12)`,
        `0px 7px 8px -4px rgba(${lightShadowColor},0.2),0px 13px 19px 2px rgba(${lightShadowColor},0.14),0px 5px 24px 4px rgba(${lightShadowColor},0.12)`,
        `0px 7px 9px -4px rgba(${lightShadowColor},0.2),0px 14px 21px 2px rgba(${lightShadowColor},0.14),0px 5px 26px 4px rgba(${lightShadowColor},0.12)`,
        `0px 8px 9px -5px rgba(${lightShadowColor},0.2),0px 15px 22px 2px rgba(${lightShadowColor},0.14),0px 6px 28px 5px rgba(${lightShadowColor},0.12)`,
        `0px 8px 10px -5px rgba(${lightShadowColor},0.2),0px 16px 24px 2px rgba(${lightShadowColor},0.14),0px 6px 30px 5px rgba(${lightShadowColor},0.12)`,
        `0px 8px 11px -5px rgba(${lightShadowColor},0.2),0px 17px 26px 2px rgba(${lightShadowColor},0.14),0px 6px 32px 5px rgba(${lightShadowColor},0.12)`,
        `0px 9px 11px -5px rgba(${lightShadowColor},0.2),0px 18px 28px 2px rgba(${lightShadowColor},0.14),0px 7px 34px 6px rgba(${lightShadowColor},0.12)`,
        `0px 9px 12px -6px rgba(${lightShadowColor},0.2),0px 19px 29px 2px rgba(${lightShadowColor},0.14),0px 7px 36px 6px rgba(${lightShadowColor},0.12)`,
        `0px 10px 13px -6px rgba(${lightShadowColor},0.2),0px 20px 31px 3px rgba(${lightShadowColor},0.14),0px 8px 38px 7px rgba(${lightShadowColor},0.12)`,
        `0px 10px 13px -6px rgba(${lightShadowColor},0.2),0px 21px 33px 3px rgba(${lightShadowColor},0.14),0px 8px 40px 7px rgba(${lightShadowColor},0.12)`,
        `0px 10px 14px -6px rgba(${lightShadowColor},0.2),0px 22px 35px 3px rgba(${lightShadowColor},0.14),0px 8px 42px 7px rgba(${lightShadowColor},0.12)`,
        `0px 11px 14px -7px rgba(${lightShadowColor},0.2),0px 23px 36px 3px rgba(${lightShadowColor},0.14),0px 9px 44px 8px rgba(${lightShadowColor},0.12)`,
        `0px 11px 15px -7px rgba(${lightShadowColor},0.2),0px 24px 38px 3px rgba(${lightShadowColor},0.14),0px 9px 46px 8px rgba(${lightShadowColor},0.12)`,
    ]
}

const useTheme = () => {
    const themes = {
        "light": lightTheme,
        "dark": darkTheme
    }

    const [theme, setTheme] = useState<Theme>(createTheme(themes.dark))
    const mode = theme.palette.mode
    const switchTheme = () => {
        const newModeLPaletteMode = mode === 'dark' ? 'light' : 'dark'
        setTheme(createTheme(themes[newModeLPaletteMode]))
    }
    useEffect(()=>{
    }, [theme])
    return {theme, switchTheme}
}

export {useTheme};
