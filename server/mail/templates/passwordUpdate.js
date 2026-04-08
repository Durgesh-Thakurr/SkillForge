exports.passwordUpdated = (email, name) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Password Update Confirmation</title>
      <style>
          body { background-color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; }
          .message { font-size: 18px; font-weight: bold; margin-bottom: 20px; }
          .body { font-size: 16px; margin-bottom: 20px; }
          .support { font-size: 14px; color: #999999; margin-top: 20px; }
          .highlight { font-weight: bold; }
      </style>
  </head>
  <body>
      <div class="container">
          <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:20px;">
            <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#1e293b,#0f172a);border:1.5px solid #334155;display:flex;align-items:center;justify-content:center;">
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
          <div class="message">Password Update Confirmation</div>
          <div class="body">
              <p>Hey ${name},</p>
              <p>Your password has been successfully updated for the email <span class="highlight">${email}</span>.</p>
              <p>If you did not request this password change, please contact us immediately to secure your account.</p>
          </div>
          <div class="support">If you have any questions or need further assistance, please feel free to reach out to us at
              <a href="mailto:dev.wworkss@gmail.com">dev.wworkss@gmail.com</a>. We are here to help!
          </div>
      </div>
  </body>
  </html>`;
}; 