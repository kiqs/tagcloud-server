'use strict';

import superagent from 'superagent';
import router from './router';

const USER_TOKEN = Buffer.from('kwqe7lS5AxLOyPpNQL5wc3sUc:k54WHc0PChYQJ8OH4evs8ptIFM0vdAf3Uuo3uz85QBsokbtY2d').toString('base64');
let ACCESS_TOKEN = null;

router.get('/auth', async(ctx, next) => {
  try {
    const res = await superagent.post('https://api.twitter.com/oauth2/token')
      .set('Authorization', 'Basic '.concat(USER_TOKEN))
      .set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
      .query({ 'grant_type': 'client_credentials' })
      .withCredentials();

    let results = JSON.parse(res.text);
    ACCESS_TOKEN = results.access_token;
    ctx.body = ACCESS_TOKEN;
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.get('/tweets', async(ctx, next) => {
  try {
    const tags_res = await superagent.get('https://api.twitter.com/1.1/search/tweets.json')
      .set('Authorization', 'Bearer '.concat(ACCESS_TOKEN))
      .query({ 'q': ctx.query.query })
      .query({ 'count': 10 })
      .withCredentials();

    ctx.body = JSON.parse(tags_res.text);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

router.get('/hashtags', async(ctx, next) => {
  try {
    const tags_res = await superagent.get('https://twitter.com/i/search/typeahead.json')
      .query({ 'filters': true })
      .query({ 'q': '#'.concat(ctx.query.query) })
      .query({ 'count': 10 })
      .query({ 'result_type': 'hashtags' })
      .query({ 'src': 'COMPOSE' })
      .withCredentials();

    ctx.body = JSON.parse(tags_res.text);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = err;
  }
});

export default router.routes();
