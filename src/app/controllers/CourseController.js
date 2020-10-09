const Course = require('../models/Course');
const { multiMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');






class CourseController {
    
    // [GET] /course
    index(req, res, next) {

        //promise
        Course.find({})
            .then(courses => res.render('courses', {
                courses: multiMongooseToObject(courses)
            }))
            .catch(next);
    }

    // [GET] /courses/show
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(courses => 
                res.render('courses/show', { courses: mongooseToObject(courses) } )
                )
            .catch(next);
    }
    

    // [GET] courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    
    store(req, res, next) {
        // res.json(req.body);
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
    }

    // [GET] courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(courses => res.render('courses/edit', {
                courses: mongooseToObject(courses)
            }))
            .catch(next)
    }
    
    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne( { _id: req.params.id }, req.body )
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /course/:id
    delete(req, res, next) {
        Course.delete( { _id: req.params.id } )
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /course/:id/restore
    restore(req, res, next) {
        Course.restore( { _id: req.params.id } )
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne( { _id: req.params.id } )
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /courses/actions - store
    actions(req, res, next){
        switch(req.body.action) {
            case 'delete':
                Course.delete({ _id: {$in: req.body.courseIds} }) 
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:    
                res.json({ message: 'Invalid action' });
        }
    }

    // [POST] /courses/actions1 - trash
    actions1(req, res, next){
        switch(req.body.action) {
            case 'restore':
                Course.restore( { _id: {$in: req.body.courseIds} } )
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force-delete':
                Course.deleteMany( { _id: {$in: req.body.courseIds} } )
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:    
                res.json({ message: 'Invalid action' });
        }
    }
    
}

module.exports = new CourseController;