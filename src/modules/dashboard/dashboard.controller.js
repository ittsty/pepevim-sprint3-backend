import { Order } from "../order/order.model.js"; // ตรวจสอบ path ให้ถูกต้อง
import * as mockup from "../../mock-db/dashboard.js";

/**
 * @desc    ดึงข้อมูล Dashboard ให้สอดคล้องกับ DashBoardView.jsx และข้อมูลจริงใน MongoDB
 * @route   GET /api/v1/dashboard
 */
export const getDashboardSummary = async (req, res) => {
  try {
    // 1. ตรวจสอบจำนวนออเดอร์ที่มีสถานะชำระเงินแล้ว
    const orderCount = await Order.countDocuments({ 
      status: { $in: ["paid", "shipped", "completed"] } 
    });

    // หากไม่มีข้อมูลเลย ให้ส่ง Mockup กลับไป
    if (orderCount === 0) {
      return res.status(200).json({
        success: true,
        source: "mockup",
        data: {
          salesChart: { data: mockup.chartData, config: mockup.chartConfig },
          collectionsChart: { data: mockup.chartData2, config: mockup.chartConfig2 }
        }
      });
    }

    // 2. ประมวลผลข้อมูลยอดขายรายเดือน (Sales Chart)
    const salesStats = await Order.aggregate([
      { $match: { status: { $in: ["paid", "shipped", "completed"] } } },
      { $unwind: "$items" },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          clothes: {
            $sum: {
              $cond: [
                { $regexMatch: { input: { $ifNull: ["$items.productName", ""] }, regex: /shirt|pants|dress|suit/i } },
                { $multiply: ["$items.price", "$items.quantity"] },
                0
              ]
            }
          },
          cosmetics: {
            $sum: {
              $cond: [
                { $regexMatch: { input: { $ifNull: ["$items.productName", ""] }, regex: /cream|lipstick|perfume|soap/i } },
                { $multiply: ["$items.price", "$items.quantity"] },
                0
              ]
            }
          }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // 3. ประมวลผลข้อมูลสินค้าขายดี (Collections Chart)
    const collectionStats = await Order.aggregate([
      { $match: { status: { $in: ["paid", "shipped", "completed"] } } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productName",
          collections: { $sum: "$items.quantity" }
        }
      },
      { $sort: { collections: -1 } },
      { $limit: 7 }
    ]);

    // --- Format ข้อมูลให้ตรงกับ DashBoardView.jsx ---
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const finalSalesData = salesStats.map(item => {
      const [year, month] = item._id.split("-");
      return {
        month: monthNames[parseInt(month) - 1],
        clothes: Math.round(item.clothes),
        cosmetics: Math.round(item.cosmetics)
      };
    });

    const finalCollectionsData = collectionStats.map((item, index) => ({
      browser: item._id.toLowerCase().replace(/\s+/g, '-'),
      collections: item.collections,
      fill: `var(--color-chart-${(index % 5) + 1})`
    }));

    const finalCollectionsConfig = { collections: { label: "Collections" } };
    collectionStats.forEach((item, index) => {
      const key = item._id.toLowerCase().replace(/\s+/g, '-');
      finalCollectionsConfig[key] = {
        label: item._id,
        color: `hsl(var(--chart-${(index % 5) + 1}))`
      };
    });

    // 4. ส่ง Response กลับ (รวม summary ไปด้วยหากคุณต้องการเก็บไว้ดู)
    res.status(200).json({
      success: true,
      source: "database",
      data: {
        // ข้อมูลหลักที่ DashBoardView.jsx ต้องการ
        salesChart: {
          data: finalSalesData,
          config: mockup.chartConfig
        },
        collectionsChart: {
          data: finalCollectionsData,
          config: finalCollectionsConfig
        },
        // แถมข้อมูล summary ที่คุณเพิ่งตรวจสอบพบมาให้ด้วย
        summary: {
          totalRevenue: finalSalesData.reduce((acc, curr) => acc + curr.clothes + curr.cosmetics, 0),
          totalOrders: orderCount
        }
      }
    });

  } catch (error) {
    console.error("Dashboard Controller Error:", error);
    res.status(200).json({
      success: true,
      source: "error-fallback",
      data: {
        salesChart: { data: mockup.chartData, config: mockup.chartConfig },
        collectionsChart: { data: mockup.chartData2, config: mockup.chartConfig2 }
      }
    });
  }
};