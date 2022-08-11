import { atomWithStorage } from 'jotai/utils';

const userToken = atomWithStorage("token", null);

export { userToken };