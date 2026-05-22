const {
  FactoryRequest,
} = require('../models');
const AppError = require( '../utils/app-error');
exports.createFactoryRequest =
  async (data) => {

    const request =
      await FactoryRequest.create({

        factory_id: data.factory_id,

        category: data.category,

        quantity: data.quantity,

        quantity_gauge:
          data.quantity_gauge,

        max_price: data.max_price,

        status: 'open',

      });

    return request;

};



exports.getMyRequests = async (
  factoryId
) => {

  const requests =
    await FactoryRequest.findAll({

      where: {
        factory_id: factoryId,
      },

      order: [
        ['created_at', 'DESC']
      ],

    });

  return requests;

};


exports.updateFactoryRequest =
  async (
    requestId,
    factoryId,
    data
  ) => {

    const request =
      await FactoryRequest.findOne({

        where: {
          id: requestId,
          factory_id: factoryId,
        },

      });

    if (!request) {
      throw new AppError(
        'Factory request not found',
        404
      );
    }

    if (request.status !== 'open') {

      throw new AppError(
        'Only open requests can be updated',
        400
      );

    }

    await request.update(data);

    return request;

};


exports.cancelFactoryRequest =
  async (
    requestId,
    factoryId
  ) => {

    const request =
      await FactoryRequest.findOne({

        where: {
          id: requestId,
          factory_id: factoryId,
        },

      });

    if (!request) {
      throw new AppError(
        'Factory request not found',
        404
      );
    }

     if (request.status !== 'open') {

      throw new AppError(
        'Only open requests can be cancelled',
        400
      );
    }

    request.status = 'cancelled';

    await request.save();

    return request;

};