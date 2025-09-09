import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function PostPage({ params }) {
    const { region, slug } = await params;

    // 读取文章
    const { meta, content } = getPostBySlug(region, slug);

    if (!meta) {
        return <p className="text-center py-10">Post not found.</p>;
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            {/* 标题 */}
            <h1 className="text-3xl font-bold mb-2">{meta.title}</h1>
            <p className="text-gray-500 text-sm mb-6">
                {meta.date} · {meta.author}
            </p>

            {/* 如果有封面图 */}
            {meta.image && (
                <img
                    src={meta.image}
                    alt={meta.title}
                    className="rounded mb-6"
                />
            )}

            {/* 正文内容 */}
            <article className="prose prose-lg">
                <MDXRemote source={content} />
            </article>
        </main>
    );
}
