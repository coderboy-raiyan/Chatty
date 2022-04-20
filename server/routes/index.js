const router = require("express").Router();
const data = require("../data/data");

router.use("/chats", async (req, res) => {
  res.send(data);
});

module.exports = router;
