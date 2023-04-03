const { insertData, getData, getQues } = require('../repositorie/userDataBase')

const  submitFormData  = async (user) => {
  try {
    const result= await insertData(user)
    return result
  }
  catch (error) {
    throw error
  }
}
// Getting user data and calculating Score
const getDataFromDb = async (user) => {
  let result
  try {
    result = await getData(user)
    if (typeof (result) != 'object') {
      throw "Something went wrong"
    }
    let sum = 0
    let riskLabel
    let dataLength=Object.keys(result[0].USERDATA).length
    let {USERDATA}=result[0]
    for (let i = 1; i <=dataLength ; i++) {
      sum = sum + USERDATA[i].score
    }
    switch (true) {
      case sum == 0 && sum <= 10:
        riskLabel = "Conservative"
        break
      case sum >= 11 && sum <= 20:
        riskLabel = "Moderate Conservative"
        break
      case sum >= 21 && sum <= 30:
        riskLabel = "Moderate"
        break
      case sum >= 31 && sum <= 40:
        riskLabel = "Moderate Aggressive"
        break
      default:
        riskLabel = "Aggressive"
        break
    }
    return { sum, riskLabel }
  }
  catch (error) {
    throw error
  }
}

const getQuesFromDb = async () => {
  try {
     const result=await getQues()
     return result
  }
  catch (error) {
    throw error
  }
}

module.exports = { submitFormData , getDataFromDb, getQuesFromDb }