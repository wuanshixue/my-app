// src/app/page.js (Server Component ✅)
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
    title: "Home | Coffee Wuanshixue",
    description: "Discover coffee reviews, advice, and brewing guides.",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function HomePage() {
    const posts = getAllPosts();

    return (
        <main className="max-w-5xl mx-auto px-4 py-6">
            <h1 className="text-xl font-bold mb-6">最新文章</h1>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => {
                    const cover =
                        post.frontmatter?.image ||
                        (post.frontmatter?.images?.length > 0 ? post.frontmatter.images[0] : null);

                    return (
                        <li key={post.slug} className="border rounded-xl p-4 shadow hover:shadow-lg">
                            {cover && (
                                <Image
                                    src={cover}
                                    alt={post.frontmatter?.title || "文章封面"}
                                    width={200}
                                    height={200}
                                    className="w-full h-auto rounded-xl mb-3"
                                />
                            )}
                            <Link
                                href={`/reviews/${post.region}/${post.slug}`}
                                className="text-base font-semibold text-blue-600 hover:underline block h-10"
                            >
                                {post.frontmatter?.title || post.slug}
                            </Link>
                            <p className="text-gray-500 text-xs mt-1">
                                {post.frontmatter?.date} • {post.frontmatter?.author}
                            </p>
                            <p className="mt-2 text-gray-700 text-sm line-clamp-3">
                                {post.frontmatter?.excerpt}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
