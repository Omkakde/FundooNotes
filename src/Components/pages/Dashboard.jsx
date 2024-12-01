import "./Dashboard.scss";
import AppBar from './../Header/AppBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); 

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

 
  const handleMouseEnter = () => {
    setDrawerOpen(true);
  };

  
  const handleMouseLeave = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="dashboard-main-cnt">
      <AppBar toggleDrawer={toggleDrawer}  searchText={search} handleSearchChange={handleSearchChange}  sx={{ zIndex: 2 }} />
      <div className="siderBar">
        <div
          className={`drawer-icon-cnt ${drawerOpen ? 'open' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="drawer-icon-item" onClick={() => navigate('notes')}>
            <div className="drawer-icon">
              <LightbulbOutlinedIcon />
            </div>
            {drawerOpen && <div className="drawer-icon-text">Notes</div>}
          </div>

          <div className="drawer-icon-item">
            <div className="drawer-icon">
              <NotificationsOutlinedIcon />
            </div>
            {drawerOpen && <div className="drawer-icon-text">Notifications</div>}
          </div>

          <div className="drawer-icon-item">
            <div className="drawer-icon">
              <ModeEditOutlinedIcon />
            </div>
            {drawerOpen && <div className="drawer-icon-text">Edit</div>}
          </div>

          <div className="drawer-icon-item" onClick={() => navigate('Archive')}>
            <div className="drawer-icon">
              <ArchiveOutlinedIcon />
            </div>
            {drawerOpen && <div className="drawer-icon-text">Archive</div>}
          </div>

          <div className="drawer-icon-item" onClick={() => navigate('Trash')}>
            <div className="drawer-icon">
              <DeleteOutlineOutlinedIcon />
            </div>
            {drawerOpen && <div className="drawer-icon-text">Trash</div>}
          </div>
        </div>

        <div className="dashboard-outlet-cnt">
          <Outlet context={{ search }}  />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
