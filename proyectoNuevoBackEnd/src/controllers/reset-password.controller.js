import {
    ForgotPassword
} from "../services/reset-password.services.js";

const forgotPasswordHandler = async (req, res) => {
    const email = req.body.email;
    if (email == "") {
        res.status(400).json({
            "err": "Email is required"
        })
        return
    }
    try {
        let user = await ForgotPassword(email)
        res.status(200).json("Password reset mail sent, please check your mail.")

    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}
export default forgotPasswordHandler;