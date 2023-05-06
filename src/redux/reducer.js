import { createSlice } from "@reduxjs/toolkit"
import { CHANGE_AMOUNT, CHANGE_DIFFICULTY, CHANGE_SCORE, CHANGE_TYPE, CHANGE_CATEGORY } from "./actionsTypes";

const initialState = {
    value: {
    question_category: "",
    question_difficulty: "",
    question_type: "",
    amount_of_questions: 50,
    score: 0
    }
}

const questionSlice = createSlice({
    name: "question",
    initialState: initialState,
    reducers: {
        update: (state, action) => {
                //console.log(action.type)
                //console.log(action.payload.type)
                //console.log(action.payload.value.amount_of_questions)
                switch (action.payload.type) {
                    case CHANGE_CATEGORY:
                        state.value.question_category = action.payload.value.question_category
                        break;
                    case CHANGE_AMOUNT:
                        state.value.amount_of_questions = action.payload.value.amount_of_questions
                        break;
                    case CHANGE_DIFFICULTY:
                        state.value.question_difficulty = action.payload.value.question_difficulty
                        break;
                    case CHANGE_SCORE:
                        state.value.score = action.payload.value.score
                        break;
                    case CHANGE_TYPE:
                        state.value.question_type = action.payload.value.question_type
                        break;
                    default:
                        return
                }
            }
        }
    }
)

export const { update } = questionSlice.actions;
export default questionSlice.reducer;