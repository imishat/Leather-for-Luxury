import { transporter } from "./email.config";
import {
  Verification_Email_Template,
  Welcome_Email_Template,
} from "./emaleTemplate";

export const sendVerificationEmail = async (
  email: string,
  verificationCode: string
): Promise<void> => {
  try {
    const response = await transporter.sendMail({
      from: 'Leather For Luxury""<overseasreshan@gmail.com>',
      to: email, // list of receivers
      subject: "Order Track Code", // Subject line
      text: "Order Track Code", // plain text body
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Email error:", error);
  }
};

// export const sendWelcomeEmail = async (
//   email: string,
//   name: string
// ): Promise<void> => {
//   try {
//     const response = await transporter.sendMail({
//       from: '"Zahid" <zahidtime313@gmail.com>',
//       to: email, // list of receivers
//       subject: "Welcome Email", // Subject line
//       text: "Welcome Email", // plain text body
//       html: Welcome_Email_Template.replace("{name}", name),
//     });
//     console.log("Email sent successfully:", response);
//   } catch (error) {
//     console.error("Email error:", error);
//   }
// };
