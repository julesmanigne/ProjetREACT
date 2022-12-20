import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ListItemText from "@mui/material/ListItemText";
import "../App.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { tokens } from "../theme";
import { useTheme } from "@mui/material";

function WidgetCard() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        boxShadow: 3,
        borderRadius: "10px",
        backgroundColor: colors.primary[600],
        fontFamily: "Poppins",
      }}
    >
      <CardMedia />
      <CardContent>
        <div className="centerCard"></div>
        <ListItemText
          style={{ display: "flex", justifyContent: "center", marginTop: 2 }}
          primary="Memories"
          primaryTypographyProps={{
            color: colors.grey[100],
            fontFamily: "Poppins",
            fontSize: 40,
            fontWeight: 400,
            letterSpacing: 0,
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
