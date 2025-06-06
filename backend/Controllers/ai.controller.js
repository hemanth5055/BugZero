import { User } from "../Models/user.model.js";
import { reviewCode } from "../utils/gemini.config.js";

export async function review(req, res) {
  const { code } = req.body;
  const user = req.user;

  try {
    if (!code) {
      return res
        .status(400)
        .json({ success: false, msg: "Code is required to review." });
    }

    if (user.credits <= 0) {
      return res
        .status(400)
        .json({ success: false, msg: "Oops! you are out of credits." });
    }

    const result = await reviewCode(code);
    if (!result) {
      return res.status(500).json({ success: false, msg: "Gemini Error" });
    }

    await User.updateOne(
      { _id: user._id },
      { $inc: { credits: -1 } } // Correct MongoDB update
    );

    return res
      .status(200)
      .json({ success: true, review: result.text, credits: user.credits - 1 });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
}
