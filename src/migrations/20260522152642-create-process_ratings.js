'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
queryInterface,
Sequelize
){

await queryInterface.createTable('process_ratings',{

  id:{

    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:true,
  },

user_id:{

type:
Sequelize.UUID,

allowNull:false,

references:{
model:'users',
key:'id'
},

onDelete:'CASCADE'

},

purchase_id:{

type:
Sequelize.UUID,

allowNull:true,

references:{
model:'purchases',
key:'id'
},

onDelete:'CASCADE'

},

sale_id:{

type:
Sequelize.UUID,

allowNull:true,

references:{
model:'sales',
key:'id'
}

},

rating:{

type:
Sequelize.INTEGER,

allowNull:false,

},

comment:{

type:
Sequelize.TEXT,

allowNull:true,

},

created_at:{

type:
Sequelize.DATE,

defaultValue:
Sequelize.NOW

},

updated_at:{

type:
Sequelize.DATE,

defaultValue:
Sequelize.NOW

},

}

);

},

async down(
queryInterface
){

await queryInterface.dropTable(
'process_ratings'
);

}

};


