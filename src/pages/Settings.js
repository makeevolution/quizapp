import SelectField from "../components/SelectField"
import TextFieldComp from "../components/TextFieldComp"
import { Button } from "@mui/material"
import { Box } from "@mui/system";

const Settings = () => {

  const handleSubmit = e => {
    e.preventDefault();  // Do not let the browser refresh on post
  }
  return (
    <form onSubmit={handleSubmit}>
      <SelectField label="Category" />
      <SelectField label="Difficulty" />
      <SelectField label="Type" />
      <TextFieldComp label="No of questions" />
      <Box mt={3} width="100%">
        <Button fullWidth variant="contained" type="submit">
          Get started
        </Button>
      </Box>
    </form>
  );
}

export default Settings