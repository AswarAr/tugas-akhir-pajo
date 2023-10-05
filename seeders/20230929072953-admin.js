const bcrypt = require('bcrypt')
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('Admins', [
        {
        Nama_Admin: 'admin',
        Email: 'admin@gmail.com',
        Username: 'admin',
        Password: await bcrypt.hash('12345678', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        }
      ]);
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
