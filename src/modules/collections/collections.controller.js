import { Collection } from "./collections.model.js";

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    return res.status(200).json({
      success: true,
      data: collections,
    });
  } catch (error) {
    error.name = error.name || "DatabaseError";
    error.status = 500;
  }
};

export const getCollection = async (req, res) => {
  const { id } = req.params;
  try {
    const collection = await Collection.findById(id);
    return res.status(200).json({
      success: true,
      data: collection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.name,
    });
  }
};

export const createCollection = async (req, res) => {
  try {
    const { collectionName, collectionDesc } = req.body;

    if (!collectionName || !collectionDesc) {
      return res.status(400).json({
        message: "collectionName, collectionDesc are required",
      });
    }

    const newCollection = await Collection.create({
      collectionName,
      collectionDesc,
    });
    return res.status(201).json({
      message: "Collection created successfully",
      data: newCollection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.name,
    });
  }
};

export const editCollection = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updated = await Collection.findByIdAndUpdate(id, body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: "Collection Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: updated.toObject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error!",
    });
  }
};

export const deleteCollection = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Collection.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Collection Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error!",
    });
  }
};
