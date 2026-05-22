const {
  Inventory,
} = require('../models');
const AppError = require( '../utils/app-error');

exports.getInventory =
  async () => {

    const inventory =
      await Inventory.findAll({

        order: [
          ['created_at', 'DESC']
        ],

      });

    return inventory;

};

exports.getInventoryItem =
  async (inventoryId) => {

    const item =
      await Inventory.findByPk(
        inventoryId
      );

    if (!item) {

      throw new AppError(
        'Inventory item not found',
        404
      );

    }

    return item;

};

exports.updateInventory =
  async (
    inventoryId,
    data
  ) => {

    const item =
      await Inventory.findByPk(
        inventoryId
      );

    if (!item) {

      throw new AppError(
        'Inventory item not found',
        404
      );

    }

    await item.update(data);

    return item;

};