
import  Router  from "./routers";
import {SearchProvider} from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (

      <AuthProvider>
        <SearchProvider>
         <Router/>
        </SearchProvider>
      </AuthProvider>

  );
}

export default App;