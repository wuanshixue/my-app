import createMDX from "@next/mdx";

/**
 * 使用 @next/mdx 增强 MDX 支持
 * 这里的 extension 指定 md 和 mdx 文件后缀
 */
const withMDX = createMDX({
    extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx"], // 支持这些文件作为页面
};

export default withMDX(nextConfig);
