const bcrypt = require('bcryptjs');

const { User, Farmer, Factory, sequelize } = require('../models');

const { generateToken } = require('../utils/jwt');

const AppError = require( '../utils/app-error');

exports.registerFarmer = async (data) => {

  const transaction = await sequelize.transaction();

  try {

    const existingUser = await User.findOne({
      where: {
        phone: data.phone,
      },
    });

    if (existingUser) {
      throw new AppError('Phone already exists', 400);
    }


    const existingFarmerNID = await Farmer.findOne({
      where: {
        national_id: data.national_id,
      },
    });

    if (existingFarmerNID) {
      throw new AppError('National ID already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create(
      {
        name: data.name,
        phone: data.phone,
        password: hashedPassword,
        role: 'farmer',
      },
      { transaction }
    );

    const farmer = await Farmer.create(
      {
        user_id: user.id,

        national_id: data.national_id,
        national_id_image: data.national_id_image,

        birthdate: data.birthdate,

        land_size: data.land_size,
        land_type: data.land_type,
        crops_type: data.crops_type,

        harvest_location: data.harvest_location,

        proof_image: data.proof_image,

        address_governrate: data.address_governrate,
        address_city: data.address_city,
        address_village: data.address_village,
        address_street: data.address_street,
      },
      { transaction }
    );

    await transaction.commit();

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    return {
      token,

      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },

      farmer,
    };

  } catch (error) {

    await transaction.rollback();

    throw error;
  }

};

exports.registerFactory = async (data) => {

  const transaction = await sequelize.transaction();

  try {

    const existingUser = await User.findOne({
      where: {
        phone: data.phone,
      },
    });

    if (existingUser) {
      throw new AppError('Phone already exists', 400);
    }

    const existingFactory = await Factory.findOne({
      where: {
        email: data.email,
      },
    });

    if (existingFactory) {
      throw new AppError('Factory email already exists', 400);
    }

    const existingRegistrationNumber = await Factory.findOne({
      where: {
        industrial_registration_number:
          data.industrial_registration_number,
      },
    });

    if (existingRegistrationNumber) {
      throw new AppError(
        'Industrial registration number already exists',
        400
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create(
      {
        name: data.name,
        phone: data.phone,
        password: hashedPassword,
        role: 'factory',
      },
      { transaction }
    );

    const factory = await Factory.create(
      {
        user_id: user.id,

        email: data.email,

        factory_owner_name: data.factory_owner_name,

        address_governrate: data.address_governrate,
        address_city: data.address_city,
        address_village: data.address_village,
        address_street: data.address_street,

        industrial_registration_number:
          data.industrial_registration_number,

        industry_type: data.industry_type,

        factory_image: data.factory_image,
      },
      { transaction }
    );

    await transaction.commit();

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    return {
      token,

      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },

      factory,
    };

  } catch (error) {

    await transaction.rollback();

    throw error;
  }

};
exports.login = async (data) => {

  const user = await User.findOne({
    where: {
      phone: data.phone,
    },
  });

  if (!user) {
    throw new AppError('Invalid phone or password', 400);
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError('Invalid phone or password', 400);
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return {

    token,

    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      role: user.role,
    },

  };

};
