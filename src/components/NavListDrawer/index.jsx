import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box
  } from "@mui/material";

  const NavListDrawer = ({navLinkArrays, NavLink, setOpen})=>{

    return(
      <Box sx={{width:250}}>
        <nav>
          <List>
            {
              navLinkArrays.map(item =>(
                  <ListItem
                  disablePadding
                  key={item.tittle}>
                    <ListItemButton
                    component={NavLink}
                    to={item.path}
                    onClick={()=>setOpen(false)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemIcon>{item.tittle}</ListItemIcon>
                    </ListItemButton>
                  </ListItem>
              ))
            }
          </List>
        </nav>
      </Box>
    )

  }

  export default NavListDrawer

  



  
 