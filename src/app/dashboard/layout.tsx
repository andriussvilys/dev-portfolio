import Navigation from "@/src/components/dashboard/navigation/navigation";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <Navigation >
          <Box id="dashbox" sx={{bgcolor: grey[200], width:"100%", height:"100%"}}>
            {children}
          </Box>
      </Navigation>
    )
}