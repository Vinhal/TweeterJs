const Tweet = require('../models/Tweet');

module.exports = {
  async index(req, resp) {
    const tweets = await Tweet.find({}).sort('-createdAt');
    return resp.json(tweets);
  },
  async store(req, resp) {
    const tweet = await Tweet.create(req.body);

    req.io.emit('tweet', tweet)

    return resp.json(tweet);
  },
  async delete(req, resp) {
    const tweet = await Tweet.deleteOne({ '_id': req.params.id });
    return resp.json(tweet);
  },

  async deleteAll(req, resp) {
    const tweet = await Tweet.remove({});
    return resp.json(tweet);
  },
};