import Education from '../models/education.model.js';

export const createEducation = async (req, res) => {
  try {
    const education = new Education(req.body);
    const result = await education.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEducations = async (req, res) => {
  try {
    const educations = await Education.find();
    res.json(educations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ error: 'Education not found' });
    res.json(education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!education) return res.status(404).json({ error: 'Education not found' });
    res.json(education);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ error: 'Education not found' });
    res.json({ message: 'Education deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAllEducations = async (req, res) => {
  try {
    await Education.deleteMany();
    res.json({ message: 'All educations deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
