// src/lib/mdx.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

export function getPosts(region) {
    const dir = path.join(contentDir, region);

    if (!fs.existsSync(dir)) {
        return [];
    }

    const files = fs.readdirSync(dir);

    return files.map((file) => {
        const filePath = path.join(dir, file);
        const source = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(source);

        return {
            slug: file.replace(/\.mdx?$/, ""),
            frontmatter: data,
        };
    });
}

export function getPostBySlug(region, slug) {
    const filePath = path.join(contentDir, region, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(source);

    return { content, frontmatter: data };
}
