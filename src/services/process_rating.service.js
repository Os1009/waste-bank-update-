const { Op } = require("sequelize");
const { ProcessRating: Rating } = require('../models');
const AppError = require( '../utils/app-error');

exports.createRating=async(data,userId)=>{

const where = {
  user_id: userId,
};

if (data.sale_id) {
  where.sale_id = data.sale_id;
}

if (data.purchase_id) {
  where.purchase_id = data.purchase_id;
}

const exists = await Rating.findOne({ where });

if(exists){

throw new AppError(
'Already rated',
400
);

}

return await Rating.create({

user_id: userId,

purchase_id: data.purchase_id,

sale_id: data.sale_id,

rating: data.rating,

comment: data.comment

});

};