import { Box, Container, Divider, Typography } from "@mui/material"
import SigninButton from "../signin/signinButton"
import SignoutButton from "../signin/signoutButton"

interface HomeProps {
    signedIn: boolean
}

const Home = ({signedIn}: HomeProps) => {
    return(
        <Container component="main" sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>
            <Box sx={{display: "flex", flexDirection:"column", border:"1px solid", alignItems:"center", gap:2, p: 2}}>
                <Typography variant="h2">Sign in</Typography>
                <Box sx={{display: "flex", flexDirection:"column", maxWidth:"120px", justifyContent:"center", gap:2}}>        
                    <SigninButton signedIn={signedIn}/>
                    <SignoutButton signedIn={signedIn}/>
                </Box>
            </Box>
        </Container>
    )
}

export default Home