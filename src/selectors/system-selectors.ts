import { IRootState } from "../reducers";

export const selectPassphrase = () => (state: IRootState) => state.system.ph;