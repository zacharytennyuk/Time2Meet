require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const openai = new OpenAI({apiKey: process.env.AI_KEY});
const router = express.Router();

router.post("/create-chat", async (req, res) => {
  try {
    console.log("Making chat.");

    const { prompt } = req.body;
    console.log("Prompt: ", prompt);
    console.log("--------------------");

    // Chat generation
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { "role": "system", "content": "You help the user with events by giving ideas or offering ways to improve or plan events or meetings with friends." },
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
