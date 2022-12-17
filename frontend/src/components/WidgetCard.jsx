import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import Image1 from '../images/1.jpg';
import Image2 from '../images/2.jpg';
import Image3 from '../images/3.jpg';


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
    <Card sx={{ height: "100%", borderRadius: "25px" }}>
      <CardMedia />
      <CardContent>
        <div className="photo-album-widget">
          <img src={photos[currentPhoto].src} class="imageCaroussel" alt={photos[currentPhoto].caption} />
        </div>
      </CardContent>
      <CardActions>
        <Button onClick={handlePrevClick}>Prev</Button>
        <Button onClick={handleNextClick}>Next</Button>
      </CardActions>
    </Card>
  );
}
export default WidgetCard;