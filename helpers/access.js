const axios = require("axios");
const key = process.env.PET_FINDER_API_KEY;
const secret = process.env.PET_FINDER_SECRET_KEY;

const getAccess = async () => {
  const { data } = await axios({
    method: "post",
    url: "https://api.petfinder.com/v2/oauth2/token",
    data: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return { access_token: data.access_token, token_type: data.token_type };
};

module.exports = getAccess;
