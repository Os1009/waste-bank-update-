const service =
  require('../services/factory-request.service');

exports.createFactoryRequest =
  async (req, res) => {

    try {

      const result =
        await service.createFactoryRequest({

          ...req.body,

          factory_id: req.user.id,

        });

      res.status(201).json({
        success: true,
        message:
          'Factory request created successfully',
        data: result,
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }

};



exports.getMyRequests = async (req, res) => {

  try {

    const result =
      await service.getMyRequests(
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



exports.updateFactoryRequest =
  async (req, res) => {

    try {

      const result =
        await service.updateFactoryRequest(

          req.params.id,

          req.user.id,

          req.body

        );

      res.status(200).json({
        success: true,
        message:
          'Factory request updated successfully',
        data: result,
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }

};


exports.cancelFactoryRequest =
  async (req, res) => {

    try {

      const result =
        await service.cancelFactoryRequest(

          req.params.id,

          req.user.id

        );

      res.status(200).json({
        success: true,
        message:
          'Factory request cancelled successfully',
        data: result,
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }

};