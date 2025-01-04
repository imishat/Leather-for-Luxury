export const Order_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap">
    <style>
        body {
            background-color: #ffe8d2;
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px;
        }

        .card {
            border: none;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        .logo {
            background-color: #eeeeeea8;
            padding: 10px 40px;
            text-align: left;
        }

        .invoice {
            padding: 30px;
        }

        .product {
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .product table {
            width: 100%;
            border-collapse: collapse;
        }

        .product td {
            padding: 12px;
            text-align: left;
        }

        .product img {
            width: 90px;
        }

        .logo img {
            width: 90px;
        }

        .product-qty span {
            font-size: 12px;
            color: #dedbdb;
        }

        .text-right {
            text-align: right;
        }

        .footer {
            background-color: #eeeeeea8;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
        }

        @media (max-width: 768px) {
            .row {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="logo">
                      <img src="https://i.ibb.co.com/4Zs33Kg/logo.webp" alt="logo" border="0" />
                    </div>
                    <div class="invoice">
                        <h5>Your order is confirmed!</h5>
                        <span class="font-weight-bold d-block mt-4">Hello, Customer</span>
                        <span>Your order has been confirmed and will be shipped shortly!</span>
                        <div class="product">
                            <table>
                                <tbody>
                                    <!-- Order Items Placeholder -->
                                    {orderItems}
                                </tbody>
                            </table>
                        </div>
                        <div class="total-price">
    <table width="100%">
        <tr>
            <td class="text-right font-weight-bold" style="padding: 20px 0;">Total Price:</td>
            <td class="text-right font-weight-bold" style="padding: 20px 0;">{totalPrice}</td>
        </tr>
    </table>
</div>

                        <p>We will send a shipping confirmation email when the items are shipped!</p>
                        <p class="font-weight-bold mb-0">Thanks for shopping with us!</p>
                        <span>Leather For Luxury Team</span>
                    </div>
                    <div class="footer">
                        <span>Need Help? Visit our <a href="#">help center</a></span>
                        <span>&copy; ${new Date().toLocaleString("default", {
                          month: "long",
                        })} ${new Date().getFullYear()}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;
