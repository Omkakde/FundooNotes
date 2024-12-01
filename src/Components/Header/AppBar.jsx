import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './AppBar.scss';
import AccountInfo from './../Account/AccountInfo';

function AppBar({toggleDrawer, searchText, handleSearchChange}) {

  function example(){
    toggleDrawer();
  }
  return (
    <header>

    <div className="header">
    
      <div className="drawer-btn" onClick={example}>
        <MenuIcon />
      </div>
      <div className="logo">
        <img
          src="/logo.png"
          style={{ width: "40px", marginRight: "8px" }}
          alt="logo"
        />
      </div>
      <div className="header-text">
        <h6>Keep</h6>
      </div>
      <div className="search-container">
        <SearchIcon className="search-icon"  style={{color:"black"}}/>
        <input type="text"    value={searchText} 
        onChange={handleSearchChange} placeholder="Search..." className="search-input" />
      </div>
      <div className="Appbar-icons">
        <RefreshIcon onClick={() => window.location.reload()} style={{ cursor: "pointer" }} />
        <GridViewIcon />
        <SettingsOutlinedIcon />
      </div>
      <div className="Account-icons">
        <AppsIcon />
        <AccountInfo/>
      </div>
      </div>
    </header>
  );
}

export default AppBar;
