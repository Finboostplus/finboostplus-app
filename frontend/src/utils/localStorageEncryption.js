import SLS from 'secure-ls';
const encryptionSecret = import.meta.env.VITE_SECURE_LS_ENCRYPTION_KEY;
export const SecureLS = new SLS({
  encodingType: 'aes',
  isCompression: true,
  encryptionSecret,
});
