const authService = require('../services/auth.service');

exports.registerFarmer = async (req, res) => {

  try {

    const farmerData = {

      ...req.body,

      national_id_image:
        req.files?.national_id_image?.[0]?.path || null,

      proof_image:
        req.files?.proof_image?.[0]?.path || null,

    };

    const result = await authService.registerFarmer(farmerData);

    res.status(201).json({
      success: true,
      message: 'Farmer registered successfully',
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

exports.registerFactory = async (req, res) => {
console.log('Factory registration data:', req.body);
  try {

    const factoryData = {

      ...req.body,

      factory_image:
        req.files?.factory_image?.[0]?.path || null,

    };

    const result = await authService.registerFactory(factoryData);

    res.status(201).json({
      success: true,
      message: 'Factory registered successfully',
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

exports.login = async (req, res) => {

  try {

    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: error.message,
    });

  }

};