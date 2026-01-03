"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const soalList = [];
    const options = ["jawaban_a", "jawaban_b", "jawaban_c", "jawaban_d"];

    const toepTemplates = [
      "What is the main idea of the passage about {topic}?",
      "According to the conversation, why did the man {action}?",
      "The word '{word}' in line {line} is closest in meaning to...",
      "What can be inferred about {subject}?",
      "Which of the following is NOT mentioned in the talk?",
    ];

    const tkdaTemplates = [
      "Semua {p1} adalah {p2}. {s} adalah {p1}. Kesimpulannya...",
      "Analogi: {w1} : {w2} = {w3} : ...",
      "Jika {n1} + {n2} = {res}, maka berapakah ({n1} x 2) + {n2}?",
      "Lanjutkan deret angka berikut: {series}, ...",
      "Sebuah mobil melaju dengan kecepatan {n1} km/jam selama {n2} jam. Jaraknya adalah...",
    ];

    const topics = ["Global Warming", "AI Revolution", "Ancient Rome", "Space X", "Organic Food", "Quantum Physics", "Renewable Energy"];
    const subjects = ["the professor", "the dean", "the librarian", "the researcher", "the student body"];
    const verbs = ["postpone the exam", "cancel the trip", "upgrade the system", "submit the report", "present the findings"];
    const words = ["remarkable", "dynamic", "complex", "ambiguous", "crucial", "persistent"];

    const p1List = ["mamalia", "unggas", "mahasiswa", "atlet", "pegawai", "kendaraan"];
    const p2List = ["menyusui", "bertelur", "belajar", "berlatih", "bekerja", "membutuhkan bahan bakar"];
    const names = ["Andi", "Siti", "Budi", "Dewi", "Eko", "Maya"];
    const wordPairs = [
      {w1: "Haus", w2: "Minum", w3: "Lapar", ans: "Makan"},
      {w1: "Guru", w2: "Sekolah", w3: "Dokter", ans: "Rumah Sakit"},
      {w1: "Hutan", w2: "Pohon", w3: "Gurun", ans: "Pasir"},
      {w1: "Malam", w2: "Bulan", w3: "Siang", ans: "Matahari"},
    ];

    // Generate 50 TOEP
    for (let i = 1; i <= 50; i++) {
        const template = toepTemplates[Math.floor(Math.random() * toepTemplates.length)];
        const questionText = template
            .replace("{topic}", topics[Math.floor(Math.random() * topics.length)])
            .replace("{subject}", subjects[Math.floor(Math.random() * subjects.length)])
            .replace("{action}", verbs[Math.floor(Math.random() * verbs.length)])
            .replace("{word}", words[Math.floor(Math.random() * words.length)])
            .replace("{line}", i);

        const randomCorrect = options[Math.floor(Math.random() * options.length)];
        soalList.push({
          soal: `[TOEP #${i}] ${questionText}`,
          jawaban_a: `Choice Alpha for question ${i}`,
          jawaban_b: `Option Bravo ${i}`,
          jawaban_c: `Selection Charlie ${i}`,
          jawaban_d: `Alternative Delta ${i}`,
          jawaban_benar: randomCorrect,
          skor: Math.floor(Math.random() * 5) + 1,
          kategori_soal: "TOEP",
          jenis_soal: "TEKS",
          part_soal: "READING SECTION",
          durasi: Math.floor(Math.random() * 60) + 30,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    }

    // Generate 50 TKDA
    for (let i = 1; i <= 50; i++) {
        const template = tkdaTemplates[Math.floor(Math.random() * tkdaTemplates.length)];
        const pair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
        const p1 = p1List[Math.floor(Math.random() * p1List.length)];
        const n1 = Math.floor(Math.random() * 100);
        const n2 = Math.floor(Math.random() * 50);

        const questionText = template
            .replace("{p1}", p1)
            .replace("{p2}", p2List[p1List.indexOf(p1)])
            .replace("{s}", names[Math.floor(Math.random() * names.length)])
            .replace("{w1}", pair.w1)
            .replace("{w2}", pair.w2)
            .replace("{w3}", pair.w3)
            .replace("{n1}", n1)
            .replace("{n2}", n2)
            .replace("{res}", n1 + n2)
            .replace("{series}", `${i}, ${i * 2}, ${i * 3}`)
            .replace("{topic}", topics[Math.floor(Math.random() * topics.length)]);

        const randomCorrect = options[Math.floor(Math.random() * options.length)];
        soalList.push({
          soal: `[TKDA #${i}] ${questionText}`,
          jawaban_a: `Jawaban A - ${pair.ans} / ${n1 + n2 + 10}`,
          jawaban_b: `Sesuai Analogi ${pair.w1} / ${n1}`,
          jawaban_c: `Kesimpulan Benar ${i}`,
          jawaban_d: `Hasil Perhitungan ${i * 15}`,
          jawaban_benar: randomCorrect,
          skor: Math.floor(Math.random() * 10) + 5,
          kategori_soal: "TKDA",
          jenis_soal: "TEKS",
          part_soal: "ANALOGY",
          durasi: Math.floor(Math.random() * 40) + 20,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
    }

    await queryInterface.bulkInsert("Soals", soalList, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Soals", null, {});
  },
};
