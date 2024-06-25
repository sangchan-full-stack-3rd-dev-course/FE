import { RootState } from "../store/index.ts";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>;