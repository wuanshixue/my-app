import { getPosts } from "@/lib/mdx";
import Link from "next/link";

export default async function RegionPage({ params }) {
    const { region } = await params; // ✅ await 访问
    const posts = getPosts(region); // 如果异步：await getPosts(region)

    if (!posts.length) {
        return <p className="p-6">No posts found for {region}</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold capitalize mb-6">
                Reviews in {region}
            </h1>
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link
                            href={`/reviews/${region}/${post.slug}`}
                            className="text-blue-600 hover:underline"
                        >
                            {post.meta.title || post.slug}
                        </Link>
                        <p className="text-gray-500">{post.meta.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
