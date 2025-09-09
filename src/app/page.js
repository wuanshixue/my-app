import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
    const posts = getAllPosts();

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Latest Reviews</h1>
            <ul className="space-y-6">
                {posts.map((post) => (
                    <li key={post.slug} className="border-b pb-4">
                        <Link
                            href={`/reviews/${post.region}/${post.slug}`}
                            className="text-xl font-semibold text-blue-600 hover:underline"
                        >
                            {post.frontmatter.title}
                        </Link>
                        <p className="text-gray-500 text-sm">
                            {post.frontmatter.date} • {post.frontmatter.author}
                        </p>
                        <p className="mt-2 text-gray-700">
                            {post.frontmatter.excerpt}
                        </p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
