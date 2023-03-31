const { calculateAndInsertData, getDataFromDb, getQuesFromDb } = require('../services/userServices')
// Validate Users Data
const validateInsertData = async (request, response) => {
  const user = request.body
  const { name, email, mobile} = user
  const backendValidation={regmobile : /^[0-9]+$/,regemail : /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|co|in)$/}
  try {
  switch (true) {
    case name.length < 3:
      response.send({ status: -1, message: "Name is too short"})
      break
    case name.length > 30:
      response.send({ status: -1, message: "Name is too large"})
      break
    case ! backendValidation.regemail.test(email):
      response.send({ status: -1, message: "Give a valid email"})
      break
    case mobile.length != 10 || ! backendValidation.regmobile.test(mobile):
      response.send({ status: -1, message: "Give Valid Mobile Number"})
      break
    default:
      const results = await calculateAndInsertData(user)
      response.send({ status: 0, message: "Request Successful", result: results })
      break
  }

}
  catch (error) {
    response.send({ status: -1, message: "Something went wrong", result: error })
  }
}
// Getting User Data for Graph
const getDataFromServices = async (request, response) => {
  try {
    const results = await getDataFromDb(request.query)
    response.send({ status: 0, message: "get Succesful", result: results })
  } catch (error) {
    response.send({ status: -1, message: "Something went wrong", result: error })
  }
}
// Getting all questions
const getQuesFromServices = async (request, response) => {
  try {
    const results = await getQuesFromDb()
    response.send({ status: 0, message: "get Succesful", result: results})
  } catch (error) {
    response.send({ status: -1, message: "Something went wrong", result: error })
  }
}

module.exports = { validateInsertData, getDataFromServices, getQuesFromServices }