import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function generateStaticParams() {
    const adviceDir = path.join(process.cwd(), "src", "content", "advice");

    const topics = fs
        .readdirSync(adviceDir)
        .filter((file) => fs.statSync(path.join(adviceDir, file)).isDirectory());

    const paths = [];
    topics.forEach((topic) => {
        const topicDir = path.join(adviceDir, topic);
        const files = fs.readdirSync(topicDir).filter((f) => f.endsWith(".md"));
        files.forEach((file) => {
            paths.push({ topic, slug: file.replace(/\.md$/, "") });
        });
    });

    return paths;
}

export default async function AdvicePostPage({ params }) {
    const { topic, slug } = await params;

    const baseDir = path.join(process.cwd(), "src", "content", "advice", topic);

    const mdPath = path.join(baseDir,`${slug}.md`)
    const mdxPath = path.join(baseDir,`${slug}.mdx`)

    let filePath = null;
    if (fs.existsSync(mdPath)) {
        filePath = mdPath;
    } else if (fs.existsSync(mdxPath)) {
        filePath = mdxPath;
    } else {
        throw new Error(`找不到文件: ${mdPath} 或 ${mdxPath}`);
    }
    const source = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(source);

    return (
        <article className="prose mx-auto py-10">
            <h1>{data.title}</h1>
            <p className="text-gray-500">
                {data.date}
            </p>
            <div>{content}</div>
        </article>
    );
}
