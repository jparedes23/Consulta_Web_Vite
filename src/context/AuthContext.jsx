import { createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = (props) => {
  // La palabra children hace referencia a los components hijo
  // y este children viaja por props
  const { children } = props;

     
  const [authentication, setAuthentication] = useState({
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
    user: {
      id: null,
      nombre: "",
      apellido: "",
      correo: "",
      tipoUsuario: "",
    },
  });


  function logout(){
    localStorage.clear();
    window.location.href = "/login";
  }
	

  return (
    <AuthContext.Provider
      value={{        
        authentication,
        setAuthentication,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};