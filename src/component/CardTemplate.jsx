import { Box, Card, CardActionArea, CardActions } from "@mui/material";
import { useState } from "react";
import propTypes from "prop-types";
import upRightArrow from "../assets/upRightArrow.svg";
import { FrontCard } from "./CourseCard/FrontCard";
import { BackCard } from "./CourseCard/BackCard";
import { WishListButton } from "./CourseCard/WishListButton";
import { BackCardScheduledCourse } from "./ScheduledCourseCard/BackCardScheduledCourse";
import { FrontCardScheduledCourse } from "./ScheduledCourseCard/FrontCardScheduledCourse";
import { EnrollButton } from "./ScheduledCourseCard/EnrollButton";

const subsectionCardStyle = {
  padding: "10px 10px 0 10px",
  textAlign: "center",
  maxWidth: "13ch",
};

export function CardTemplate({
  id,
  title,
  shortDescription,
  img,
  largeDescription,
  lessonHours,
  type,
  dates,
  cupo,
  group,
}) {
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
          type === 'course' ? (
            <FrontCard
              title={title}
              shortDescription={shortDescription}
              lessonHours={lessonHours}
              img={img}
              subsectionCardStyle={subsectionCardStyle}
            />
          ) : (
            <FrontCardScheduledCourse
              title={title}
              shortDescription={shortDescription}
              img={img}
              subsectionCardStyle={subsectionCardStyle}
              cupo={cupo}
              group={group}
            />
          )
        ) : (
          type === 'course' ? (
            <BackCard
              largeDescription={largeDescription}
              img={img}
            />
          ) : (
            <BackCardScheduledCourse
              dates={dates}
              img={img}
            />
          )
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
        {type === 'course' ? (
          <WishListButton isFlipped={isFlipped} id={id} title={title} lessons={lessonHours} />
        ) : (
          <EnrollButton isFlipped={isFlipped} />
        )}
      </CardActions>
    </Card>
  );
}

CardTemplate.propTypes = {
  id: propTypes.string,
  title: propTypes.string.isRequired,
  shortDescription: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  largeDescription: propTypes.string,
  lessonHours: propTypes.number,
  type: propTypes.oneOf(['course', 'scheduled']).isRequired,
  dates: propTypes.array,
  cupo: propTypes.number,
  group: propTypes.string,
};
