"use client";
import { useState } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    // 输入框变化时更新 state
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    // 提交表单
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setStatus("发送中...");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (data.success) {
                setStatus("✅ 邮件已发送成功！");
                setForm({ firstName: "", lastName: "", email: "", message: "" });
            } else {
                setStatus("❌ 邮件发送失败：" + data.error);
            }
        } catch (err) {
            setStatus("❌ 网络错误：" + err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* 标题 */}
            <h1 className="text-3xl font-serif mb-6">Contact</h1>

            {/* 提示文本 */}
            <p className="mb-4 text-gray-700">
                Got a question for me? Want me to review a particular roaster? Just want to talk coffee?
                Drop me a line below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">
                            First Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">
                            Last Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block font-medium">
                        Email<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 mt-1"
                    />
                </div>

                {/* Message */}
                <div>
                    <label className="block font-medium">
                        Comment or Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full border rounded px-3 py-2 mt-1"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Submit"}
                </button>
                {status && <p className="mt-4">{status}</p>}
            </form>
        </div>
    );
}
