import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(() => ({
    add: {
      position: 'relative',
      bottom: '5%',
      left: '47%',
    },
}));

export default function NewTask(props) {
    const classes = useStyles();
    const [openForm, setOpenForm] = React.useState(false);
    const [file, setFile] = React.useState();
    const [urlImg, setUrlImg] = React.useState();
    const [state, setState] = React.useState("");
    const handleClickOpen = () => {
        setOpenForm(true);
    };
    const handleClose = () => {
        setOpenForm(false);
    };
    const handleChangeState = (event) => {
        setState(event.target.value);
    };

    const addImg = () => {
        let urlimg = file.name
        let td = {description:document.getElementById("desc").value,status:state,fileUrl:"http://localhost:8080/api/files/"+urlimg}
        const formData = new FormData();
        formData.append('file', file);
        fetch('http://localhost:8080/api/files' , {
            mode: 'no-cors', 
            method:'POST',
            body: formData
          }).then(function(response) {
                setOpenForm(false);
                addTodo(td);
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
    }

    const addTodo = (td) => {
        fetch('http://localhost:8080/api/todo' , {
            method:'POST',
            headers:{
                'Content-Type': 'application/json ',
                'Accept': 'application/json'  
              },
            body: JSON.stringify(td)
          }).then(function(response) {
                if(response.ok){
                    response.json().then(function(res) {
                        console.log(res);
                        props.fun(1);
                    })
                }else{
                    console.log('Respuesta de red OK pero respuesta HTTP no OK');
                }
                setOpenForm(false);
            }).catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });
    }

    const handleInputChange =(e) => {
        setFile(e.target.files[0]);     
    }

  return (
    <div>
        <Button 
            className={classes.add}
            color="primary"
            onClick={handleClickOpen}
            startIcon={<AddCircleIcon style={{ fontSize: 70 }}/>}>
        </Button>
        <Dialog open={openForm} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Todo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Complete the data of the new todo.
                </DialogContentText>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="desc"
                    label="Description"
                    variant="outlined"
                    type="text"
                    fullWidth
                />
                <InputLabel id="demo-mutiple-name-label">State</InputLabel>
                <Select
                    required
                    id="stateForm"
                    onChange={handleChangeState}
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
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="date"
                    label="Date"
                    type="date"
                    defaultValue="2020-09-04"
                    fullWidth
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <Input 
                    type="file" 
                    id="file" 
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={addImg} color="primary">
                Add
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}