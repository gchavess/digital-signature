const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Funcionarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      cargo: {
        type: Sequelize.STRING,
      },
      senha: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    const senhaUsuariosPadrao = await bcrypt.hash("123", 10);

    await queryInterface.bulkInsert(
      "Funcionarios",
      [
        {
          nome: "Diretor",
          email: "diretor@gmail.com",
          cargo: "Diretor",
          senha: senhaUsuariosPadrao,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Funcionario",
          email: "funcionario@gmail.com",
          cargo: "Funcionario",
          senha: senhaUsuariosPadrao,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Gerente",
          email: "gerente@gmail.com",
          cargo: "Gerente",
          senha: senhaUsuariosPadrao,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Funcionarios");
  },
};
