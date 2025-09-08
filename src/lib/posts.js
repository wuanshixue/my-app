import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const filePath = path.join(postsDirectory, fileName);

            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title || slug,
                date: data.date || "未设置日期",
            };
        });

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 获取单篇文章（Markdown 转 HTML）
 */
export async function getPostData(slug) {
    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        throw new Error(`找不到文章: ${slug}`);
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // 把 markdown 转成 HTML
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        title: data.title || slug,
        date: data.date || "未设置日期",
        contentHtml, // ✅ 这里返回 HTML
    };
}
