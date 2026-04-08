const express = require("express")
const router = express.Router()

const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
  verifySignature,
} = require("../controllers/payments")

const { auth, isStudent } = require("../middlewares/auth")

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail)
router.post("/verifySignature", verifySignature)

module.exports = router