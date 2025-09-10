import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src", "content");

/**
 * 通用获取文章函数
 * @param {Object} options
 * @param {string} [options.region] - 指定地区
 * @param {string} [options.category] - 指定分类
 * @param {string} [options.subCategory] - 指定子分类
 */

export function getPostsUnified({ region, category, subCategory } = {}) {
    let targetDir;

    if (region) {
        // 按地区
        targetDir = path.join(contentDir, region);
    } else if (category) {
        // 按分类/子分类
        const baseDir = path.join(contentDir, category);
        targetDir = subCategory ? path.join(baseDir, subCategory) : baseDir;
    } else {
        // 默认获取所有内容
        if (!fs.existsSync(contentDir)) return [];
        const dirs = fs.readdirSync(contentDir).filter((file) =>
            fs.statSync(path.join(contentDir, file)).isDirectory()
        );

        let allPosts = [];
        dirs.forEach((dir) => {
            allPosts = allPosts.concat(getPostsUnified({ region: dir }));
        });

        // 按日期倒序
        return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (!fs.existsSync(targetDir)) return [];

    const files = fs.readdirSync(targetDir).filter(
        (file) => file.endsWith(".md") || file.endsWith(".mdx")
    );

    return files.map((file) => {
        const filePath = path.join(targetDir, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data: frontmatter, content } = matter(fileContents);

        const slug = file.replace(/\.mdx?$/, "");
        return {
            slug,
            region: region || null,
            category: category || null,
            subCategory: subCategory || null,
            title: frontmatter.title || slug,
            excerpt: frontmatter.excerpt || "",
            date: frontmatter.date || null,
            frontmatter,
            content,
        };
    });

}
export const getAllPosts = () => getPostsUnified();
