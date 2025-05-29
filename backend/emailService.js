const nodemailer = require('nodemailer');

/**
 * Email service for sending emails from the VOG website
 */
class EmailService {
  constructor() {
    // Configure email service with the VOG ministries email
    this.transporter = nodemailer.createTransport({
      // Update these settings based on the email provider for INFO@THEVOGMINISTRIES.ORG
      service: 'gmail', // Change this to match your email provider (e.g., 'outlook', 'yahoo', etc.)
      host: 'smtp.gmail.com', // Update this to your email provider's SMTP server
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || ''
      }
    });
  }

  /**
   * Send an email
   * @param {Object} options - Email options
   * @param {string} options.from - Sender email
   * @param {string} options.fromName - Sender name
   * @param {string} options.subject - Email subject
   * @param {string} options.message - Email message
   * @returns {Promise} - Promise resolving to the email send result
   */
  async sendEmail({ from, fromName, subject, message }) {
    const mailOptions = {
      from: `"Voice of God Ministries" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: from,
      subject: `[VOG Website] ${subject}`,
      html: message
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();