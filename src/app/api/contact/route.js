import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, message } = body;

        // 检查必要字段
        if (!firstName || !lastName || !email || !message) {
            return new Response(JSON.stringify({ success: false, error: "缺少必要字段" }), { status: 400 });
        }

        // 邮件发送配置
        const transporter = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // QQ 邮箱授权码
            },
        });

        // 邮件内容
        const mailOptions = {
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER, // 收件人
            subject: "📩 新联系",
            html: `
        <h3>来自 ${firstName} ${lastName} 的留言</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        };

        // 发送邮件
        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error("邮件发送失败:", err);

        // 更详细的错误返回
        return new Response(JSON.stringify({
            success: false,
            error: err.response ? err.response : err.message
        }), { status: 500 });
    }
}
