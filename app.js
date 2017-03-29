var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mvg');
var db = mongoose.connection;

//global constants
const app = express();
const events =require('./models/events.js');
const access_levels =require('./models/system/access_levels.js');
const errors =require('./models/system/error_msgs.js');

//init middle-ware
app.use(express.static(__dirname + '/frontend'));
app.use(bodyParser.urlencoded({extended:true}));

//init route handlers
app.get('/',function(req, res)
{
  res.end('Root request. Use /api/*');
});

app.post('/api/event/add', function(req,res)
{
  addObject(req, res, events);
});

app.get('/api/events',function(req, res)
{
  getAllObjects(req, res, events);
});

app.get('/api/event/:object_id',function(req, res)
{
  getObject(req, res, events);
});
/*
addObject = function(req, res, obj_model)
{
  var obj = req.body;
  var session_id = req.headers.session;
  var session = sessions.search(session_id);

  res.setHeader('Content-Type','text/json');

  //validate obj
  if(!obj_model.isValid(obj))
  {
    errorAndCloseConnection(res, 503, errors.INVALID_DATA);
    return;
  }

  if(obj_model.WRITE_LVL >= access_levels.ALL)
  {
    obj_model.add(obj, function(err)
    {
      if(err)
      {
        errorAndCloseConnection(res, 500, errors.INTERNAL_ERR);
        logServerError(err);
        return;
      }else res.json({'success':'200: Success'});
    });
  }else {
    if(session!=null)
    {
      if(!session.isExpired())
      {
        if(session.access_level>=obj_model.WRITE_LVL)
        {
          obj_model.add(obj, function(err)
          {
            if(err)
            {
              errorAndCloseConnection(res, 500, errors.INTERNAL_ERR);
              logServerError(err);
              return;
            }
            res.json({'success':'200: Success'});
          });
        }else
        {
          errorAndCloseConnection(res, 502, errors.UNAUTH);
        }
      }else {
        errorAndCloseConnection(res, 501, errors.SESSION_EXPIRED);
      }
    }else{
      errorAndCloseConnection(res, 501, errors.SESSION_EXPIRED);
    }
  }
}

updateObject = function(req, res, obj_model)
{
  var obj_id = req.params.object_id;
  var obj = req.body;
  var session_id = req.headers.session;
  var session = sessions.search(session_id);

  res.setHeader('Content-Type','text/json');

  if(isNullOrEmpty(obj_id))
  {
    console.log('Invalid object: ' + obj_id)
    errorAndCloseConnection(res, 503, errors.INVALID_DATA);
    return;
  }
  if(!obj_model.isValid(obj))
  {
    console.log('Invalid object: ' + obj)
    errorAndCloseConnection(res, 503, errors.INVALID_DATA);
    return;
  }

  if(session!=null)
  {
    if(!session.isExpired())
    {
      if(session.access_level>=obj_model.WRITE_LVL)
      {
        obj_model.update(obj_id, obj, function(err)
        {
          if(err)
          {
            errorAndCloseConnection(res, 500, errors.INTERNAL_ERR);
            logServerError(err);
            return;
          }
          res.json({'success':'200: Success'});
        });
      }else {
        errorAndCloseConnection(res, 502, errors.UNAUTH);
      }
    }else {
      errorAndCloseConnection(res, 501, errors.SESSION_EXPIRED);
    }
  }else{
    errorAndCloseConnection(res, 501, errors.SESSION_EXPIRED);
  }
}

getObject = function(req, res, obj_model)
{
  var obj_id = req.params.object_id;
  var session_id = req.headers.session;
  var session = sessions.search(session_id);

  if(isNullOrEmpty(obj_id))
  {
    errorAndCloseConnection(res,503,errors.INVALID_DATA);
    return;
  }

  res.setHeader('Content-Type','text/json');

  if(obj_model.WRITE_LVL >= access_levels.ALL)
  {
    obj_model.get(obj_id, function(err, obj)
    {
      if(err)
      {
        errorAndCloseConnection(res,500,errors.INTERNAL_ERR);
        logServerError(err);
      }
      res.json(obj);
    });
  }else {
    if(session!=null)
    {
      if(!session.isExpired())
      {
        if(session.access_level>=obj_model.WRITE_LVL)
        {
          obj_model.get(obj_id, function(err, obj)
          {
            if(err)
            {
              errorAndCloseConnection(res,500,errors.INTERNAL_ERR);
              logServerError(err);
            }
            res.json(obj);
          });
        }else {
          errorAndCloseConnection(res,502,errors.UNAUTH);
        }
      }else {
        errorAndCloseConnection(res,501,errors.SESSION_EXPIRED);
      }
    }else {
      errorAndCloseConnection(res,501,errors.SESSION_EXPIRED);
    }
  }
}
*/
getAllObjects = function(req, res, obj_model)
{
  var session_id = req.headers.session;
  //var session = sessions.search(session_id);

  res.setHeader('Content-Type','text/json');

  console.log('received GET_ALL request of type: %s', obj_model);
  if(obj_model.READ_LVL >= access_levels.ALL)
  {
    obj_model.getAll(function(err, objs)
    {
      if(err)
      {
        errorAndCloseConnection(res,500,errors.INTERNAL_ERR);
        logServerError(err);
      }
      res.json(objs);
    });
  }else
  {
    /*if(session!=null)
    {
      if(!session.isExpired())
      {
        if(session.access_level>=obj_model.READ_LVL)
        {
          obj_model.getAll(function(err, objs)
          {
            if(err)
            {
              errorAndCloseConnection(res,500,errors.INTERNAL_ERR);
              logServerError(err);
            }
            res.json(objs);
          });
        }else {
          errorAndCloseConnection(res,502,errors.UNAUTH);
        }
      }else {
        errorAndCloseConnection(res,501,errors.SESSION_EXPIRED);
      }
    }else {
      errorAndCloseConnection(res,501,errors.SESSION_EXPIRED);
    }*/
    res.end('not implemented');
  }
}

errorAndCloseConnection = function(res,status,msg)
{
  res.status(status);
  res.setHeader('Connection','close');
  res.json({'error':msg});
}

isNullOrEmpty = function(obj)
{
  if(obj==null)
  {
    return true;
  }
  if(obj.length<=0)
  {
    return true;
  }
  return false;
}

logServerError = function(err)
{
  //TODO: log to file
  console.error(err.stack);
}

/**** user authentication ****/
app.post('/api/auth',function(req, res)
{
  var usr = req.body.usr;
  var pwd = req.body.pwd;

  res.setHeader('Content-Type','text/json');

  //validate input from client
  if(isNullOrEmpty(usr) || isNullOrEmpty(pwd))
  {
    errorAndCloseConnection(res, 404, errors.NOT_FOUND);
    return;
  }

  //check if credentials match the ones in the database
  users.validate(usr, pwd, function(err, user)
  {
    if(err)
    {
      errorAndCloseConnection(res,500,errors.INTERNAL_ERR);
      logServerError(err);
    }
    if(user)
    {
      var session = sessions.newSession(user._id, SESSION_TTL, user.access_level);
      res.setHeader('Session','session=' + session.session_id + ';ttl=' + session.ttl +
                      ';date=' + session.date_issued);
      res.setHeader('Content-Type','text/plain');
      res.send(session.session_id);
    }else{
      errorAndCloseConnection(res,404,errors.NOT_FOUND);
    }
  });
});

app.listen(8080);
console.log('Server running on port 8080....');
