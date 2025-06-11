import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="text-center sm:text-left max-w-xl">
          <h1 className="text-4xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
            Welcome to the STT Selection Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Sign up to save your custom provider, model, and language combinations. Easily manage and filter your selections.
          </p>

          <Link href="/signup">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 text-lg font-semibold">
              Get Started – Sign Up
            </button>
          </Link>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-600 dark:text-gray-400">
        <span>Made with ❤️ using Next.js</span>
      </footer>
    </div>
  );
}
