import { Box, Card, CardActionArea, CardActions } from "@mui/material";
import { useState } from "react";
import { FrontCard } from "./FrontCard";
import { BackCard } from "./BackCard";
import { WishListButton } from "./WishListButton";
import upRightArrow from "../../assets/upRightArrow.svg";
import propTypes from "prop-types";
const subsectionCardStyle = {
  padding: "10px 10px 0 10px",
  textAlign: "center",
  maxWidth: "13ch",
};

export function CourseCard({title, shortDescription, lessonHours, img, largeDescription}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <Card
      sx={{
        width: "310px",
        borderRadius: "10px",
        perspective: "1000px",
        boxShadow: "none",
      }}
    >
      <CardActionArea
        onClick={handleFlip}
        sx={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          height: "430px",
          boxSizing: "border-box",
          padding: "0",
          "&:focus": {
            outline: "none",
          },
        }}
      >
        <Box
          component="img"
          src={upRightArrow}
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
          }}
        />

        {!isFlipped ? (
          <FrontCard
            title={title}
            shortDescription={shortDescription}
            lessonHours={lessonHours}
            img={img}
            subsectionCardStyle={subsectionCardStyle}
          />
        ) : (
          <BackCard
            largeDescription={largeDescription}
            img={img}
          />
        )}
      </CardActionArea>
      <CardActions
        sx={{
          padding: "0",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
        }}
      >
        <WishListButton isFlipped={isFlipped} title={title} lessons={lessonHours} />
      </CardActions>
    </Card>
  );
}

CourseCard.propTypes = {
  title: propTypes.string.isRequired,
  shortDescription: propTypes.string.isRequired,
  largeDescription: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  lessonHours: propTypes.number.isRequired,
}