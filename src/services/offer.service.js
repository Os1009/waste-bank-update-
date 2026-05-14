const { Offer, OfferImage, sequelize } = require('../models');

exports.createOffer = async (data) => {

  const transaction = await sequelize.transaction();

  try {

    const offer = await Offer.create({

      farmer_id: data.farmer_id,

      type: data.type,

      quantity: data.quantity,

      quantity_gauge: data.quantity_gauge,

      cultivated_area: data.cultivated_area,

      item_type: data.item_type,

      harvest_date: data.harvest_date,

      price: data.price,

      collection_location: data.collection_location,

      description: data.description,

      status: 'pending',

    }, { transaction });

    if (data.images && data.images.length > 0) {

      const imagesData = data.images.map(imagePath => ({

        offer_id: offer.id,

        image_url: imagePath,

      }));

      await OfferImage.bulkCreate(
        imagesData,
        { transaction }
      );

    }

    await transaction.commit();

    return offer;

  } catch (error) {

    await transaction.rollback();

    throw error;

  }

};

exports.updateOffer = async (
  offerId,
  farmerId,
  data
) => {

  const offer = await Offer.findOne({

    where: {
      id: offerId,
      farmer_id: farmerId,
    },

  });

  if (!offer) {
    throw new Error('Offer not found');
  }

  if (offer.status !== 'pending') {

    throw new Error(
      'Only pending offers can be updated'
    );

  }
  
  await offer.update(data);

  return offer;

};

exports.getMyOffers = async (farmerId) => {

  const offers = await Offer.findAll({

    where: {
      farmer_id: farmerId,
    },

    order: [
      ['created_at', 'DESC']
    ],

  });

  return offers;

};


exports.deleteOffer = async (
  offerId,
  farmerId
) => {

   const offer = await Offer.findOne({

    where: {
      id: offerId,
      farmer_id: farmerId,
    },

  });

  if (!offer) {
    throw new Error('Offer not found');
  }

  if (offer.status !== 'pending') {

    throw new Error(
      'Only pending offers can be deleted'
    );

  }

  await offer.destroy();

};


exports.getOfferById = async (offerId) => {

  const offer = await Offer.findByPk(offerId, {

    include: [
      {
        model: OfferImage,
        as: 'images',
      },
    ],

  });

  if (!offer) {
    throw new Error('Offer not found');
  }

  return offer;

};



exports.getApprovedOffers = async (
  page,
  limit
) => {

  const offset = (page - 1) * limit;

  const { count, rows } =
    await Offer.findAndCountAll({

      where: {
        status: 'approved',
      },

      include: [
        {
          model: OfferImage,
          as: 'images',
        },
      ],

      order: [
        ['created_at', 'DESC']
      ],

      limit,

      offset,

    distinct: true,

    });

  return {

    total: count,

    current_page: page,

    total_pages: Math.ceil(count / limit),

    offers: rows,

  };

};



exports.approveOffer = async (offerId) => {

  const offer = await Offer.findByPk(offerId);

  if (!offer) {
    throw new Error('Offer not found');
  }

  offer.status = 'approved';

  await offer.save();

  return offer;

};



exports.rejectOffer = async (offerId) => {

  const offer = await Offer.findByPk(offerId);

  if (!offer) {
    throw new Error('Offer not found');
  }

  offer.status = 'rejected';

  await offer.save();

  return offer;

};