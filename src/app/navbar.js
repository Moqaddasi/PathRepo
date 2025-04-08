import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
    return (
        <nav style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    priority
                />
            </Link>
            <Link href="/" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Home</Link>
            <Link href="/repoFileExplorer" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Repo Explorer</Link>
            <Link href='/login' style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Login</Link>
        </nav>
    )
}