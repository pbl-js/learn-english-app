const rangi = [
  { point: 1, name: "SuperAdmin" },
  { point: 5, name: "User" },
];

const state = {
  sections: [
    {
      id: 1,
      title: "jedzenie",
      description: "fsdfsd",
      topics: [
        {
          id: 1,
          title: "title",
          img: "src",
          progress: {
            locked: false,
            started: true,
            passed: true,
            mastering: true,
            learningProgress: {
              value: 20,
              total: 20,
            },
            masteringProgress: {
              value: 20,
              total: 20,
            },
          },
          words: [
            {
              eng: "bread",
              pl: "chleb",
              img: "url",
              seen: false,
              known: false,
              learningProgress: {
                value: 20,
                total: 20,
              },
              masteringProgress: {
                value: 20,
                total: 20,
              },
            },
          ],
        },
      ],
    },
  ],
};

const section = {
  id: 1,
  title: "jedzenie",
  color: "red",
};

const topic = {
  id: 1,
  section: "section",
  title: "title",
  img: "src",
  totalWords: 144,
};

const word = {
  topic: "id",

  eng: "bread",
  pl: "chleb",
  img: "url",
};

const user = {
  id: "id",
  email: "email",
  password: "password",
  topics,
};

const TopicUserProgress = {
  user: "id",
  topic: "id",
  lastUpdate: "date",
  unlock: false,
  started: false,
  passed: false,
  mastering: false,
  learningProgress: {
    value: 0,
    total: 20,
  },
  masteringProgress: {
    value: 0,
    total: 20,
  },
  learningWords: [],
};

const WordUserProgress = {
  user: "id",
  word: "id",
  topic: "id",
  lastUpdate: "date",
  seen: false,
  started: true,
  passed: true,
  mastering: true,
  learningProgress: {
    value: 20,
    total: 20,
  },
  masteringProgress: {
    value: 20,
    total: 20,
  },
};
