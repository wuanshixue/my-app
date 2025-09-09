import Link from "next/link";
import { getPosts } from "@/lib/mdx";

export default function AfricaPage() {
    const posts = getPosts("africa");

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-6">Africa</h1>

            <div className="space-y-12">
                {posts.map((post) => (
                    <article key={post.slug} className="border-b pb-6">
                        <p className="text-sm uppercase text-gray-500 mb-2">
                            {post.region}
                        </p>

                        <h2 className="text-xl font-bold mb-2">
                            <Link href={`/reviews/africa/${post.slug}`}>{post.title}</Link>
                        </h2>

                        <p className="text-gray-500 text-sm mb-4">
                            Posted on {post.date} by {post.author}
                        </p>

                        <img
                            src={post.image}
                            alt={post.title}
                            className="mb-4 rounded-lg shadow"
                        />

                        <p className="text-gray-700 mb-4">{post.excerpt}</p>

                        <Link
                            href={`/reviews/africa/${post.slug}`}
                            className="text-gray-600 uppercase tracking-wide text-sm font-semibold"
                        >
                            | Read More |
                        </Link>
                    </article>
                ))}
            </div>
        </main>
    );
}
