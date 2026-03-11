const crypto = require("crypto");
const { getSecretFromDB } = require("./mockDb");

const generateToken = async (email) => {
  try {
    const secret = await getSecretFromDB();

    if (!secret) {
      throw new Error("Could not retrieve secret from database");
    }

    return crypto
      .createHmac("sha256", secret)
      .update(email)
      .digest("base64url");
  } catch (error) {
    console.error("Token generation failed:", error.message);

    throw new Error("Internal Server Error: Unable to generate token");
  }
};

module.exports = { generateToken };
