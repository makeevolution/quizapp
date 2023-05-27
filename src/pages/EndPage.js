import { Button, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useNavigate } from 'react-router-dom'

const EndPage = () => {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();  // Do not let the browser refresh on post
    navigate("/")
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Box mt={3} width="100%">
        <Typography variant="h4" component="h1" gutterBottom> Quiz beëindigd </Typography>
        <Button fullWidth variant="contained" type="submit">
            Terug naar het beginscherm
        </Button>
      </Box>
    </form>
  );
}

export default EndPage