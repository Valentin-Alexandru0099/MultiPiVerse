import { atomWithStorage } from 'jotai/utils';

const userToken = atomWithStorage("token", null);
const accountUsername = atomWithStorage("username", null);

export { userToken, accountUsername };