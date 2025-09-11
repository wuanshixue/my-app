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
        targetDir = path.join(targetDir, region);
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
            region: region || null,
            topic: topic || null,
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
    if (!fs.existsSync(baseDir)) return [];

    // 遍历 base 下所有子目录
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

    // 按日期倒序
    return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
