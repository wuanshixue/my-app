import fs from "fs";
import React from "react";
import path from "path";
import { getPostsUnified } from "@/lib/posts";

export async function generateStaticParams() {
    const adviceDir = path.join(process.cwd(), "src", "content", "advice");

    const topics =fs
    .readdirSync(adviceDir)
    .filter((file) => fs.statSync(path.join(adviceDir, file)).isDirectory());

    return topics.map((topic) => ({
        topic,
    }));
}

/**
 * params.topic 是路由参数，例如 /advice/coffee 对应 topic="coffee"
 */
export default function AdviceTopicPage({ params }) {
    const { topic } = params;
    // 获取当前 topic 下的文章
    const posts = getPostsUnified({ base: "advice", topic });


    return (
        <div>
            <h1>Advice topic: {params.topic}</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <a href={`/advice/${topic}/${post.slug}`}>{post.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

