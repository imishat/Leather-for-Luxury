import { IOrder } from "../modules/Oder/Oder.interface";
import { IProduct } from "../modules/Product/Product.interface";
import { transporter } from "./email.config";
import {
  Verification_Email_Template,
  Welcome_Email_Template,
} from "./emaleTemplate";
import { Order_Email_Template } from "./orderEmailTemplate";

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

export const sendOrderEmail = async (
  email: string,
  Items: IProduct[],
  structuredOrderItems: IOrder
): Promise<void> => {
  try {
    // Generate the dynamic HTML for the order items
    const orderItemsHTML = structuredOrderItems.orderItems
      .map((item) => {
        const product = Items.find((p) => p._id.equals(item.product));
        return `
          <tr>
            <td width="20%">
              <img src="${product?.imageDefault}" alt="${product?.name}" width="90">
            </td>
            <td width="60%">
              <span class="font-weight-bold">${product?.name}</span>
              <div class="product-qty">
                <span class="d-block">Quantity: ${item.quantity}</span>
                <span>Color: ${item.color}</span>
              </div>
            </td>
            <td width="20%">
              <div class="text-right">
                <span class="font-weight-bold">$${product?.originalPrice}</span>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");

    // Replace placeholders in the template
    const emailHTML = Order_Email_Template.replace(
      "{orderItems}",
      orderItemsHTML
    ).replace("{totalPrice}", structuredOrderItems.totalPrice.toFixed(2)); // Use totalPrice from the order

    // Send the email
    const response = await transporter.sendMail({
      from: '"Leather For Luxury" <overseasreshan@gmail.com>',
      to: email,
      subject: "Order Confirmed",
      text: `Your order has been confirmed! Track Code: ${
        structuredOrderItems.trackCode || "N/A"
      }`,
      html: emailHTML, // Final email HTML with the dynamic content
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Email error:", error);
    throw new Error("Failed to send email");
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
