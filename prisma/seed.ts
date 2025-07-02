import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: "Hiragana" },
      update: {},
      create: {
        name: "Hiragana",
        description: "Learn the basic Japanese hiragana characters",
        icon: "🔤",
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { name: "Katakana" },
      update: {},
      create: {
        name: "Katakana",
        description: "Learn the Japanese katakana characters",
        icon: "🈳",
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { name: "Basic Vocabulary" },
      update: {},
      create: {
        name: "Basic Vocabulary",
        description: "Essential Japanese words and phrases",
        icon: "📚",
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { name: "Grammar Basics" },
      update: {},
      create: {
        name: "Grammar Basics",
        description: "Fundamental Japanese grammar patterns",
        icon: "📝",
        order: 4,
      },
    }),
  ]);

  console.log(
    "✅ Created categories:",
    categories.map((c) => c.name).join(", ")
  );

  // Create sample lessons for Hiragana category
  const hiraganaCategory = categories[0];
  const lessons = await Promise.all([
    prisma.lesson.upsert({
      where: { id: "lesson-hiragana-vowels" },
      update: {},
      create: {
        id: "lesson-hiragana-vowels",
        title: "Hiragana Vowels",
        description: "Learn the 5 basic hiragana vowels: あ, い, う, え, お",
        categoryId: hiraganaCategory.id,
        order: 1,
        difficulty: "BEGINNER",
        xpReward: 15,
        content: {
          questions: [
            {
              type: "multiple-choice",
              question: "What does the hiragana character あ represent?",
              options: ["a", "i", "u", "e"],
              correct: 0,
              explanation:
                "あ (a) is the first vowel in the Japanese hiragana system.",
            },
            {
              type: "multiple-choice",
              question: "What does the hiragana character い represent?",
              options: ["a", "i", "u", "e"],
              correct: 1,
              explanation:
                "い (i) is the second vowel in the Japanese hiragana system.",
            },
          ],
        },
      },
    }),
    prisma.lesson.upsert({
      where: { id: "lesson-hiragana-ka-row" },
      update: {},
      create: {
        id: "lesson-hiragana-ka-row",
        title: "Hiragana K-sounds",
        description: "Learn the か row: か, き, く, け, こ",
        categoryId: hiraganaCategory.id,
        order: 2,
        difficulty: "BEGINNER",
        xpReward: 20,
        content: {
          questions: [
            {
              type: "multiple-choice",
              question: "What does the hiragana character か represent?",
              options: ["ka", "ki", "ku", "ke"],
              correct: 0,
              explanation:
                "か (ka) is the first character in the k-row of hiragana.",
            },
          ],
        },
      },
    }),
  ]);

  console.log("✅ Created lessons:", lessons.map((l) => l.title).join(", "));

  // Create vocabulary items
  const vocabularyItems = await Promise.all([
    prisma.vocabularyItem.upsert({
      where: { id: "vocab-arigato" },
      update: {},
      create: {
        id: "vocab-arigato",
        japanese: "ありがとう",
        romaji: "arigatou",
        english: "Thank you",
        category: "GREETINGS",
        difficulty: "BEGINNER",
        memoryTip: 'Think of "I regard you" to remember arigatou',
        context: "Used to express gratitude in everyday situations",
      },
    }),
    prisma.vocabularyItem.upsert({
      where: { id: "vocab-konnichiwa" },
      update: {},
      create: {
        id: "vocab-konnichiwa",
        japanese: "こんにちは",
        romaji: "konnichiwa",
        english: "Hello",
        category: "GREETINGS",
        difficulty: "BEGINNER",
        memoryTip: "Common greeting used during daytime",
        context: "Standard greeting used from late morning to late afternoon",
      },
    }),
    prisma.vocabularyItem.upsert({
      where: { id: "vocab-sayonara" },
      update: {},
      create: {
        id: "vocab-sayonara",
        japanese: "さようなら",
        romaji: "sayonara",
        english: "Goodbye",
        category: "GREETINGS",
        difficulty: "BEGINNER",
        memoryTip: 'From the movie title "Sayonara"',
        context: "Formal farewell, often implies a long separation",
      },
    }),
  ]);

  console.log(
    "✅ Created vocabulary items:",
    vocabularyItems.map((v) => v.english).join(", ")
  );

  // Create achievements
  const achievements = await Promise.all([
    prisma.achievement.upsert({
      where: { name: "First Steps" },
      update: {},
      create: {
        name: "First Steps",
        description: "Complete your first lesson",
        icon: "👶",
        category: "LESSONS",
        xpReward: 50,
        requirement: {
          type: "lessons_completed",
          count: 1,
        },
      },
    }),
    prisma.achievement.upsert({
      where: { name: "Dedicated Learner" },
      update: {},
      create: {
        name: "Dedicated Learner",
        description: "Complete 10 lessons",
        icon: "📚",
        category: "LESSONS",
        xpReward: 200,
        requirement: {
          type: "lessons_completed",
          count: 10,
        },
      },
    }),
    prisma.achievement.upsert({
      where: { name: "Streak Master" },
      update: {},
      create: {
        name: "Streak Master",
        description: "Maintain a 7-day study streak",
        icon: "🔥",
        category: "STREAKS",
        xpReward: 150,
        requirement: {
          type: "study_streak",
          count: 7,
        },
      },
    }),
  ]);

  console.log(
    "✅ Created achievements:",
    achievements.map((a) => a.name).join(", ")
  );

  // Create a sample study group
  const studyGroup = await prisma.studyGroup.upsert({
    where: { id: "group-beginners" },
    update: {},
    create: {
      id: "group-beginners",
      name: "Beginners Circle",
      description: "A welcoming group for Japanese language beginners",
      level: "BEGINNER",
      isPublic: true,
      maxMembers: 50,
      createdBy: "system",
    },
  });

  console.log("✅ Created study group:", studyGroup.name);

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
