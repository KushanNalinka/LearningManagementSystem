import Resource from "../models/Resource.js";


export const createResource = async (req, res, next) => {
  const newResource = new Resource(req.body);

  try {
    const savedResource = await newResource.save();
    res.status(200).json(savedResource);
  } catch (err) {
    next(err);
  }
};
export const updateResource = async (req, res, next) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedResource);
  } catch (err) {
    next(err);
  }
};
export const deleteResource = async (req, res, next) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.status(200).json("Resource has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    res.status(200).json(resource);
  } catch (err) {
    next(err);
  }
};
export const getResources = async (req, res, next) => {
  ///const { resourceName, type } = req.query;
  const{type} =req.query;
    try {
   /*   const query = {};

    if (resourceName) {
      query.resourcename = { $regex: new RegExp( resourcename, 'i') } // Exact match using regex;
    }

    if (type) {
      query.type = { $regex: new RegExp(type, 'i') };
    }*/
    
       // const resources = await Resource.find(query)
       const resources = await Resource.find({ type: { $regex: new RegExp(type, 'i') } })
        res.status(200).json(resources);
      } catch (err) {
          res.status(500).json(err);
      }
};

export const updateResourceAvailability = async (req, res, next) => {
  try {
    const resourceId = req.params.resourceid;
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const existingDates = resource.resourceNumbers.find(num => num._id === resourceId)?.unuvailableDates || [];

    // Check for duplicates efficiently using a Set
    const uniqueDatesToUpdate = new Set(req.body.dates.filter(date => !existingDates.includes(date)));

    if (uniqueDatesToUpdate.size === 0) {
      return res.status(200).json({ message: "All dates are already unavailable" });
    }

    const updatedResource = await Resource.findOneAndUpdate(
      { "_id": req.params.id, "resourceNumbers._id": resourceId },
      { $addToSet: { "resourceNumbers.$.unuvailableDates": { $each: [...uniqueDatesToUpdate] } } },
      { new: true }
    );
    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({ message: "Resource unavailable dates have been updated.", resource: updatedResource });
  } catch (err) {
    next(err);
  }
};


/*export const updateResourceAvailability = async(req,res,next)=>{
  try{
    const resourceId = req.params.resourceid;
    const resource = await Resource.findByIdAndUpdate(req.params.id,{ $set: req.body },
      { new: true });
    try {
      await Resource.updateOne(
        { "resourceNumbers._id": resourceId },
        {
          $push: {
            "resourceNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json({ message: "Resource unvailable dates have been updated.", resource });
    } catch (err) {
      next(err);
    }
  }
  catch(err){
    next(err);
  }
}L*/
/*export const updateResourceAvailability = async (req, res, next) => {
  try {
    const resourceId = req.params.resourceid;
    const resource1 = await Resource.findById(req.params.id);
    
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!resource1) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const existingDates = resource1.resourceNumbers.find(num => num._id == resourceId)?.unuvailableDates || [];

    // Check if any of the dates in the request are already in the existing unavailableDates array
    const duplicates = req.body.dates.filter(date => existingDates.includes(date));
    if (duplicates.length > 0) {
      return res.status(400).json({ message: "Some of the dates are already unavailable", duplicates });
    }

    // Assuming "resourceNumbers" is an array of objects
    const updatedResource = await Resource.findOneAndUpdate(
      { "_id": req.params.id, "resourceNumbers._id": resourceId },
      { $push: { "resourceNumbers.$.unuvailableDates": req.body.dates } },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({ message: "Resource unavailable dates have been updated.", resource: updatedResource });
  } catch (err) {
    next(err);
  }
};
*/
/*export const updateResourceAvailability = async (req, res, next) => {
  try {
    const resourceId = req.params.resourceid;
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    const existingDates = resource.resourceNumbers.find(num => num._id == resourceId)?.unuvailableDates || [];

    // Check if any of the dates in the request are already in the existing unavailableDates array
    const duplicates = req.body.dates.filter(date => existingDates.includes(date));
    if (duplicates.length > 0) {
      return res.status(400).json({ message: "Some of the dates are already unavailable", duplicates });
    }

    const updatedResource = await Resource.findOneAndUpdate(
      { "_id": req.params.id, "resourceNumbers._id": resourceId },
      { $push: { "resourceNumbers.$.unuvailableDates": { $each: req.body.dates } } },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({ message: "Resource unavailable dates have been updated.", resource: updatedResource });
  } catch (err) {
    next(err);
  }
};*/


