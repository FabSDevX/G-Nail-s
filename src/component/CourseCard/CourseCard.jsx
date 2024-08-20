import { Box, Card, CardActionArea, CardActions } from "@mui/material";
import { useState } from "react";
import { FrontCard } from "./FrontCard";
import { BackCard } from "./BackCard";
import { WishListButton } from "./WishListButton";
import upRightArrow from "../../assets/upRightArrow.svg";
const subsectionCardStyle = {
  padding: "10px 10px 0 10px",
  textAlign: "center",
  maxWidth: "13ch",
  paddingBottom: "100%",
};

export function CourseCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <Card
      sx={{
        maxWidth: "310px",
        borderRadius: "10px",
        perspective: "1000px",
        boxShadow: "none",
        margin: "20px auto",
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
            title={"Uñas acrilicas"}
            shortDescription={
              "Lorem ipsum odor amet, consectetuer adipiscing elit. Arcu vivamus lectus risus habitasse vel tincidunt proin nulla. Proin habitantinceptos aptent accumsan suspendisse pretium"
            }
            lessonHours={4}
            img={"public/contact-background.webp"}
            subsectionCardStyle={subsectionCardStyle}
          />
        ) : (
          <BackCard
            largeDescription={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
            img={"public/contact-background.webp"}
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
        <WishListButton isFlipped={isFlipped} />
      </CardActions>
    </Card>
  );
}
