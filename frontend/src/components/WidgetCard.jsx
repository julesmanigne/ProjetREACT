import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import "../App.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

function WidgetCard() {
  function createSlide() {
    return (
      <SwiperSlide>
        <img src={imgUrl()} class="imageCaroussel" />
      </SwiperSlide>
    );
  }

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function imgUrl() {
    const id = rand(1, 200);
    return `https://picsum.photos/id/${id}/1920/1080`;
  }

  return (
    <Card
      sx={{
        height: "100%",
        
        borderRadius: "25px",
        backgroundColor: "#EDF6F9",
        fontFamily: "Ubuntu",
      }}
    >
      <CardMedia />
      <CardContent>
        <div className="centerCard"></div>
        <ListItemText
          style={{ display: "flex", justifyContent: "center" }}
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
        <div>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {createSlide()}
            {createSlide()}
            {createSlide()}
            {createSlide()}
            {createSlide()}
            {createSlide()}
            {createSlide()}
            {createSlide()}
            {createSlide()}
            {createSlide()}
            {createSlide()}
            {createSlide()}
            {createSlide()}
          </Swiper>
        </div>
      </CardContent>
    </Card>
  );
}
export default WidgetCard;
