import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

export default function WidgetAlarm() {
  return (
    <>
      <Card sx={{ height: "100%" }}>
        <CardMedia />
        <CardContent></CardContent>
        <CardActions>
          <Button size="small">Get Alarms</Button>
        </CardActions>
      </Card>
    </>
  );
}
