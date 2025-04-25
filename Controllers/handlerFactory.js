// handlerFactory.js

exports.getOne = (Model) => async (req, res) => {
  const doc = await Model.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: doc,
  });
};

exports.getAll = (Model) => async (req, res) => {
  const doc = await Model.find();
  res.status(200).json({
    status: 'success',
    data: doc,
  });
};

exports.update = (Model) => async (req, res) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: doc,
  });
};

exports.delete = (Model) => async (req, res) => {
  await Model.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Deleted Successfully',
  });
};
