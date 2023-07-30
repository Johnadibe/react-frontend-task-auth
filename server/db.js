const users = [
  {
    username: "bobby",
    password: "Aj090234136873",
  },
];

// These will be seen by all who are authenticated or not
const publicPosts = [
  {
    title: "Free tips on Purple Hibuscus",
    content: "These are some better books",
  },
  {
    title: "Free tips Purple Hibuscus",
    content: "These are some better books",
  },
  {
    title: "Free tips on Purple Hibuscus",
    content: "These are some better books",
  },
];

// These will be Authenticated Users that maybe paid for the service
const privatePosts = [
  {
    title: "Paid Tips on Purple Hibuscus",
    content: "These are some better books",
  },
  {
    title: "Free tips on Purple Hibuscus",
    content: "These are some better books",
  },
  {
    title: "Paid tips on Purple Hibuscus",
    content: "These are some better books",
  },
];
module.exports = { users, publicPosts, privatePosts };
