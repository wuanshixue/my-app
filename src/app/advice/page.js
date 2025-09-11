// src/app/advice/page.js
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
    title: "Advice | Coffee Wuanshixue",
    description: "Coffee advice, guides and tips.",
};

export default async function AdvicePage() {
    const posts = getAllPosts("advice");

    return (
        <main className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Advice</h1>
            <ul className="grid gap-6 grid-cols-1">
                {posts.map((post) => {
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
                                    width={600}
                                    height={400}
                                    className="w-full h-auto rounded-xl mb-3"
                                />
                            )}
                            <Link
                                href={`/reviews/advice/${post.slug}`}
                                className="text-lg font-semibold text-blue-600 hover:underline block text-center"
                            >
                                {post.title || post.slug}
                            </Link>
                            <p className="text-gray-500 text-sm mt-1 text-center">
                                {post.date} • {post.author}
                            </p>
                            <p className="mt-2 text-gray-700 text-sm line-clamp-3 text-center">
                                {post.excerpt}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
