import { askGPT } from "../services/openai.service.js";

export async function chatWithBot(req, res) {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const reply = await askGPT(message);

        res.json({
            reply
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}
