import { Box, Card, CardActionArea, CardActions } from "@mui/material";
import { useState } from "react";
import { EnrollButton } from "./EnrollButton";
import upRightArrow from "../../assets/upRightArrow.svg";
import propTypes from "prop-types";
import { BackCardScheduledCourse } from "./BackCardScheduledCourse";
import { FrontCardScheduledCourse } from "./FrontCardScheduledCourse";
const subsectionCardStyle = {
  padding: "10px 10px 0 10px",
  textAlign: "center",
  maxWidth: "13ch",
};

export function ScheduledCourseCard({title, shortDescription, img, dates, cupo, group}) {
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
          <FrontCardScheduledCourse
            title={title}
            shortDescription={shortDescription}
            img={img}
            subsectionCardStyle={subsectionCardStyle}
            cupo={cupo}
            group={group}
          />
        ) : (
          <BackCardScheduledCourse
            dates={dates}
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
        <EnrollButton isFlipped={isFlipped} />
      </CardActions>
    </Card>
  );
}

ScheduledCourseCard.propTypes = {
  title: propTypes.string.isRequired,
  shortDescription: propTypes.string.isRequired,
  dates: propTypes.array.isRequired,
  img: propTypes.string.isRequired,
}