const { api } = require("../config");
const invokeUrl = api.invokeUrl;
const { Auth } = require("aws-amplify");

module.exports = async (url, args) => {
  let session = null;
  if(!args){
    args = {}
  }
  try {
    session = await Auth.currentSession();
    console.log(session)
    console.log(args)
    // args["Authorization"] = session.idToken.jwtToken
  } catch (err) {
    console.error(err);
  }
  return fetch(invokeUrl + url, args);
};
