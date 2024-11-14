import './AddNoteCard.css'; 
import CheckBoxIcon from '@mui/icons-material/CheckBox'; 
import BrushIcon from '@mui/icons-material/Brush'; 
import ImageIcon from '@mui/icons-material/Image'; 
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd'; 
import PaletteIcon from '@mui/icons-material/Palette'; 
import ArchiveIcon from '@mui/icons-material/Archive'; 
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import UndoIcon from '@mui/icons-material/Undo'; 
import RedoIcon from '@mui/icons-material/Redo';
import React, { useState } from "react";
import { addNoteApi } from "../../utils/Apis";  

const AddNoteCard = ({ handleNotesList }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ffffff"); 

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setTitle(""); 
    setDescription("");
    handleAddNote();
    
  };


   


  const handleAddNote = async () => {
    if (title && description) {
      const payload = { title, description, color };
      
        const response = await addNoteApi(payload);
        if (response) {       
         // handleNotesList({ id: 110, title: response.title, description: response.description, quantity: 13 }, "add"); 
          // add response data not static data
          console.log("Note added successfully:", response);
        }   
     else {
      console.log("Title and description are required.");
    }
  }
  };

  return (
    <div>
      {!isExpanded ? (
        <div className="collapsed-note" onClick={handleInputClick}>
          <input
            type="text"
            placeholder="Take a note..."
            className="collapsed-input"
            value=""
            readOnly
          />
          <div className="collapsed-icons">
            <CheckBoxIcon className="icon" />
            <BrushIcon className="icon" />
            <ImageIcon className="icon" />
          </div>
        </div>
      ) : (
        <div className="expanded-note">
          <input
            type="text"
            placeholder="Title"
            className="note-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
          <textarea
            placeholder="Take a note..."
            className="note-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
          />
          <div className="note-footer">
            <div className="icons">
              <NotificationsNoneIcon className="icon" />
              <PersonAddIcon className="icon" />
              <PaletteIcon className="icon"  />
              <ImageIcon className="icon" />
              <ArchiveIcon className="icon" />
              <MoreVertIcon className="icon" />
              <UndoIcon className="icon" />
              <RedoIcon className="icon" />
            </div>
            <button className="close-btn" onClick={handleClose}>Close</button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNoteCard;
