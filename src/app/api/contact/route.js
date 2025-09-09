import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, message } = body;

        if (!firstName || !lastName || !email || !message) {
            return new Response(JSON.stringify({ success: false, error: "缺少必要字段" }), { status: 400 });
        }

        await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>", // 发件人，Resend 默认提供
            to: process.env.EMAIL_TO,                     // 收件人，来自环境变量
            subject: "📩 新联系",
            html: `
        <h3>来自 ${firstName} ${lastName} 的留言</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error("邮件发送失败:", err);
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
}
