import Link from "next/link"

export default function HomePage() {
  return(
      <main className="p-6">
          <h1 className="text-3xl font-bold">璑闇矢鳕</h1>
          <p>wuanshixue</p>

          <Link href={"/blog"}>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  blog
              </button>
          </Link>
      </main>
  )
}
