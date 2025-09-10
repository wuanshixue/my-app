import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src", "content");

/**
 * 获取某个地区的所有文章
 */
export function getPostsByRegion(region) {
    const regionDir = path.join(contentDir, region);

    if (!fs.existsSync(regionDir)) return [];

    const fileNames = fs.readdirSync(regionDir);

    return fileNames
        .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
        .map((file) => {
            const slug = file.replace(/\.mdx?$/, "");
            const fullPath = path.join(regionDir, file);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data: frontmatter } = matter(fileContents);

            return {
                slug,                          // 文件名
                region,                        // 所属地区
                title: frontmatter.title || slug, // 用 title 做搜索关键词
                excerpt: frontmatter.excerpt || "", // 方便搜索结果展示
                date: frontmatter.date || null,
                frontmatter,
            };
        });
}

/**
 * 获取所有文章（跨地区）
 */
export function getAllPosts() {
    if (!fs.existsSync(contentDir)) return [];

    const regions = fs.readdirSync(contentDir).filter((file) =>
        fs.statSync(path.join(contentDir, file)).isDirectory()
    );

    let posts = [];

    regions.forEach((region) => {
        posts = posts.concat(getPostsByRegion(region));
    });

    // 按日期倒序排序
    return posts.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );
}
