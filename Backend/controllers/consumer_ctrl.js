const { validationResult } = require('express-validator')

const customer_details = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Dummy Error')
        error.code = 202
        next(error)
    }
    const {ppl_qty, line1, line2, pin, city} = req.body;
    console.log(ppl_qty + line1 + line2 + pin + city);
}

exports.customer_details = customer_details