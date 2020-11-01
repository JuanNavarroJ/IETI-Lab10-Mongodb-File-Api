import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PostAddIcon from '@material-ui/icons/PostAdd';

export default function UserProfile(props) {
  const [openForm, setOpenForm] = React.useState(false);

  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const handleChangeTasks = () => {
    const algo = {name:document.getElementById("nameAct").value,email:document.getElementById("emailAct").value}
    props.fun(algo);
    setOpenForm(false);
  };

  return (
    <div>
        <Button  
          startIcon={<PostAddIcon /> }
          color="primary"
          onClick={handleClickOpen}
        >
        </Button>
        <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Perfil</DialogTitle>
        <DialogContent>
            <DialogContentText>
               Update the information.
            </DialogContentText>
            <TextField
                required
                autoFocus
                margin="dense"
                id="nameAct"
                label="Full Name"
                variant="outlined"
                type="text"
                fullWidth
            />
            <TextField
                required
                autoFocus
                margin="dense"
                id="emailAct"
                label="Email"
                variant="outlined"
                type="text"
                fullWidth
            />
            <TextField
                required
                autoFocus
                margin="dense"
                id="pass"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
            />
            <TextField
                required
                autoFocus
                margin="dense"
                id="pass2"
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
            <Button onClick={handleChangeTasks} color="primary">
            Update
            </Button>
        </DialogActions>
        </Dialog>
    </div>
  );
}