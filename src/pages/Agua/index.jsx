import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import NavListDrawer from "../../components/NavListDrawer";
import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Drawer, Grid, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import jsPDF from 'jspdf'
import SweetAlert2 from "react-sweetalert2";
import R from '../../assets/images/R.jpeg';
import r from '../../assets/images/r.png';
import agua from '../../assets/images/agua.jpg';
import Search from "../../components/Search";
import { fetchAgua } from "../../services";
import Swal from "sweetalert2";
import { useSearch } from "../../context/SearchContext";

const Agua = () => {  
 
    const { search, handleSearch  } = useSearch();
    const [user, setUser] = useState(null);


    useEffect(() => {
        const handleSearchApi = async () => {
          try {
            // Realiza la llamada a tu API utilizando el valor de "search"
             const userResponse = await fetchAgua(search);
            setUser(userResponse);
          } catch (error) {
            console.log("Error al buscar y obtener datos de la API:", error);
          }
        };
    
        // Llama a handleSearchApi cuando el valor de "search" cambie
        if (search) {
          handleSearchApi();
        }
      }, [search, handleSearch]); // Añade handleSearch como dependencia

    const downloadPDF = (item) => {
        const pdf = new jsPDF();

        // Add image to pdf
        pdf.addImage(R, 'JPEG', 10, 10, 100, 40);

        // set font style
        pdf.setFont('helvetica', 'normal')

        // Add text to pdf
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 255);
        pdf.text(`Recibo de Deuda de Impuesto Predial`, 10, 60)
        
        pdf.setFontSize(12);
        pdf.setTextColor(0);
        pdf.text(`Estado: ${item.estado_deuda}UDA`, 10, 80);
        pdf.text(`Monto Total: S/.${item.cargo}`, 10, 9,0);
        // Add more data fields as needed
        pdf.save(`recibo_${item.key_deuda}.pdf`);

    };

    return (
        <>
        
            <Container>
                <div style={{ textAlign: "center"}}>
                    <Typography 
                    variant="h4"
                    component="body"
                    align="center"
                    sx={{m:5, color:'blue', fontWeight:'bold'}}>Recibos de Agua Potable</Typography>
                </div>

                <Grid container m={5}>
                
                    {user && 
                        user.map(item => (
                        <Grid item key={item.key_deuda} xs={12} sm={4} md={3}>
                            <Card
                                sx={{
                                    transition: "0.2s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                    width: 200,
                                    m: 5
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    alt="MDM Rentas"
                                    height="140"
                                    image={agua}
                                />
                                <CardContent>
                               <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <Typography variant="body2" color="#e93108">
                                       Estado en {item.estado_deuda}UDA
                                    </Typography>
                               </div>
                               <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <Typography variant="body2" color="text.secondary">
                                       Total 
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        S/.{item.cargo}
                                    </Typography>
                               </div>
                               <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <Typography variant="body2" color="text.secondary">
                                       N° Periodo 
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.num_periodo}
                                    </Typography>
                               </div>
                                    
                                </CardContent>
                                <CardActions sx={{ display: "flex" }}>
                                    <Button variant="contained" onClick={() => downloadPDF(item)}>Descargar</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )) 
                
                }
                </Grid>
            </Container>
        </>
    );
}


export default Agua;
