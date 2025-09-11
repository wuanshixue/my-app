import fs from "fs";
import path from "path";
import matter from "gray-matter";

const rootDir = path.join(process.cwd(), "src", "content");

/**
 * 通用获取文章函数
 * @param {Object} options
 * @param {string} options.base - 必须传入 ('reviews' | 'advice')
 * @param {string} [options.topic] - advice 的分类 (bean-selection, storage...)
 * @param {string} [options.region] - reviews 的地区 (africa, asia...)
 */
export function getPostsUnified({ base, topic, region } = {}) {
    if (!base) {
        throw new Error("必须传入 base 参数（如 'reviews' 或 'advice'）");
    }

    // base 层级目录
    let targetDir = path.join(rootDir, base);

    // 针对 reviews 和 advice 的不同子目录处理
    if (base === "reviews" && region) {
        // ✅ 如果 content 下没有 reviews 目录，而是直接放 region
        const regionDir = path.join(rootDir, region);
        targetDir = fs.existsSync(regionDir)
            ? regionDir // 兼容 src/content/africa/xxx.mdx
            : path.join(targetDir, region); // 兼容 src/content/reviews/africa/xxx.mdx
    }
    if (base === "advice" && topic) {
        targetDir = path.join(targetDir, topic);
    }

    if (!fs.existsSync(targetDir)) {
        return [];
    }

    // 支持 .md 和 .mdx
    const files = fs.readdirSync(targetDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

    return files.map((file) => {
        const fullPath = path.join(targetDir, file);
        const source = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(source);

        return {
            slug: file.replace(/\.mdx?$/, ""),
            ...data,
            content,
            base, // ✅ 标记属于 reviews 还是 advice
            region: base === "reviews" ? region : null, // ✅ 修复 null 问题
            topic: base === "advice" ? topic : null,
        };
    });
}

/**
 * 获取某个 base 下所有文章（reviews 或 advice 全量）
 */
export function getAllPosts(base = "reviews") {
    if (!base) {
        throw new Error("必须传入 base 参数（如 'reviews' 或 'advice'）");
    }

    const baseDir = path.join(rootDir, base);

    // ✅ reviews 兼容没有 reviews 目录的情况
    if (base === "reviews" && !fs.existsSync(baseDir)) {
        // 直接扫描 content 下的所有子目录（africa, asia...）
        const regions = fs
            .readdirSync(rootDir)
            .filter((f) => fs.statSync(path.join(rootDir, f)).isDirectory());

        let allPosts = [];
        regions.forEach((region) => {
            allPosts = allPosts.concat(getPostsUnified({ base, region }));
        });

        return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // ✅ advice 或者 reviews 存在子目录
    if (!fs.existsSync(baseDir)) return [];

    const subDirs = fs
        .readdirSync(baseDir)
        .filter((f) => fs.statSync(path.join(baseDir, f)).isDirectory());

    let allPosts = [];
    subDirs.forEach((sub) => {
        if (base === "reviews") {
            allPosts = allPosts.concat(getPostsUnified({ base, region: sub }));
        }
        if (base === "advice") {
            allPosts = allPosts.concat(getPostsUnified({ base, topic: sub }));
        }
    });

    return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
