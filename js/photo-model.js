const ADDING_PORTION = 5;
const model = {};

const setStartModel = (photo) => {
  model.comments = [...photo.comments];
  model.lastNumberShowedComment = 0;
  model.showedComments = (photo.comments.length - ADDING_PORTION >= 0) ? ADDING_PORTION : photo.comments.length;
  model.commentsTotalNumber = photo.comments.length;
};

const getModel = () => model;

const getShowedComments = () => model.showedComments;

const getCommentsTotalNumber = () => model.commentsTotalNumber;

const setNextPortionComments = () => {
  if (model.showedComments + ADDING_PORTION < model.commentsTotalNumber) {
    model.lastNumberShowedComment = model.showedComments;
    model.showedComments += ADDING_PORTION;
  } else {
    model.lastNumberShowedComment = model.showedComments;
    model.showedComments = model.commentsTotalNumber;
  }

};

const getPortionComments = () => {
  const newArrayComments = [...model.comments.slice(model.lastNumberShowedComment, model.showedComments)];
  return newArrayComments;
};

const photoModel = {
  setStartModel,
  getModel,
  getShowedComments,
  getCommentsTotalNumber,
  setNextPortionComments,
  getPortionComments
};

export { photoModel };
