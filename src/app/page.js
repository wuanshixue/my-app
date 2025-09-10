import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
    const posts = getAllPosts();

    return (
        <main className="max-w-3xl mx-auto px-4 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Latest Reviews</h1>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <li
                        key={post.slug}
                        className="border rounded-xl p-4 shadow hover:shadow-lg transition"
                    >
                        <Link
                            href={`/reviews/${post.region}/${post.slug}`}
                            className="text-lg font-semibold text-blue-600 hover:underline line-clamp-2"
                        >
                            {post.frontmatter.title}
                        </Link>
                        <p className="text-gray-500 text-xs mt-1">
                            {post.frontmatter.date} • {post.frontmatter.author}
                        </p>
                        <p className="mt-2 text-gray-700 text-sm line-clamp-3">
                            {post.frontmatter.excerpt}
                        </p>
                    </li>
                ))}
            </ul>
        </main>

    );
}
