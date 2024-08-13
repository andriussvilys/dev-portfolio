import { dividerColor } from '@/src/components/front/constants';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette:{
        mode:"dark",
        primary:{
            main:"#70f071",
            light: '#b4f8b0',
            dark: '#00af37',
            contrastText: '#000',
        },
        divider: dividerColor,
    }});

export default theme;
