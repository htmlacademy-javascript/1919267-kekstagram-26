const ADDING_PORTION = 5;
const model = {};

const setStartModel = (photo) => {
  model.comments = [...photo.comments];
  model.showedComments = ADDING_PORTION;
  model.commentsTotalNumber = photo.comments.length;
};

const getModel = () => model;

const getShowedComments = () => model.showedComments;

const getCommentsTotalNumber = () => model.commentsTotalNumber;

const setNextPortionComments = () => {
  model.showedComments += ADDING_PORTION;
};

// const getPortionComments = () => [...model.comments.splice(model.showedComments - ADDING_PORTION, model.showedComments)];

const getPortionComments = () => {
  console.log('start -- ', model.showedComments - ADDING_PORTION);
  const arr = [...model.comments.splice(model.showedComments - ADDING_PORTION, model.showedComments)];
  console.log('end -- ', model.showedComments);
  console.log(arr);
  return arr;
};

const photoModel = {
  setStartModel,
  getModel,
  getShowedComments,
  getCommentsTotalNumber,
  setNextPortionComments,
  getPortionComments
};

export {photoModel};
