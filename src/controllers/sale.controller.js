const service = require('../services/sale.service');
const asyncHandler = require('../middlewares/async-handler.middleware');

exports.createSale = asyncHandler(async (req, res) => {
    const result = await service.createSale(req.body);

    res.status(201).json({
      success: true,
      data: result
    });

});

exports.getSales = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await service.getSales(page, limit);

  res.json({
    success: true,
    total: result.count,
    page,
    data: result.rows
  });
});

exports.getFactorySales = asyncHandler(async (req, res) => {
  const result = await service.getFactorySales(req.user.id);

  res.json({
    success: true,
    data: result
  });
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const result = await service.updateStatus(
    req.params.id,
    req.body.status
  );

  res.json({
    success: true,
    data: result
  });
});