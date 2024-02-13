const Calculation = require("../models/Calculation");

exports.addNumbers = async (req, res) => {
  try {
    const { num1, num2 } = req.body;

    if (!num1 || !num2) {
      return res.json({ error: "Both numbers are required" });
    }

    if (num1 === num2) {
      return res.json({ error: "Numbers cannot be the same" });
    }

    const parsedNum1 = parseFloat(num1);
    const parsedNum2 = parseFloat(num2);

    if (isNaN(parsedNum1) || isNaN(parsedNum2)) {
      return res.json({ error: "Invalid numbers provided" });
    }

    const result = parsedNum1 + parsedNum2;

    const calculation = new Calculation({
      num1: parsedNum1,
      num2: parsedNum2,
      result,
    });

    await calculation.save();

    const previousCalculations = await Calculation.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("-_id num1 num2 result ");

    res.json({ result, previousCalculations });
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};
