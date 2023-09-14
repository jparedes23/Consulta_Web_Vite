import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn, getUserData } from "../../services";
import { AuthContext } from "../../context/AuthContext";

import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Grid from "@mui/material/Grid";

import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CheckBox } from "@mui/icons-material";
import Swal from 'sweetalert2';


const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const { authentication, setAuthentication } = useContext(AuthContext);

  const [userCredentials, setUserCredentials] = useState({
    correo: "",
    password: "",
  });

  const handleRemenberMeChange=()=>{
    setRememberMe(!rememberMe)
  }

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn(userCredentials);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.access);
      // Obtener los datos del usuario después de iniciar sesión
      const userResponse = await getUserData(); // Debes implementar esta función

      localStorage.setItem("userData", JSON.stringify(userResponse.data));

      setAuthentication({
        ...authentication,
        isAuthenticated: true,
        successMessage: "Usuario logeado exitosamente",
        user: userResponse.data,
      });
      console.log("isAuthenticated:", authentication.isAuthenticated);
      // Redirige a ImpuestoView solo después de guardar los datos del usuario
      navigate("/impuesto");
    } else {
      Swal.fire({
        icon: "error",
        title:"Error al ingresar" , 
        text:'El Usuario o Contraseña son incorrectas',
      })

      setAuthentication({
        ...authentication,
        isAuthenticated: false,
        isError: true,
        errorMessage: "Credenciales incorrectas",
      });
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="">
            Login
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="correo"
              label="Ingrese su Correo"
              name="correo"
              autoComplete="correo"
              autoFocus
              value={userCredentials.correo}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={userCredentials.password}
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={<CheckBox 
                value="remember" 
                color="primary" 
                
                />
              }
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Link to="/register" variant="body2">
              No tienes una cuenta ? Entonces Registrate Aqui
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
