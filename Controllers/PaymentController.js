import braintree from "braintree";
import dotenv from "dotenv";
import orderModel from "../Models/order.model.js";
//Payment Getway Braintree
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAIN_TREE_MERCHANT_ID,
  publicKey: process.env.BRAIN_TREE_PUBLIC_KEY,
  privateKey: process.env.BRAIN_TREE_PRIVATE_KEY,
});

export const TokenBraintreeController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// export const PaymentBraintreeController = (req, res) => {
//   try {
//     const { cart, nonce } = req.body;
//     let total = 0;
//     // cart?.map((item)=>total+= item.price * parseInt(item.quantity))
//     cart?.map((item) => (total += item.price));
//     // console.log("helo ", cart, nonce, total);
//     let newTransacton = gateway.transaction.sale({
//       amount: total,
//       paymentMethodNonce: nonce,
//       options: {
//         submitForSettlement: true,
//       },
//       function(error, result) {
//         console.log(result);
//         if (result) {
//           new orderModel({
//             products: cart,
//             payment: result,
//             buyers: req.user._id,
//           }).save();
//           res.json({ ok: true });
//         } else {
//           res.status(500).send(error);
//         }
//       },
//     });
//     res.send({ success: true });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const PaymentBraintreeController = (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart?.map((item) => (total += item.price));

    let transactionParams = {
      amount: total,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    };

    gateway.transaction.sale(transactionParams, function (error, result) {
      if (result) {
        new orderModel({
          products: cart,
          payment: result,
          buyer: req.user._id,
        }).save();

        res.status(200).send({
          success: true,
          messge: "payment Succefully Completed",
        });
      } else {
        res.status(500).send(error);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
