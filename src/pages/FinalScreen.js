import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FinalScreen = () => {
  // State related things
  const navigate = useNavigate();

  const{
    score,
    amount_of_questions
  } = useSelector((state) => state.question.value);
  
  const handleClickAnswer = () => {
    navigate("/")
  }
  return (
    <div>
      <h1> Your final score is {score}/{amount_of_questions}</h1>
      <Button variant="contained" onClick={handleClickAnswer}> Play again </Button>
    </div>
  );
}

export default FinalScreen