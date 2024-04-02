require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const openai = new OpenAI(process.env.AI_KEY);
const router = express.Router();

router.post("/create-chat", async (req, res) => {
  try {
    console.log("Making chat.");

    const { prompt } = req.body;
    console.log("Prompt: ", prompt);
    console.log("--------------------");

    // Chat generation
    const chat = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        { "role": "system", "content": "You give nice messages and can hold a conversation." },
        { "role": "user", "content": prompt }
      ],
    });
    console.log("Generated chat: ", chat.choices[0].message.content);
    console.log("--------------------");
    const CHAT = chat.choices[0].message.content;

    res.json({ CHAT });

  } catch (error) {
    console.error("Error from OpenAI:", error);
    res.status(500).send("Could not make a chat :(");
  }
});

module.exports = router;
