import propTypes from "prop-types";
import { CourseCard } from "../CourseCard/CourseCard";
import ModalContainer from "../ModalContainer";

function CardModal({
  name,
  img,
  lessonHours,
  largeDescription,
  shortDescription,
  useStateModal,
}) {
  return (
    <ModalContainer
      open={useStateModal[0]}
      handleClose={() => useStateModal[1](false)}
      additionalStyles={{
        width: "auto",
        height: "auto",
        padding: "0",
        border: "none",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <CourseCard
        id=''
        title={name}
        img={img}
        lessonHours={lessonHours}
        largeDescription={largeDescription}
        shortDescription={shortDescription}
        isFunctional={false}
      />
    </ModalContainer>
  );
}

CardModal.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  lessonHours: propTypes.number.isRequired,
  largeDescription: propTypes.string.isRequired,
  shortDescription: propTypes.string.isRequired,
  useStateModal: propTypes.array.isRequired,
};

export default CardModal;
