const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

class UserController{
    index(req, res, next) {
        
    }

    login(req, res, next) {
        res.render('user/login')
    }

    register(req, res, next) {
        res.render('user/register')
    }

    create(req, res, next) {
        var newUser = new User(req.body);
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
        newUser.save(function(err, user) {
          if (err) {
            return res.status(400).send({
              message: err
            });
          } else {
            user.hash_password = undefined;
            return res.json(user);
          }
        });            
    }

    postlogin(req, res, next){
        var email = req.body.email;
        var password = req.body.password;

        // find
        User.findOne({
            'email': email
        }, function(err, user) {
            if (!user) {
                res.json({ error : 'User is not exist'})
            } else if (user &&
                user.comparePassword(password)) {

                var payload = { id: user._id, fullName: user.fullName, email: user.email, bio: user.bio, image: user.image };
                var jwtToken = jwt.sign(payload, 'config.jwtSecret');
                var jsonResponse = {'Bearer': jwtToken}
                res.json({
                    jsonResponse, 
                    payload
                });
                
            } else {
                res.json({ error : 'Login Error'})
                return
            }  
        })
    }

    loginRequired(req, res, next) {
        if (req.user) {
          next();
        } else {
          res.render('user/login');   
        }
      };
 
    isAuthenticated(req, res, next){
        
        if (req.headers &&
            req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer') {
                var jwtToken =  req.headers.authorization.split(' ')[1];
                jwt.verify(jwtToken, 'config.jwtSecret', { expiresIn: '1h' }, function(err, payload) {
                    if(err){
                        //If error send Forbidden (403)
                        console.log('ERROR: Could not connect to the protected route');
                        res.sendStatus(403);
                        return
                    } else {    
                        // //If token is successfully verified, we can send the authorized data 
                        // res.json({
                        //     message: 'Successful log in',
                            
                        // });
                        req.user = payload;
                        res.json(payload)
                        next();
                        console.log('SUCCESS: Connected to protected route');
                        // res.data
                    }
                });
            } 
    }
}

module.exports = new UserController;
