// ExpenseController.js

const DailyRecords = require("../models/DailyRecords");
const Expense = require("../models/Expense");

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const dailyRecord = await DailyRecords.findById(req.body.dailyRecordId);
    if (!dailyRecord) {
      return res.status(404).json({ message: "Daily record not found" });
    }

    const { dailyRecordId, name, platform, payment, price, amount } = req.body;
    const expense = new Expense({
      dailyRecordId,
      name,
      platform,
      payment,
      price,
      amount,
    });

    const savedExpense = await expense.save();
    const expenseId = savedExpense._id;
    dailyRecord.expenseIds.push(expenseId);
    await dailyRecord.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("dailyRecordId");
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate(
      "dailyRecordId"
    );
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get six month total expenses
exports.getMonthlyExpenses = async (req, res) => {
  try {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    // Ambil total expenses per bulan dari 6 bulan terakhir
    const monthlyTotals = await Expense.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }, // Hanya ambil pengeluaran sejak 6 bulan yang lalu
        },
      },
      {
        $group: {
          _id: {
            month: { $month: { date: "$createdAt", timezone: "Asia/Jakarta" } },
            year: { $year: { date: "$createdAt", timezone: "Asia/Jakarta" } },
          },
          totalExpense: { $sum: { $multiply: ["$price", "$amount"] } }, // Hitung total pengeluaran per bulan
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }, // Urutkan berdasarkan bulan dan tahun
      },
    ]);

    // Dapatkan array 6 bulan terakhir
    const totals = [];
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(monthDate);

      // Temukan total untuk bulan tersebut
      const monthTotal = monthlyTotals.find(
        (month) =>
          month._id.month === monthDate.getMonth() + 1 &&
          month._id.year === monthDate.getFullYear()
      );

      totals.push(monthTotal ? monthTotal.totalExpense : 0);
    }

    res.status(200).json({ totals, months });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update an expense by ID
exports.updateExpense = async (req, res) => {
  try {
    const { dailyRecordId, name, platform, payment, price, amount } = req.body;
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { dailyRecordId, name, platform, payment, price, amount },
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    await DailyRecords.findByIdAndUpdate(expense.dailyRecordId, {
      $pull: { expenseIds: expense._id },
    });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payment distribution
// exports.getPaymentDistribution = async (req, res) => {
//   try {
//     // Get the current date and calculate six months back
//     const currentDate = new Date();
//     const sixMonthsAgo = new Date();
//     sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

//     // Fetch expenses from the last six months
//     const expenses = await Expense.find({
//       createdAt: { $gte: sixMonthsAgo, $lte: currentDate },
//     });

//     // Initialize total amounts for each payment method
//     const paymentMethods = {
//       Cash: 0,
//       BCA: 0,
//       Gopay: 0,
//       ShopeePay: 0,
//       OVO: 0,
//       Dana: 0,
//       Lainnya: 0,
//     };

//     // Calculate total expenses for each payment method
//     let totalExpenses = 0; // This will hold the overall total amount spent

//     expenses.forEach((expense) => {
//       const amountSpent = expense.price * expense.amount; // Total cost for this expense
//       totalExpenses += amountSpent; // Add to total expenses

//       // Add to the corresponding payment method total
//       switch (expense.payment) {
//         case "Cash":
//           paymentMethods.Cash += amountSpent;
//           break;
//         case "BCA":
//           paymentMethods.BCA += amountSpent;
//           break;
//         case "Gopay":
//           paymentMethods.Gopay += amountSpent;
//           break;
//         case "ShopeePay":
//           paymentMethods.ShopeePay += amountSpent;
//           break;
//         case "OVO":
//           paymentMethods.OVO += amountSpent;
//           break;
//         case "Dana":
//           paymentMethods.Dana += amountSpent;
//           break;
//         default:
//           paymentMethods.Lainnya += amountSpent;
//           break;
//       }
//     });

//     // Calculate the percentage for each payment method based on total expenses
//     const paymentDistribution = Object.keys(paymentMethods).map((method) => {
//       const percentage = totalExpenses > 0 
//         ? ((paymentMethods[method] / totalExpenses) * 100).toFixed(2) 
//         : 0; // Prevent division by zero
//       return { label: method, value: parseFloat(percentage) };
//     });

//     res.status(200).json(paymentDistribution);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


exports.getPaymentDistribution = async (req, res) => {
  try {
    // Get the current date and calculate six months back
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    // Fetch expenses from the last six months
    const expenses = await Expense.find({
      createdAt: { $gte: sixMonthsAgo, $lte: currentDate },
    });

    // Initialize total amounts for each payment method
    const paymentMethods = {
      Cash: 0,
      BCA: 0,
      Gopay: 0,
      ShopeePay: 0,
      OVO: 0,
      Dana: 0,
      Lainnya: 0,
    };

    // Calculate total expenses for each payment method
    expenses.forEach((expense) => {
      const amountSpent = expense.price * expense.amount; // Total cost for this expense

      // Add to the corresponding payment method total
      switch (expense.payment) {
        case "Cash":
          paymentMethods.Cash += amountSpent;
          break;
        case "BCA":
          paymentMethods.BCA += amountSpent;
          break;
        case "Gopay":
          paymentMethods.Gopay += amountSpent;
          break;
        case "ShopeePay":
          paymentMethods.ShopeePay += amountSpent;
          break;
        case "OVO":
          paymentMethods.OVO += amountSpent;
          break;
        case "Dana":
          paymentMethods.Dana += amountSpent;
          break;
        default:
          paymentMethods.Lainnya += amountSpent;
          break;
      }
    });

    // Prepare the response with total expense amounts for each payment method
    const paymentDistribution = Object.keys(paymentMethods).map((method) => {
      return { label: method, value: paymentMethods[method] }; // Return total expense for each method
    });

    res.status(200).json(paymentDistribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


