// src/app/page.js
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
    const posts = getAllPosts("reviews");

    // ✅ 按日期排序
    const sortedPosts = posts.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    // ✅ 取前 5 篇最新
    const latestPosts = sortedPosts.slice(0, 5);

    return (
        <main className="max-w-5xl mx-auto px-4 py-6">
            <header className="text-center mb-8 pb-4 border-b">
                <h1 className="text-3xl font-serif font-bold">Coffee Wuanshixue</h1>
                <p className="text-gray-600 text-lg mt-1">Coffee: Music in a cup!</p>
            </header>

            <h2 className="text-xl font-bold mb-6">最新文章</h2>
            <ul className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                {latestPosts.map((post) => {
                    const cover =
                        post.image || (post.images?.length > 0 ? post.images[0] : null);

                    return (
                        <li
                            key={post.slug}
                            className="border rounded-xl p-4 shadow hover:shadow-lg"
                        >
                            {cover && (
                                <Image
                                    src={cover}
                                    alt={post.title || post.slug}
                                    width={200}
                                    height={200}
                                    className="w-full h-auto rounded-xl mb-3"
                                />
                            )}
                            <Link
                                href={`/reviews/${post.region}/${post.slug}`}
                                className="text-base font-semibold text-blue-600 hover:underline block h-10"
                            >
                                {post.title || post.slug}
                            </Link>
                            <p className="text-gray-500 text-xs mt-1">
                                {post.date} • {post.author}
                            </p>
                            <p className="mt-2 text-gray-700 text-sm line-clamp-3">
                                {post.excerpt}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
