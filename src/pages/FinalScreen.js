import { useSelector } from "react-redux";

const FinalScreen = () => {
  // State related things
  const{
    score,
    amount_of_questions
  } = useSelector((state) => state.question.value);
  return (
    <div>
      <h1> Your final score is {score}/{amount_of_questions}</h1>
    </div>
  );
}

export default FinalScreen