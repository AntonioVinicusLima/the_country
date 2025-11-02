import Link from "next/link";

export default function Home() {
  return (
    <div className="center">
      <div>
        <Link href="/home">
          <button>Ir para Home</button>
        </Link>
      </div>
    </div>
  );
}
