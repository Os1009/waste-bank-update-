const service =
  require('../services/inventory.service');
  const asyncHandler = require('../middlewares/async-handler.middleware');

exports.getInventory = asyncHandler(async (req, res) => {


      const result =
        await service.getInventory();

      res.status(200).json({
        success: true,
        data: result,
      });

}
);

exports.getInventoryItem = asyncHandler(async (req, res) => {


      const result =
        await service.getInventoryItem(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: result,
      });



}
);

exports.updateInventory = asyncHandler(async (req, res) => {

   

      const result =
        await service.updateInventory(

          req.params.id,

          req.body

        );

      res.status(200).json({
        success: true,
        message:
          'Inventory updated successfully',
        data: result,
      });

}
);