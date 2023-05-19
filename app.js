const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

const exp_res = {
    "operation_code": 1
}

const exp_res1 = {
    "output": 'Success'
}

function isAlphabet(value) {
    return /^[a-zA-Z]+$/.test(value);
}

function isInteger(value) {
    return /^\d+$/.test(value);
}


app.get("/bhfl", function (req, res) {
    console.log(res.statusCode);
    res.send(exp_res);
});

app.get("/:other", function (req, res) {
    res.send("Bad request");
})

app.post("/bhfl", function (req, res) {
    // console.log(req.body);
    const req_msg = {
        "status": res.statusCode,
        "userid": req.body.userid,
        "college_mail": req.body.email,
        "reg_no": req.body.no,
        "data": req.body.data
    };
    var alpha = [];
    var num = [];
    const data = req_msg.data;
    for (let i = 0; i < data.length; i++) {
        if (isAlphabet(data[i])) {
            alpha.push(data[i]);
        }
        if (isInteger(data[i])) {
            num.push(data[i]);
        }
    };
    const res_msg = {
        "is_success": res.issuccess,
        "user_id": req.body.userid,
        "email": req.body.email,
        "roll_number": req.body.no,
        "numbers": num,
        "alphabets": alpha
    };
    res.send(res_msg);
})

app.listen(3000, function () {
    console.log('Running on port 3000');
});

