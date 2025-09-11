import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

const adviceDir = path.join(process.cwd(), "src", "content", "advice");

export async function generateStaticParams() {
    if (!fs.existsSync(adviceDir)) return [];

    const files = fs.readdirSync(adviceDir).filter((f) => f.endsWith(".mdx"));

    return files.map((file) => ({
        slug: file.replace(/\.mdx$/, ""),
    }));
}

export default async function AdvicePage({ params }) {
    const { slug } = params;

    const filePath = path.join(adviceDir, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return <div className="p-6 text-red-500">文章不存在</div>;
    }

    const source = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(source);

    return (
        <main className="max-w-3xl mx-auto px-4 py-8 prose prose-lg">
            {/* 标题 */}
            <h1 className="font-serif text-3xl font-bold mb-4">
                {data.title || slug}
            </h1>

            {/* 元信息 */}
            <p className="text-gray-500 text-sm mb-6">
                {data.date} {data.author ? `• ${data.author}` : ""}
            </p>

            {/* 封面 */}
            {data.image && (
                <Image
                    src={data.image}
                    alt={data.title || slug}
                    width={800}
                    height={400}
                    className="rounded-xl mb-6"
                />
            )}

            {/* 正文 */}
            <MDXRemote source={content} />
        </main>
    );
}
