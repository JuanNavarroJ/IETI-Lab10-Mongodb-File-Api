import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link ,Redirect,Route} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const log = () => {
    fetch('http://localhost:8080/user/login', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json ',
        'Accept': 'application/json'
      },
      body:JSON.stringify({username:'UserFrontEnd',password:document.getElementById("password").value,email:document.getElementById("email").value})
      }).then(function (response) {
        if(response.ok){
          response.json().then(data => {
            console.log(data)
            localStorage.setItem('token',data.accessToken);
            localStorage.setItem('emailUser',document.getElementById("email").value);
            localStorage.setItem('passUser',document.getElementById("password").value);
            setIsLoggedIn(true);
          })
        }else{
          console.log('Respuesta de red OK pero respuesta HTTP no OK');
          alert("Usuario o contraseña incorrectas.")
          alert("email: juan@mail.com    password: juan")
        }
      }).catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={log}
          >
              Sign In
          </Button>
          {isLoggedIn ?
            <Route>
              <Redirect to='/Dashboard'></Redirect>
            </Route>
            :
            null
          }
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                ¿Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/"variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}