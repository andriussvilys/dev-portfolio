import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, Theme } from '@mui/material';

interface ThemeSwitchProps {
    theme: Theme,
    switchTheme: ()=>void
}

export type {ThemeSwitchProps}

export default function ThemeSwitch({theme, switchTheme}:ThemeSwitchProps){
    const mode = theme.palette.mode
    return (
        <IconButton onClick={()=>{
            switchTheme()
        }}>
            {mode !== 'dark' ? <NightlightIcon/> : <LightModeIcon/>}
        </IconButton>
    )
}