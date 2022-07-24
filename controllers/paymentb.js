var braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Production,
    merchantId:  "54qr4gf7bsx8pmv7",
    publicKey:   "txhvktczt6pmh8yq",
    privateKey:  "a95977afbcdedec0bf40c209dea96d76"
  });


  exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.send(response);
        }
      });
  }

  exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce;

    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if(err){
            res.status(500).json(error);
        } else {
            res.json(result);
        }
      });
  }