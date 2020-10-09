const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema({
    name: { type: String, required: true },
    description: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true },
  }, { timestamps: true, } 
  );
    
 
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  overrideMethods: 'all', // ghi đè toàn bộ method
  deletedAt: true, // thêm khoảng thời gian bản ghi bị xóa  
});

module.exports = mongoose.model('Course', Course);