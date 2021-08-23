const getAll = (model) => async (req, res) => {
  try {
    const items = await model.find().lean().exec();
    return res.status(200).json({ items: items });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const getOne = (model) => async (req, res) => {
  try {
    const item = await model.find({ _id: req.params.id }).lean().exec();
    return res.status(200).json({ item: item });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const post = (model) => async (req, res) => {
  try {
    const item = await model.create(req.body);
    return res.status(200).json({ item: item });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const updateOne = (model) => async (req, res) => {
  try {
    const item = await model.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json({ item: item });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

const deleteOne = (model) => async (req, res) => {
  try {
    const item = await model.findByIdAndRemove({ _id: req.params.id });
    return res.status(200).json({ item: item });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

module.exports = (model) => {
	return ({
		getAll: getAll(model),
		getOne: getOne(model),
		post: post(model),
		deleteOne: deleteOne(model),
		updateOne: updateOne(model),
	});
};
