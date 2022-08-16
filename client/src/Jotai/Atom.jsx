import { atomWithStorage } from 'jotai/utils';

const userToken = atomWithStorage("token", null);
const accountUsername = atomWithStorage("username", null);

const accountDetails = atomWithStorage("details", null);

export { userToken, accountUsername, accountDetails };