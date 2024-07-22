import Link from "next/link";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main>
            <nav>
                <ul>
                    <li key={crypto.randomUUID()}><Link href="/dashboard/tags">Tags</Link></li>
                </ul>
            </nav>
            {children}
        </main>
    )
}