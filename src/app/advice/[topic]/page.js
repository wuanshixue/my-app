// /advice/[topic]/page.js
import React from "react";
import { getPostsUnified } from "@/lib/posts";

/**
 * params.topic 是路由参数，例如 /advice/coffee 对应 topic="coffee"
 */
export default function TopicPage({ params }) {
    // 获取当前 topic 下的文章
    const posts = getPostsUnified({ category: "advice", subCategory: params.topic });

    if (!posts || posts.length === 0) {
        return <div>暂无文章</div>;
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1 style={{ marginBottom: "1rem" }}>{params.topic}</h1>
            {posts.map((post) => (
                <div key={post.slug} style={{ marginBottom: "2rem" }}>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                </div>
            ))}
        </div>
    );
}
