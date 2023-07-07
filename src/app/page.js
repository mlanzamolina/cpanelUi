import Link from "next/link";
export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <h1 className="text-7xl font-bold text-center mb-12 relative z-20">
        <span className="popart-text text-7xl font-popart">Control Panel</span>
      </h1>
      <div className="flex flex-rows gap-6 relative z-20">
        <Link href="/login">
          <button className="bg-blue-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg">
            Login
          </button>
        </Link>
        <Link href="/signUp">
          <button className="bg-red-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg">
            Sign Up
          </button>
        </Link>
      </div>
      <p className="text-2xl text-center mt-8 relative z-20">
        <span className="popart-text text-3xl font-popart">Welcome to the</span>{" "}
        <span className="popart-text text-5xl font-popart">ULTIMATE</span>
        <span className="popart-text text-4xl font-popart"> Control Panel</span>
      </p>
      <div className="bg-gradient-to-br from-red-600 to-blue-700 animate-pulse absolute w-full h-full z-0"></div>
    </main>
  );
}
