import { configureStore } from "@reduxjs/toolkit"
import questionReducer from "./reducer"

export default configureStore({
    reducer: {
        question: questionReducer
    }
})