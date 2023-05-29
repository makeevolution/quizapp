import { Button, CircularProgress, Typography } from "@mui/material"
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

const StartPage = () => {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();  // Do not let the browser refresh on post
    navigate("/questions")
  }

  const handleAddQuestion = e => {
    e.preventDefault();  // Do not let the browser refresh on post
    navigate("/addquestion")
  }
  
  // more info on how spacing works https://mui.com/material-ui/react-grid2/
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Button fullWidth variant="contained" type="submit">
            Aan de slag
          </Button>
        </Grid>
        <Grid item xs>
          <Button fullWidth variant="contained" type="button" onClick={handleAddQuestion} >
            Nieuwe vraag toevoegen
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default StartPage