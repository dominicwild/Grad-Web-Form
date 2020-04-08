const { api } = require("../config");
const invokeUrl = api.invokeUrl;
const { Auth } = require("aws-amplify");

module.exports = async (url, args) => {
  let session = null;
  try {
    session = await Auth.currentSession();
    console.log(session)
  } catch (err) {
    console.error(err);
  }
  return fetch(invokeUrl + url, args);
};
