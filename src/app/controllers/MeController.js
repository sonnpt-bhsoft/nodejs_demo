const Course = require('../models/Course');
const { multiMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

const mongoose = require('../../util/mongoose');

class MeController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => // destructuring javascript
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multiMongooseToObject(courses)
            })
            )
            .catch(next)


        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount)
        //     })
        //     .catch(() => {});


        
        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', {
        //         courses: multiMongooseToObject(courses)
        //     }),
        //     )
        //     .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: multiMongooseToObject(courses)
            }))
            .catch(next);
    }

}

module.exports = new MeController;