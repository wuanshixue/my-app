"use client"
import { useState } from "react";

export default function ContactPage(){
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("✅ 已成功发送！");
                setForm({ firstName: "", lastName: "", email: "", message: "" });
            } else {
                setStatus("❌ 发送失败，请稍后再试。");
            }
        } catch (error) {
            setStatus("⚠️ 出错了：" + error.message);
        } finally {
            setLoading(false);
        }
    };
    return(
        <div className="max-w-3xl mx-auto px-6 py-12">
            {/* 标题 */}
            <h1 className="text-3xl font-serif text-center mb-6">Contact</h1>
            {/* 提示文本 */}
            <p className="mb-4 text-gray-700">
                Got a question for me? Want me to review a particular roaster? Just want to talk coffee?
                Drop me a line below.
            </p>
            <p className="mb-8 text-gray-600 text-sm">
                Please note: I am not taking requests for sponsorships, partnerships, advertising,
                or any other sort of collaboration at this time, including coffee bean reviews.
                I simply don’t have the time or energy to devote to reviewing anything I am not already buying myself.
                If circumstances change, I will update this page to reflect that. Thank you!
            </p>
            {/* 表单 */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <lable className="block font-medium">First Name<span className="text-red-500">*</span></lable>
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
                        <lable className="block font-medium">Last Name<span className="text-red-500">*</span></lable>
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
                    <lable className="block font-medium">Email<span className="text-red-500">*</span></lable>
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
                    <label className="block font-medium">Comment or Message <span className="text-red-500">*</span></label>
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

                {status && <p className="mt-4 text-center">{status}</p>}
            </form>
        </div>
    )
}
