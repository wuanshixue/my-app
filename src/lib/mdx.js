import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

export function getPosts(region) {
    const dir = path.join(contentDir, region);
    const files = fs.readdirSync(dir);

    return files.map((file) => {
        const filePath = path.join(dir, file);
        const source = fs.readFileSync(filePath, "utf8");
        const { data:frontmatter } = matter(source);
        return {
            slug: file.replace(/\.mdx?$/, ""),
            frontmatter,
        };
    });
}

export function getPostBySlug(region, slug) {
    const filePath = path.join(contentDir, region, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return {};

    const source = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(source);

    return {
        meta: data,
        content,
    };
}
