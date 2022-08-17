import { atomWithStorage } from 'jotai/utils';

const userToken = atomWithStorage("token", null);
const accountUsername = atomWithStorage("username", null);
const accountDetails = atomWithStorage("details", null);

const accountAvatar = atomWithStorage("avatar", null);
export { userToken, accountUsername, accountDetails, accountAvatar };