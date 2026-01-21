import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      default: "Main Dashboard",
    },
    
    // ข้อมูลสำหรับกราฟเส้นหรือกราฟแท่ง (Monthly Sales)
    salesChart: {
      data: [
        {
          month: { type: String, required: true },
          clothes: { type: Number, default: 0 },
          cosmetics: { type: Number, default: 0 },
        },
      ],
      config: {
        clothes: {
          label: { type: String, default: "Clothes" },
          color: { type: String, default: "#A71B79" },
        },
        cosmetics: {
          label: { type: String, default: "Cosmetics" },
          color: { type: String, default: "#E0C013" },
        },
      },
    },

    // ข้อมูลสำหรับกราฟโดนัท (Collections)
    collectionsChart: {
      data: [
        {
          browser: { type: String, required: true },
          collections: { type: Number, required: true },
          fill: { type: String },
        },
      ],
      config: {

        type: Map,
        of: new mongoose.Schema({
          label: String,
          color: String,
        }, { _id: false }),
        default: {
          collections: { label: "Collections" }
        }
      },
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Dashboard = mongoose.model("Dashboard", dashboardSchema);