import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { RootState } from "./reducers";
import { AppDispatch } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
