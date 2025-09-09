import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/mdx";

export default async function RegionPage({ params }) {
    const { region } = await params;
    const posts = getPosts(region);

    if (!posts.length) {
        return <p className="text-center py-10">No posts found for {region}</p>;
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 capitalize">{region} Reviews</h1>
            <ul className="space-y-6">
                {posts.map((post) => (
                    <li key={post.slug} className="border-b pb-6">
                        {post.frontmatter.image && (
                            <Image
                                src={post.frontmatter.image}
                                alt={post.frontmatter.title}
                                width={800}
                                height={400}
                                className="rounded mb-4"
                            />
                        )}
                        <Link
                            href={`/reviews/${region}/${post.slug}`}
                            className="text-blue-600 hover:underline text-xl font-semibold"
                        >
                            {post.frontmatter.title || post.slug}
                        </Link>
                        <p className="text-gray-500 text-sm">{post.frontmatter.date}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
