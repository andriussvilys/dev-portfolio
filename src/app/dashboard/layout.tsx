import Navigation from "@/src/components/dashboard/navigation";

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