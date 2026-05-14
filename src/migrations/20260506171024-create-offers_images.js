'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('offers_images', {

      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },

      offer_id: {
        type: Sequelize.UUID,

        allowNull: false,

        references: {
          model: 'offers',
          key: 'id'
        },

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      image_url: {
        type: Sequelize.STRING,
        allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }

    });

  },

  async down(queryInterface) {

    await queryInterface.dropTable('offers_images');

  }

};