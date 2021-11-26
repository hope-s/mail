import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";



const Banner = () => {
  return (
    <a
      href="https://www.google.com/search?q=lizard"
      className="flex flex-col items-center mt-5"
    >
      <Card className="flex flex-col items-center max-w-400 min-h-auto">
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="680"
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
        </CardActionArea>
      </Card>
    </a>
  );
};

export default Banner;
