"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderEmail = exports.sendVerificationUser = exports.sendVerificationEmail = void 0;
const email_config_1 = require("./email.config");
const emaleTemplate_1 = require("./emaleTemplate");
const orderEmailTemplate_1 = require("./orderEmailTemplate");
const sendVerificationEmail = (email, verificationCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield email_config_1.transporter.sendMail({
            from: 'Leather For Luxury""<overseasreshan@gmail.com>',
            to: email, // list of receivers
            subject: "Order Track Code", // Subject line
            text: "Order Track Code", // plain text body
            html: emaleTemplate_1.Verification_Email_Template.replace("{verificationCode}", verificationCode),
        });
        console.log("Email sent successfully:", response);
    }
    catch (error) {
        console.error("Email error:", error);
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendVerificationUser = (email, verificationCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield email_config_1.transporter.sendMail({
            from: 'Leather For Luxury""<overseasreshan@gmail.com>',
            to: email, // list of receivers
            subject: "Verification", // Subject line
            text: "Verification", // plain text body
            html: emaleTemplate_1.Verification_User_Template.replace("{verificationCode}", verificationCode),
        });
        console.log("Email sent successfully:", response);
    }
    catch (error) {
        console.error("Email error:", error);
    }
});
exports.sendVerificationUser = sendVerificationUser;
const sendOrderEmail = (email, Items, structuredOrderItems) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generate the dynamic HTML for the order items
        const orderItemsHTML = structuredOrderItems.orderItems
            .map((item) => {
            const product = Items.find((p) => p._id.equals(item.product));
            return `
          <tr>
            <td width="20%">
              <img src="${product === null || product === void 0 ? void 0 : product.imageDefault}" alt="${product === null || product === void 0 ? void 0 : product.name}" width="90">
            </td>
            <td width="60%">
              <span class="font-weight-bold">${product === null || product === void 0 ? void 0 : product.name}</span>
              <div class="product-qty">
                <span class="d-block">Quantity: ${item.quantity}</span>
                <span>Color: ${item.color}</span>
              </div>
            </td>
            <td width="20%">
              <div class="text-right">
                <span class="font-weight-bold">$${product === null || product === void 0 ? void 0 : product.originalPrice}</span>
              </div>
            </td>
          </tr>
        `;
        })
            .join("");
        // Replace placeholders in the template
        const emailHTML = orderEmailTemplate_1.Order_Email_Template.replace("{orderItems}", orderItemsHTML).replace("{totalPrice}", structuredOrderItems.totalPrice.toFixed(2)); // Use totalPrice from the order
        // Send the email
        const response = yield email_config_1.transporter.sendMail({
            from: '"Leather For Luxury" <overseasreshan@gmail.com>',
            to: email,
            subject: "Order Confirmed",
            text: `Your order has been confirmed! Track Code: ${structuredOrderItems.trackCode || "N/A"}`,
            html: emailHTML, // Final email HTML with the dynamic content
        });
        console.log("Email sent successfully:", response);
    }
    catch (error) {
        console.error("Email error:", error);
        throw new Error("Failed to send email");
    }
});
exports.sendOrderEmail = sendOrderEmail;
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
