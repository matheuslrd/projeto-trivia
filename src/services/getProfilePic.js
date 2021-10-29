import { MD5 } from 'crypto-js';

const getProfilePic = (email) => {
  const hash = MD5(email).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};

export default getProfilePic;
