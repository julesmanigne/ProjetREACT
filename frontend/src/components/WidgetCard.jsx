import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Image1 from '../images/1.jpg';
import Image2 from '../images/2.jpg';
import Image3 from '../images/3.jpg';
import { Grid } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "../App.css";

function WidgetCard() {
  const [photos, setPhotos] = useState([
    { src: Image1, caption: 'Photo 1' },
    { src: Image2, caption: 'Photo 2' },
    { src: Image3, caption: 'Photo 3' },
  ]);

  const [currentPhoto, setCurrentPhoto] = useState(0);

  function handlePrevClick() {
    setCurrentPhoto((currentPhoto - 1 + photos.length) % photos.length);
  }

  function handleNextClick() {
    setCurrentPhoto((currentPhoto + 1) % photos.length);
  }

  return (
    <Card sx={{ height: "100%", borderRadius: "25px", backgroundColor: "#EDF6F9", fontFamily: "Ubuntu", }}>
      <CardMedia />
      <CardContent>
        <ListItemText
          style={{ display: 'flex', justifyContent: 'center' }}
          primary="Memories"
          primaryTypographyProps={{
            fontFamily: "Ubuntu",
            fontSize: 40,
            fontWeight: 400,
            letterSpacing: 4,
          }}
        >
          {" "}
        </ListItemText>
        <div className="photo-album-widget">
          <img src={photos[currentPhoto].src} class="imageCaroussel" alt={photos[currentPhoto].caption} />
        </div>
        <div class="center">
          <button className="buttonPhoto" onClick={handlePrevClick}><ArrowBackIosIcon></ArrowBackIosIcon></button>
          <button className="buttonPhoto" onClick={handleNextClick}><ArrowForwardIosIcon></ArrowForwardIosIcon></button>
        </div >
      </CardContent>
    </Card >
  );
}
export default WidgetCard;