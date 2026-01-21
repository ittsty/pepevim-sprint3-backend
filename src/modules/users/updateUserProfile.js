import { normalize } from "../../utils/validate.js";
import { validateUpdateProfile } from "../../utils/validate.js";
import User from "./users.model.js";

export const updateUserProfile = async (req, res) => {
  try {
    const userIdFromToken = req.user.userId;
    const userIdFromParam = req.params.id;

    // 🔐 ป้องกันแก้ของคนอื่น
    if (userIdFromToken !== userIdFromParam) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // ✅ validate
    const errorMessage = validateUpdateProfile(req.body);
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    // ✅ whitelist fields
    const updates = {};

    if (req.body.first_name) {
      updates.first_name = normalize(req.body.first_name);
    }

    if (req.body.last_name) {
      updates.last_name = normalize(req.body.last_name);
    }

    // ❌ ห้ามแก้ email / role / password
    const updatedUser = await User.findByIdAndUpdate(
      userIdFromParam,
      updates,
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully 🎉",
      user: {
        id: updatedUser._id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Update Profile error 🍄" });
  }
};
