"use client";
import { useState } from "react";

export default function ContactPage() {
    const [status, setStatus] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("发送中...");

        const formData = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            message: e.target.message.value,
        };

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.success) {
            setStatus("✅ 邮件已发送成功！");
            e.target.reset();
        } else {
            setStatus("❌ 邮件发送失败：" + data.error);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Contact</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="firstName" placeholder="First Name" className="w-full p-2 border rounded" />
                <input name="lastName" placeholder="Last Name" className="w-full p-2 border rounded" />
                <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" />
                <textarea name="message" placeholder="Message" className="w-full p-2 border rounded" />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Send
                </button>
            </form>
            {status && <p className="mt-4">{status}</p>}
        </div>
    );
}
