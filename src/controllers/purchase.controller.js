const service =
  require('../services/purchase.service');
  const asyncHandler = require('../middlewares/async-handler.middleware');

exports.createPurchase = asyncHandler(async (req, res) => {



      const result =
        await service.createPurchase(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          'Purchase created successfully',
        data: result,
      });

});

exports.getAllPurchases = asyncHandler(async (req, res) => {


      const result =
        await service.getAllPurchases();

      res.status(200).json({
        success: true,
        data: result,
      });

});

exports.getMyPurchases = asyncHandler(async (req, res) => {



      const result =
        await service.getMyPurchases(
          req.user.id
        );

      res.status(200).json({
        success: true,
        data: result,
      });

});

exports.updatePurchaseStatus = asyncHandler(async (req, res) => {

      const result =
        await service.updatePurchaseStatus(

          req.params.id,

          req.body.status

        );

      res.status(200).json({
        success: true,
        message:
          'Purchase status updated successfully',
        data: result,
      });

});