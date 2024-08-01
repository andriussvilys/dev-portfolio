import { Avatar, Box, Card, Container, Link, Typography } from "@mui/material"
import {Button as GoogleSigninButton} from "./buttons/googleSignin/button"
import SignoutButton from "./buttons/signoutButton"
import {LockOutlined as LockOutlinedIcon } from "@mui/icons-material"
import { defaultRoute } from "@/src/lib/constants"

interface SigninProps {
    signedIn: boolean
}

const Signin = ({signedIn}: SigninProps) => {
    return(
        <Container 
            component="section" 
            sx={{
                display:"flex", 
                justifyContent:"center", 
                alignItems:"start",
                height:"100%"
            }}>
            <Card sx={{p: 6, m:1, display:"flex", justifyContent:"center", mt:"15vh"}}>
                <Box sx={{display: "flex", flexDirection:"column", alignItems:"center", gap:2, p: 2}}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box sx={{display: "flex", flexDirection:"column", justifyContent:"center", gap:2}}>        
                        <GoogleSigninButton signedIn={signedIn}/>
                        <SignoutButton signedIn={signedIn}/>
                        <Link underline="none" href={defaultRoute} sx={{display: signedIn ? "block" : "none"}}>
                            <Typography sx={{textAlign:"center"}}>Proceed to the site</Typography>
                        </Link>
                    </Box>
                </Box>
            </Card>
        </Container>
    )
}

export default Signin