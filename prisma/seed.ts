import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // First, create all authors
  await prisma.author.createMany({
    data: [
      { name: "Nessie", email: "nmartland0@aol.com" },
      { name: "Cele", email: "caldous1@ucoz.ru" },
      { name: "Tine", email: "tstollenhof2@yale.edu" },
      { name: "Natale", email: "nmatteoni3@un.org" },
      { name: "Cass", email: "cpinke4@vinaora.com" },
      { name: "Bordie", email: "beldrid5@gravatar.com" },
      { name: "Estrellita", email: "emaciocia6@oaic.gov.au" },
      { name: "Richard", email: "rtruce7@wired.com" },
      { name: "Benni", email: "bcarlyon8@gov.uk" },
      { name: "Padgett", email: "pklimentyev9@ehow.com" },
      { name: "Marybelle", email: "mtrodda@etsy.com" },
      { name: "Berny", email: "brobisonb@google.ca" },
      { name: "Addie", email: "amingardoc@prnewswire.com" },
      { name: "Jeni", email: "jfoxd@symantec.com" },
      { name: "Graehme", email: "gbodechone@posterous.com" },
      { name: "Dane", email: "dtofftsf@csmonitor.com" },
      { name: "Martina", email: "medlerg@slideshare.net" },
      { name: "Sephira", email: "svanderkruih@goo.gl" },
      { name: "Broderick", email: "btomletti@state.gov" },
      { name: "Lu", email: "lrattj@statcounter.com" },
    ],
  });

  // Get all author IDs to assign to notes
  const allAuthors = await prisma.author.findMany();

  // Sample note titles and contents
  const noteTitles = [
    "Meeting Notes",
    "Project Ideas",
    "Daily Journal",
    "Shopping List",
    "Book Recommendations",
    "Travel Plans",
    "Workout Routine",
    "Recipe Collection",
    "Learning Goals",
    "Conference Takeaways",
    "Team Feedback",
    "Budget Planning",
    "Creative Writing",
    "Code Snippets",
    "Interview Questions",
    "Event Planning",
    "Research Notes",
    "Mind Maps",
    "Product Roadmap",
    "Personal Reflections",
  ];

  const noteContents = [
    "Discussed the new project timeline with the team. Everyone agreed on the deadlines.",
    "Need to research more about Prisma and its advanced features.",
    "Today I learned about database seeding and how useful it is for development.",
    "Milk, eggs, bread, fruits, vegetables, and some snacks for the weekend.",
    "1. Atomic Habits by James Clear\n2. Deep Work by Cal Newport\n3. The Pragmatic Programmer",
    "Planning a trip to Japan next spring. Need to research places to visit.",
    "Monday: Upper body\nTuesday: Cardio\nWednesday: Lower body\nThursday: Yoga\nFriday: Rest",
    "Pasta recipe:\n1. Boil water\n2. Add salt\n3. Cook pasta for 8-10 minutes\n4. Add sauce",
    "Learn TypeScript advanced patterns\nMaster Prisma ORM\nImprove React performance",
    "Key takeaways from the conference:\n1. Microservices architecture\n2. Database optimization",
    "The team is doing great work. Need to improve communication between departments.",
    "Monthly budget:\nIncome: $5000\nRent: $1500\nFood: $600\nSavings: $2000",
    "The wind howled through the trees as the detective approached the old mansion...",
    "const prisma = new PrismaClient()\nasync function main() {\n  // Your code here\n}",
    "Common interview questions:\n1. Tell me about yourself\n2. What's your greatest weakness?",
    "Birthday party planning:\nVenue: Backyard\nGuests: 30\nFood: Catering\nTheme: Summer",
    "Research on renewable energy shows solar power becoming more efficient each year.",
    "Mind map for new app:\nCore Features\nUser Flow\nTech Stack\nMarketing Strategy",
    "Q1: Research\nQ2: MVP\nQ3: Beta Testing\nQ4: Public Launch",
    "Today I reflected on my career path and realized I need to focus more on learning.",
  ];

  // Create notes and assign random authors
  const notes = [];
  for (let i = 0; i < 100; i++) {
    const randomAuthor =
      allAuthors[Math.floor(Math.random() * allAuthors.length)];
    const randomTitle =
      noteTitles[Math.floor(Math.random() * noteTitles.length)];
    const randomContent =
      noteContents[Math.floor(Math.random() * noteContents.length)];

    notes.push({
      title: randomTitle,
      content: randomContent,
      authorId: randomAuthor.id,
    });
  }

  await prisma.note.createMany({
    data: notes,
  });

  console.log(`Seeded ${allAuthors.length} authors and ${notes.length} notes`);
}

main()
  .catch((e) => {
    console.error("Error in seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
