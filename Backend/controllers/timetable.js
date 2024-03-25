import Timetable from "../models/Timetable.js";
import Enrollement from "../models/Enrollement.js";


/*export const createTimetable = async (req, res, next) => {
  const newTimetable = new Timetable(req.body);

  try {
    const savedTimetable = await newTimetable.save();
    res.status(200).json(savedTimetable);
  } catch (err) {
    next(err);
  }
};*/
export const createTimetable = async (req, res, next) => {
    const enrollementId = req.params.enrollementid;
    const newTimetable = new Timetable(req.body);
  
    try {
      const savedTimetable = await newTimetable.save();
      try {
        await Enrollement.findByIdAndUpdate(enrollementId, {
          $push: { timetable: savedTimetable._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedTimetable);
    } catch (err) {
      next(err);
    }
  };
  
export const updateTimetable = async (req, res, next) => {
  try {
    const updatedTimetable = await Timetable.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTimetable);
  } catch (err) {
    next(err);
  }
};
/*export const deleteTimetable = async (req, res, next) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.status(200).json("Timetable has been deleted.");
  } catch (err) {
    next(err);
  }
};*/
export const deleteTimetable = async (req, res, next) => {
    const timetableId = req.params.enrollementid;
    try {
      await Timetable.findByIdAndDelete(req.params.id);
      try {
        await Enrollement.findByIdAndUpdate(timetableId, {
          $pull: { timetable: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  };
export const getTimetable = async (req, res, next) => {
  try {
    const timetable = await Timetable.findById(req.params.id);
    res.status(200).json(timetable);
  } catch (err) {
    next(err);
  }
};
export const getTimetables = async (req, res, next) => {
    try {
        const timetable = await Timetable.find()
        res.status(200).json(timetable);
      } catch (err) {
          res.status(500).json(err);
      }
};