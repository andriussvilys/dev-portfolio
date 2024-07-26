import Navigation from "@/src/components/dashboard/navigation";
import { Container, Toolbar } from "@mui/material";
import Link from "next/link";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <Navigation >
            {children}
        </Navigation>
    )
}