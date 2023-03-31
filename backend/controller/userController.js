const { insertDataServices, getDataServices, getQuesServices } = require('../services/userServices')
// Validate Users Data
const insertDataController = async (req, res) => {
  const user = req.body
  const name = user.name
  const email = user.email
  const mobile = user.mobile
  const obj = user.obj
  const regmobile = /^[0-9]+$/
  const regemail = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|co|in)$/

  if (name.length >= 3 &&
    name.length <= 30 &&
    mobile.length == 10 &&
    regmobile.test(mobile) &&
    obj != null && regemail.test(email)) {
    try {
      const response = await insertDataServices(user)
      res.send({ status: 0, message: "Request Successful", result: response })
    } catch (error) {
      res.send({ status: -1, message: "Something went wrong", result: error })
    }
  } else {
    res.send({ status: -1, message: "Something is not good" })
  }
}
// Getting User Data for Graph
const getDataController = async (req, res) => {
  try {
    const response = await getDataServices(req.query)
    res.send({ status: 0, message: "get Succesful", result: response })
  } catch (error) {
    res.send({ status: -1, message: "Something went wrong", result: error })
  }
}
// Getting all questions
const getQuesController = async (req, res) => {
  try {
    const response = await getQuesServices()
    res.send({ status: 0, message: "get Succesful", result: response })
  } catch (error) {
    res.send({ status: -1, message: "Something went wrong", result: error })
  }
}

module.exports = { insertDataController, getDataController, getQuesController }