const { api } = require("../config");
const invokeUrl = api.invokeUrl;
const { Auth } = require("aws-amplify");

export default async (url, args) => {
  if (api.type === "aws") {
    let session = null;
    if (!args) {
      args = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    try {
      session = await Auth.currentSession();
      console.log(session);
      args["headers"]["Authorization"] = session.idToken.jwtToken
      // args = {
      //   method: "get",
      //   headers: {
      //     Authorization: session.idToken.jwtToken,
      //   },
      // };
      console.log(args);
      console.log(invokeUrl + url);
    } catch (err) {
      console.error(err);
    }
    return fetch(invokeUrl + url, args);
  } else if (api.type === "local") {
    return fetch(url, args);
  }
};
