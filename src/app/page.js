// src/app/page.js
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
    const posts = getAllPosts("reviews");

    // 只显示 africa、latin-america、asian 分类
    const allowedRegions = ["africa", "latin-america", "asian"];
    const filteredPosts = posts.filter(post => allowedRegions.includes(post.region));

    // 按日期排序
    const sortedPosts = filteredPosts.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    // 取前 7 篇最新
    const latestPosts = sortedPosts.slice(0, 7);

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-8 text-left">最新文章</h2>

            <ul className="grid gap-12 grid-cols-1">
                {latestPosts.map((post) => {
                    const cover =
                        post.image || (post.images?.length > 0 ? post.images[0] : null);

                    return (
                        <li
                            key={post.slug}
                            className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            {cover && (
                                <Link href={`/reviews/${post.region}/${post.slug}`}>
                                    <Image
                                        src={cover}
                                        alt={post.title || post.slug}
                                        width={800}
                                        height={400}
                                        className="w-full h-64 object-cover"
                                        priority
                                    />
                                </Link>
                            )}

                            <div className="p-6 text-center">
                                <Link
                                    href={`/reviews/${post.region}/${post.slug}`}
                                    className="text-2xl font-bold font-serif text-gray-900 hover:text-blue-600 transition-colors"
                                >
                                    {post.title || post.slug}
                                </Link>
                                <p className="text-gray-500 text-sm mt-2">
                                    {post.date} • {post.author}
                                </p>
                                <p className="mt-4 text-gray-700 text-base leading-relaxed max-w-2xl mx-auto">
                                    {post.excerpt}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
