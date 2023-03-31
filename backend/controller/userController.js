const { calculateAndInsertData, getDataFromDb, getQuesFromDb } = require('../services/userServices')
// Validate Users Data
const validateInsertData = async (req, res) => {
  const user = req.body
  const { name, email, mobile, obj } = user
  const regmobile = /^[0-9]+$/
  const regemail = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|co|in)$/
  if (name.length >= 3 &&
    name.length <= 30 &&
    mobile.length == 10 &&
    regmobile.test(mobile) &&
    obj != null && regemail.test(email)) {
    try {
      const response = await calculateAndInsertData(user)
      res.send({ status: 0, message: "Request Successful", result: response })
    } catch (error) {
      res.send({ status: -1, message: "Something went wrong", result: error })
    }
  } else {
    res.send({ status: -1, message: "Something is not good" })
  }
}
// Getting User Data for Graph
const getDataFromServices = async (req, res) => {
  try {
    const response = await getDataFromDb(req.query)
    res.send({ status: 0, message: "get Succesful", result: response })
  } catch (error) {
    res.send({ status: -1, message: "Something went wrong", result: error })
  }
}
// Getting all questions
const getQuesFromServices = async (req, res) => {
  try {
    const response = await getQuesFromDb()
    res.send({ status: 0, message: "get Succesful", result: response })
  } catch (error) {
    res.send({ status: -1, message: "Something went wrong", result: error })
  }
}

module.exports = { validateInsertData, getDataFromServices, getQuesFromServices }