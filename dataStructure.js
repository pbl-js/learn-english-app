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
  section: "id",
  topic: "id",

  eng: "bread",
  pl: "chleb",
  img: "url",
};

const user = {
  id: "id",
  email: "email",
  password: "password",
};

const learningProgressTopics = {
  userId: "id",
  topicId: "id",
  lastUpdate: "date",
  unlock: false,
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

const learningProgressWords = {
  userId: "id",
  wordId: "id",
  lastUpdate: "date",
  unlock: false,
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
