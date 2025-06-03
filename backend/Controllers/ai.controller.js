import { reviewCode } from "../utils/gemini.config.js";

export async function review(req, res) {
  const { code } = req.body;
  try {
    if (!code) {
      return res
        .status(400)
        .json({ success: false, msg: "Code is required to review." });
    }
    const result = await reviewCode(code);
    if (!result) {
      return res.status(500).json({ success: false, msg: "Gemini Error" });
    }
    return res.status(200).json({ success: true, review: result.text });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
}
