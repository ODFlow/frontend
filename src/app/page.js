import Link from "next/link"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Finland Data Explorer</h1>
        <p className="max-w-2xl">Explore demographic and statistical data across different regions of Finland.</p>

        <Link
          href="/map"
          className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
        >
          View Interactive Map
        </Link>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a href="//" className="text-sm text-gray-500 hover:text-gray-400">
          About
        </a>
        <a href="//" className="text-sm text-gray-500 hover:text-gray-400">
          Privacy Policy
        </a>
      </footer>
    </div>
  )
}

