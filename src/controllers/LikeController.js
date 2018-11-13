const Tweet = require('../models/Tweet');

module.exports = {
  async store(req, resp) {
    const tweet = await Tweet.findById(req.params.id);
    tweet.set({ likes: tweet.likes + 1 })
    await tweet.save()

    req.io.emit('like', tweet)

    return resp.json(
      {
        ok: true,
        likes: tweet.likes
      });
  },
};
