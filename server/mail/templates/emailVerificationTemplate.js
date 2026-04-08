const otpTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification Email</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F5F5F5;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,0.08);">

      <!-- HEADER -->
      <div style="background-color:#0f172a;padding:30px;text-align:center;border-bottom:2px solid #EAB308;">
        <div style="display:inline-flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#1e293b,#0f172a);border:1.5px solid #334155;display:inline-flex;align-items:center;justify-content:center;">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="12" width="14" height="3" rx="1.5" fill="#EAB308"/>
              <rect x="6" y="10" width="8" height="2.5" rx="1" fill="#EAB308" opacity="0.8"/>
              <path d="M12 2L7.5 9H11L9 18l8-10h-4.5L12 2z" fill="#ffffff" opacity="0.9"/>
            </svg>
          </div>
          <div style="font-family:Arial,sans-serif;font-weight:800;font-size:1.15rem;letter-spacing:-0.02em;">
            <span style="color:#f1f5f9;">Skill</span><span style="color:#EAB308;">Forge</span>
          </div>
        </div>
      </div>

      <!-- BODY -->
      <div style="padding:35px;text-align:center;">
        <h2 style="margin-bottom:20px;color:#111827;">OTP Verification Email</h2>
        <p style="color:#374151;font-size:16px;">Dear User,</p>
        <p style="color:#4B5563;font-size:15px;line-height:1.6;margin:20px 0;">
          Thank you for registering with <strong>SkillForge</strong>.
          To complete your registration, please use the following
          One-Time Password (OTP) to verify your account:
        </p>
        <!-- OTP BOX -->
        <div style="margin:35px 0;">
          <div style="font-size:32px;font-weight:bold;letter-spacing:6px;background:#EAB308;color:#0f172a;display:inline-block;padding:18px 45px;border-radius:10px;box-shadow:0 6px 15px rgba(234,179,8,0.4);">
            ${otp}
          </div>
        </div>
        <p style="font-size:14px;color:#6B7280;line-height:1.6;">
          This OTP is valid for 5 minutes.
          If you did not request this verification, please ignore this email.
          Once your account is verified, you will have full access to our platform and its features.
        </p>
      </div>

      <!-- FOOTER -->
      <div style="background:#FAFAFA;padding:20px;text-align:center;font-size:13px;color:#9CA3AF;">
        Need help? Contact us at<br/>
        <a href="mailto:dev.wworkss@gmail.com" style="color:#EAB308;text-decoration:none;font-weight:bold;">
          dev.wworkss@gmail.com
        </a>
      </div>

    </div>
  </body>
  </html>
  `;
};

module.exports = otpTemplate; 


