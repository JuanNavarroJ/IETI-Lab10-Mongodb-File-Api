import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

export default function TaskFilters(props) {
  const [openForm, setOpenForm] = React.useState(false);

  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <div>
        <Button
            variant="contained"
            color="default"
            onClick={handleClickOpen}
            fullWidth
            startIcon={<SearchIcon />}
        >
            <Typography variant="body2">
                Filters
            </Typography>
        </Button>
        <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Task Filter</DialogTitle>
        <DialogContent>
            <DialogContentText>
              Filter the tasks.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="date"
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{
                shrink: true,
                }}
            />
            <TextField
                autoFocus
                margin="dense"
                id="resp"
                label="Responsible"
                variant="outlined"
                type="text"
                fullWidth
            />
            <InputLabel id="demo-mutiple-name-label">State</InputLabel>
            <Select
                id="state"
                labelId="demo-mutiple-name-label"
                margin="dense"
                displayEmpty
                variant="outlined"
                fullWidth
            >
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Ready">Ready</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
            </Select>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Apply
            </Button>
        </DialogActions>
        </Dialog>
    </div>
  );
}