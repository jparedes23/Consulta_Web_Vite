import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory
import { postUser } from '../../services';
import Swal from 'sweetalert2';

const Register = () => {

    const navigate = useNavigate()

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (event) =>{
        setNombre(event.target.value)
    }

    const handleLastName = (event) =>{
        setApellido(event.target.value)
    }

    const handleEmailChange = (event) =>{
        setCorreo(event.target.value)
    }

    const handlepasswordChange = (event) =>{
        setPassword(event.target.value)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        const tipoUsuario = "CLIENTE"
        
        const newUser = {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            password: password,
            tipoUsuario:tipoUsuario,
        }
        
        
        try {
            const response = await postUser(newUser)
       
            if (response.content &&
                response.content.correo &&
                response.content.correo.length === 1 &&
                response.content.correo[0] === 'usuario model with this correo already exists.') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Registrar el usuario',
                    text: 'El usuario ya Existe.',
                });
            } else{
                navigate('/login')
            }
        } catch (error) {
            console.log("Error al Registrar el usuario", error)
           
        }
    }


    return (
        <Container maxWidth="xs"sx={{ marginTop: "40px"}} >
            <Paper elevation={5} sx={{ padding: "20px", background: blue[50]}}>
                <Typography variant='h4' align='center' sx={{marginBottom: "20px"}}>
                    Registro
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                    label="Nombre"
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    value={nombre}
                    onChange={handleNameChange}
                    sx={{ marginBottom: "10px"}}
                    />
                     <TextField
                    label="Apellidos"
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    value={apellido}
                    onChange={handleLastName}
                    sx={{ marginBottom: "10px"}}
                    />
                     <TextField
                    label="Correo"
                    fullWidth
                    margin='dense'
                    variant='outlined'
                    value={correo}
                    onChange={handleEmailChange}
                    sx={{ marginBottom: "10px"}}
                    />

                    <TextField
                     label="Contrasena"
                     fullWidth
                     type='password'
                     margin='dense'
                     variant='outlined'
                     value={password}
                     onChange={handlepasswordChange}
                     sx={{ marginBottom: "20px"}}
                    />
                    <Button variant='contained' color='primary' fullWidth type='submit'>
                        Registrarse
                    </Button>
                </form>
                <Typography variant='body2' sx={{ marginTop: "10px", textAlign: "center"}}>
                    Ya tengo una Cuenta <Link to="/login">Iniciar Sesion</Link>
                </Typography>

            </Paper>
        </Container>
        
    );
}

export default Register;
