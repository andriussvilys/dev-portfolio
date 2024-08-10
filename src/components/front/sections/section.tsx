import { Stack } from "@mui/material";

export default function Section({children, style}:{children?: React.ReactNode, style?: React.CSSProperties}){
    return(
        <Stack 
            component="section" 
            sx={{ 
                // border:"2px dotted black", 
                flex:1, 
                display:"flex", 
                justifyContent:"center",
                alignItems:"center", 
                ...(style)
            }}
         >
            {children}
        </Stack>
    )
}