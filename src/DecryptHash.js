import AES from "crypto-js/aes";
import sha256 from "crypto-js/sha256";

export const dec = (text) => {
  var decrypted = AES.decrypt(text, "1234567891234567");

  return decrypted;
};
