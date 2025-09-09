import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

export default function AfricaPost({ params }) {
    const { slug } = params;
    const { meta, content } = getPostBySlug("africa", slug);

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-2">{meta.title}</h1>
            <p className="text-gray-500 text-sm mb-6">
                Posted on {meta.date} by {meta.author}
            </p>
            <img
                src={meta.image}
                alt={meta.title}
                className="mb-6 rounded-lg shadow"
            />
            <div className="prose prose-lg">
                <MDXRemote source={content} />
            </div>
        </main>
    );
}
