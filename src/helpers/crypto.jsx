import CryptoJS from "crypto-js";

const keySize = 256;
const ivSize = 128;
const iterations = 100;
const passPhrase =
  "b8f4e27bc3c5bcba4f5d7aa20bfce90c88692342d50a26f1685e025f81ab6e8a";

const generateKey = (secretPassphrase, salt) => {
  return CryptoJS.PBKDF2(secretPassphrase, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  });
};

const encryptData = (data, secretPassphrase = passPhrase) => {
  try {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const iv = CryptoJS.lib.WordArray.random(ivSize / 8);
    const key = generateKey(secretPassphrase, salt);

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const encryptedString =
      salt.toString(CryptoJS.enc.Hex) +
      iv.toString(CryptoJS.enc.Hex) +
      encrypted.toString();
    return encryptedString;
  } catch (e) {
    return null;
  }
};

const decryptData = (ciphertext, secretPassphrase = passPhrase) => {
  try {
    const salt = CryptoJS.enc.Hex.parse(ciphertext.substr(0, 32));
    const iv = CryptoJS.enc.Hex.parse(ciphertext.substr(32, 32));
    const encrypted = ciphertext.substring(64);
    const key = generateKey(secretPassphrase, salt);

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedText);
  } catch (e) {
    return null;
  }
};

const aesDecryptAzure = (data) => {
  const passPhrase = CryptoJS.enc.Utf8.parse(
    "a8824ece4363287787af4242c6da108f8df63f5856834a58d44896c3e96a1add"
  );
  const iv = CryptoJS.enc.Utf8.parse(
    "d0acdaf7af03b0af7db2b209d3e7210df81a1f01f6954ffb5b108df4c55e9a4c"
  );

  try {
    const cipher = CryptoJS.AES.decrypt(data, passPhrase, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const cipherText = cipher.toString(CryptoJS.enc.Utf8);
    return cipherText && cipherText !== "" ? cipherText : data;
  } catch (e) {
    return data;
  }
};

export { encryptData, decryptData, aesDecryptAzure };
