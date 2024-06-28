import { boardReducer } from "../slices/boardSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";
import { userReducer } from "../slices/userSlice";

const reducer = {
    logger : loggerReducer,
    boards : boardReducer,
    modal : modalReducer,
    user : userReducer
}

export default reducer;