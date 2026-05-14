const offerService = require('../services/offer.service');

exports.createOffer = async (req, res) => {

  try {

    const imagePaths = req.files?.map(
      file => file.path
    ) || [];



    const result = await offerService.createOffer({

      ...req.body,

      farmer_id: req.user.id,

      images: imagePaths,

    });

    res.status(201).json({
      success: true,
      message: 'Offer created successfully',
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

exports.updateOffer = async (req, res) => {

  try {

    const result = await offerService.updateOffer(
      req.params.id,
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: 'Offer updated successfully',
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};


exports.getMyOffers = async (req, res) => {

  try {

    const result = await offerService.getMyOffers(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};


exports.deleteOffer = async (req, res) => {

  try {

    await offerService.deleteOffer(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: 'Offer deleted successfully',
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};


exports.getOfferById = async (req, res) => {

  try {

    const result = await offerService.getOfferById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }

};


exports.getApprovedOffers = async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const result =
      await offerService.getApprovedOffers(
        page,
        limit
      );

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};




exports.approveOffer = async (req, res) => {

  try {

    const result =
      await offerService.approveOffer(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: 'Offer approved successfully',
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};


exports.rejectOffer = async (req, res) => {

  try {

    const result =
      await offerService.rejectOffer(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: 'Offer rejected successfully',
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};