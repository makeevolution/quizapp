import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { AnswerContext } from '../contexts/AnswerContext';
import { correct_answer_dialog, incorrect_answer_dialog } from '../constants/AnswersConstants';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({backButtonCallback, forwardButtonCallback}) {
  const [open, setOpen] = React.useState(false);
  const {answerIsCorrect} = React.useContext(AnswerContext);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogContent, setDialogContent] = React.useState("");

  React.useEffect(() => {
    if (answerIsCorrect.current === true) {
      setDialogTitle(correct_answer_dialog.TITLE);
      setDialogContent(correct_answer_dialog.CONTENT);
    } else if (answerIsCorrect.current === false) {
      setDialogTitle(incorrect_answer_dialog.TITLE);
      setDialogContent(incorrect_answer_dialog.CONTENT);
    } // but now if answerIsCorrect.current is null, dialogTitle and dialogContent are not set...
    // somehow need to find out if the user of this PopUp is MAinQuizPage.js. If so then set
    // dialogTitle and dialogContent to the incorrect answer dialog, otherwise set to empty strings
  }, [answerIsCorrect.current]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleBackButtonPress = () => {
    setOpen(false);
    backButtonCallback();
  };
  const handleForwardButtonPress = () => {
    setOpen(false);
    forwardButtonCallback();
  };

  // TODO: make the text of the buttons below conditional on the user of this PopUp 
  // either through props or through context
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Controleer antwoord
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBackButtonPress}>Vorige vraag</Button>
          <Button onClick={handleForwardButtonPress}>Volgende vraag</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
