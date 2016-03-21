var router = require('express').Router();
var db = require('mongodb').MongoClient.connect('mongodb://localhost/test');
var Q = require('q');   
router.get('/',function(req,res,next){
    if(req.session && !!req.session.user && !!req.session.user.username){
        res.json({
            username:req.session.user.username
        });
    }
    else res.json({});
});


router.post('/',function(req,res,next){
    var user = req.body;
        console.log(user);
    //check username and password
    if(!user || !user.username || !user.password){
        res.status(400).json({msg:'username or password is needed'});
        return;
    }

    db.then(function(db){
        //check user exsits and valid
        return db.collection('users').find(user).toArray();
    }).then(function(users){
        console.log(users);
        if(!users || users.length==0){
            return {msg:"user and pass not mattched"};
        }
    
        var deferred = Q.defer();
        req.session.user = users[0];
        req.session.save(function(err){
            if(err) deferred.reject(err);
            else deferred.resolve({username:user.username});
        
        });  
        return deferred.promise;
    }).then(function(info){
        res.json(info);
    }).catch(function(err){
        console.log('login',err);
        next(err);  
    });    
});


router.delete('/',function(req,res,next){
    req.session.destroy(function(err){
        if(err)next(err)
        else res.json({});
    });
});
module.exports = router;
