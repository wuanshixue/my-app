import { getPostData } from "@/lib/posts";

export default async function BlogPost({ params }) {
    const post = await getPostData(params.slug);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-500 mb-4">{post.date}</p>
            <article
                className="prose"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
        </main>
    );
}
