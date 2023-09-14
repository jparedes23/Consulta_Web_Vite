import { AuthContext } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";
import { isAuth } from "../../services";
import DraftsIcon from "@mui/icons-material/Drafts";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import { NavLink } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "../../components/NavListDrawer";
import { useContext, useEffect, useState } from "react";
import Search from "../../components/Search";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const navLinkArrays = [
  {
    tittle: "login",
    path: "/login",
    icon: <InboxIcon />,
  },
  {
    tittle: "Impuesto",
    path: "/impuesto",
    icon: <DraftsIcon />,
  },
  {
    tittle: "Register",
    path: "/register",
    icon: <EmojiEmotionsIcon />,
  },
  {
    tittle: "Agua",
    path: "/agua",
    icon: <EmojiEmotionsIcon />,
  },
];

function stringToColor(str) {
  let hash = 0;
  let i;

  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}


function stringAvatar(name) {
  if (!name || typeof name !== "string") {
    // Si name es null, undefined o no es una cadena, maneja este caso aquí
    return {
      sx: {
        bgcolor: "#000000", // Color de respaldo predeterminado
      },
      children: "", // Iniciales vacías
    };
  }

  const nameParts = name.split(" ");
  if (nameParts.length < 2) {
    // Si name no tiene al menos un espacio para dividir en nombre y apellido
    return {
      sx: {
        bgcolor: "#31BDE7", // Color de respaldo predeterminado
      },
      children: "", // Iniciales vacías
    };
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${nameParts[0][0]}${nameParts[1][0]}`,
  };
}

const MainLayout = () => {
  const { authentication, setAuthentication, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);




   // Recupera los datos del usuario del almacenamiento persistente al cargar el componente
   useEffect(()=>{
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData){
        const userData = (JSON.parse(storedUserData))
        // Actualiza el contexto de autenticación con los datos del usuario almacenados
        setAuthentication({
            ...authentication,
            isAuthenticated: true,
            user: userData
        })
    }
},[])

const handleMenuOpen =()=>{
  setOpen(true)
}

const hanldeMenuClose = () =>{
  setOpen(false)
}  


  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleMenuOpen}
            onMouseEnter={handleMenuOpen}
            color="inherit"
            size="large"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Avatar {...stringAvatar(`${authentication.user.nombre} ${authentication.user.apellido}`)}></Avatar>
          </Typography>

           {/* Coloca el componente Search aquí */}

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLinkArrays.map((item) => (
              <Button
              color="inherit"
              key={item.tittle}
              component={NavLink}
              to={item.path}
              >
                {item.tittle}
              </Button>
            ))}
          </Box>
          <Search/>
          <IconButton
          style={{ color: 'white'}}
          onClick={logout}
          >

          <ExitToAppIcon/>
          </IconButton>

        
        </Toolbar>
      </AppBar>
      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer
          navLinkArrays={navLinkArrays}
          NavLink={NavLink}
          setOpen={setOpen}
        />
      </Drawer>

      {/* Search button*/}

      {/* end Search */}
      <Typography variant="h6" component="div">
        Bienvenido, {authentication.user.nombre} {authentication.user.apellido}
      </Typography>
      <Divider sx={{ mt: 5 }} />
      {/* Muestra el componente Impuesto */}

      <Outlet />
    </div>
  );
};

export default MainLayout;
