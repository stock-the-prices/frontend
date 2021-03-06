const express = require('express')
const path = require('path')
const webpack = require('webpack')
const logger = require('../build/lib/logger')
const webpackConfig = require('../build/webpack.config')
const project = require('../project.config')
const compress = require('compression')
const TwitterStreamChannels = require('twitter-stream-channels')
const credentials = require('../twitter-credentials.json')
const client = new TwitterStreamChannels(credentials)
const ObjectID = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
let db;

MongoClient.connect("mongodb://dqianthebest:password@ds131900.mlab.com:31900/heroku_n36xdb93", function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
});

const yahooFinance = require('yahoo-finance');
const app = express()
app.use(compress())
// Create our stocks and their associated keywords to filter
const channels = {
  "google" : ['googl', 'google'],
  "facebook" : ['facebook', 'mark zuckerberg', 'oculus'],
  "apple" : ['apple inc', 'apple', 'tim cook'],
  "test" : ['giuseppe'],
}

const stream = client.streamChannels({track:channels, timeout:50000})

// Handle web sockets
const http = require('http').Server(app)
let io = require('socket.io')(http)


io = io.on('connection', function (socket) {
  console.log('user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  // Stream out information related to google
  stream.on('channels/google',function(tweet){
		//socket.emit('googleTweet', tweet.text);
        socket.emit('googleTweet', tweet);
  });

  // Stream out information related to facebook
  stream.on('channels/facebook',function(tweet){
    //socket.emit('facebookTweet', tweet.text);
    socket.emit('facebookTweet', tweet);
	});

    // Stream out information related to apple
    stream.on('channels/apple',function(tweet){
      //socket.emit('facebookTweet', tweet.text);
      socket.emit('appleTweet', tweet);
  	});

    // Stream out information related to test
    stream.on('channels/test',function(tweet){
      //socket.emit('facebookTweet', tweet.text);
      socket.emit('testTweet', tweet);
    });

    socket.on('getStockInfo', function(stockname) {
//        console.log('getting stock info about ' + stockname);

        yahooFinance.quote({
          symbol: stockname,
          modules: [ 'price' ]
      }, function (err, data) {
              console.log('getting stock info about ' + stockname);
              if (err){
                  return;
              }
              var priceInfo =
                  {
                      company: data.price.longName,
                      regularMarketPrice: data.price.regularMarketPrice,
                      regularMarketTime: data.price.regularMarketTime,
                      exchange: data.price.exchange,
                      currency: data.price.currency,
                      marketChange: data.price.regularMarketChange,
                  }
              socket.emit('stockPriceInfo', priceInfo);
        });
    });

});

// Socket listens on port 3002
http.listen(3002, function (err) {
  if (err) {
    return logger.error(err.message);
  }
});
// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  logger.info('Enabling webpack development and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : path.resolve(project.basePath, project.srcDir),
    hot         : true,
    quiet       : false,
    noInfo      : false,
    lazy        : false,
    stats       : 'normal',
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))


  // get ratings
  app.get('/api/rate', function (req, res ) {
    let stockId = req.query.stockId;

    // retrieve from db
    db
      .collection("stock")
      .findOne({_id: stockId}, function (err,doc) {
        if ( err ) { return res.end() }

        return res.json(doc)
      })
  })

  app.get('/api/articles/:stockId', function(req, res) {
    const stockId = req.params.stockId;
    let objects = [];
    //console.log(stockId);
    db.collection("stock").findOne({ _id: stockId }, { articles: 1 }, function(err, doc) {
      if (err || !doc || !doc.articles) {
        res.end();
        return;
      }
      for (let i = 0; i < doc.articles.length; i++) {
        objects[i] = new ObjectID(doc.articles[i]);
      }
      db.collection("article").find({"_id" : {"$in" : objects}}).toArray(function(err, docs) {
        res.json(docs);
      });
    });

  });

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(path.resolve(project.basePath, 'public')))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  logger.warn(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(path.resolve(project.basePath, project.outDir)))
}




module.exports = app
