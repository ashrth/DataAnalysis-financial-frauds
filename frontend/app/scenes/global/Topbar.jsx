import { Box,IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import {ColorModecontext, tokens } from "./theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";  
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';//notification icon import
import TranslateIcon from '@mui/icons-material/Translate'; //language icon import
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';// Fixed icon import
import SearchIcon from "@mui/icons-material/Search";  // Fixed icon import

const Topbar = () => {
  const theme = useTheme();   // Use theme from Material-UI
  const colors = tokens(theme.palette.mode);  // Grabs color from the theme.js for dark mode or light mode
  const colorMode = useContext(ColorModecontext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search Bar */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}                         /*represnt the search bar of the dashboard*/
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} /> 
        <iconButton type="button" sx={{ p:1}}>
        <SearchIcon/>
        </iconButton>
      </Box>
      {/*Icons*/}
    <Box display="flex">
    <IconButton onClick ={colorMode.toggleColorMode}>
      {theme.palette.mode==='dark' ?(
        <DarkModeOutlinedIcon/>
        ):<LightModeOutlinedIcon/>
      }
    </IconButton>
    <CircleNotificationsOutlinedIcon/>
    <IconButton>
    <TranslateIcon/>
    </IconButton>
    <IconButton>
    <LibraryBooksOutlinedIcon/>
    </IconButton>
    <IconButton>
    <TranslateIcon/>
    </IconButton>
    
    
    
    
    
    
    
    
    
    
    </Box>
    </Box>
  );
};

export default Topbar;
