import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">文章</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug} className="mb-2">
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 underline"
                        >
                            {post.title}
                        </Link>
                        <p className="text-blue-500">{post.date}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
