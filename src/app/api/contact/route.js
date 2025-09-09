import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, message } = body;

        // QQ 邮箱 SMTP 配置
        const transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // 授权码
            },
        });

        // 邮件内容
        await transporter.sendMail({
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER,
            subject: "📩 新的联系表单提交",
            html: `
        <h3>来自 ${firstName} ${lastName} 的留言</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error("邮件发送失败:", err);
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
}
