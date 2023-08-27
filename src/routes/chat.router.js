import express from 'express';

const ChatRouter = express.Router();

ChatRouter.get("/", (req, res) => {
  return res.render("chat", {});
});

export default ChatRouter;