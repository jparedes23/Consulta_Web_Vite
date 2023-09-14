import { TextField, IconButton } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import styled from '@mui/system/styled';
import { useSearch } from '../../context/SearchContext';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.action.hover,
  '&:hover': {
    backgroundColor: theme.palette.action.focus,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const Search = () => {

  const {search, handleSearch,setSearch} = useSearch()

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    // Realizar la búsqueda aquí
 
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Realizar la búsqueda aquí cuando se presione "Enter"
      handleSearch(search)
    }
  };


  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        color="primary"
        onClick={handleSearchClick}
        disabled={!search}
        style={{ position: 'absolute', right: 0 }}
      >
        <SearchIcon />
      </IconButton>
    </SearchWrapper>
  );
}

export default Search
  



  
 