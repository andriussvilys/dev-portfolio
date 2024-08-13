import { Divider, Stack, Typography } from "@mui/material";

export default function Section({children, style, headline, id}:{children?: React.ReactNode, style?: React.CSSProperties, id:string, headline?:string}){
    
    return(
        <Stack 
            component="section"
            id={id}
            sx={{ 
                flex:1, 
                display:"flex", 
                justifyContent:"center",
                alignItems:"center",
                pt:4,
                pb:4,
                ...(style)
            }}
         >
            {headline && <Typography variant="h5">{`${headline}`.toUpperCase()}</Typography>}
            {children}
        </Stack>
    )
}