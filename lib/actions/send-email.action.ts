"use server";

import transporter from "@/lib/nodemailer";

const styles = {
  body: "background-color:#f5f5f5;padding:40px 0;",
  container:
    "max-width:520px;margin:0 auto;background:#ffffff;padding:32px;border-radius:12px;border:1px solid #e5e5e5;font-family:Arial,Helvetica,sans-serif;",
  heading: "font-size:22px;font-weight:600;color:#111111;margin-bottom:16px;",
  paragraph: "font-size:16px;color:#444444;line-height:1.6;margin-bottom:24px;",
  buttonWrapper: "text-align:center;",
  link: "display:inline-block;padding:12px 24px;background:#111111;color:#ffffff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:500;",
  footer: "margin-top:32px;font-size:12px;color:#888888;text-align:center;",
};

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `AuthProject• ${subject}`,
    html: `
      <div style="${styles.body}">
        <div style="${styles.container}">
          <h1 style="${styles.heading}">${subject}</h1>

          <p style="${styles.paragraph}">
            ${meta.description}
          </p>

          <div style="${styles.buttonWrapper}">
            <a href="${meta.link}" style="${styles.link}">
              Devam Et
            </a>
          </div>

          <div style="${styles.footer}">
            Eğer bu isteği siz yapmadıysanız, bu e-postayı güvenle
            yok sayabilirsiniz.
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendEmail]:", err);
    return { success: false };
  }
}
