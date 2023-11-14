"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Soals", [
      {
        soal: "what does www stand for?",
        jawaban_a: "wo wo wo",
        jawaban_b: "world web wide",
        jawaban_c: "wk wk wk",
        jawaban_d: "wide web world",
        jawaban_benar: "jawaban_b",
        skor: 1,
        kategori_soal: "TOEP",
        jenis_soal: "TEKS",
        part_soal: "READING SECTION",
        durasi: 10,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Soals", null, {});
  },
};
