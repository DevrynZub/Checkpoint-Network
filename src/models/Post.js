

export class Post {
  constructor(data) {
    this.id = data.id;
    this.body = data.body;
    this.creator = data.creator;
    this.creatorId = data.creatorId;
    this.likeIds = data.likeIds;
    this.likes = data.likes;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
  }


  getFormattedCreatedAt() {
    return this.createdAt ? this.createdAt.toLocaleString() : "N/A";
  }
}



// {
//   "_id": "64bb01c113b954e1db1ad40d",
//     "body": "Is anybody losing their mind a little bit yet? No? Just me? Okay...",
//       "creatorId": "64b8a6fc2bf6d261c3ee91fb",
//         "likeIds": [
//           "649b4e146845e119caa23265"
//         ],
//           "createdAt": "2023-07-21T22:08:01.121Z",
//             "updatedAt": "2023-07-21T22:25:21.248Z",
//               "__v": 0,
//                 "creator": {
//     "_id": "64b8a6fc2bf6d261c3ee91fb",
//       "subs": [
//         "auth0|64b8a6fc4e7031ba54ffd813"
//       ],
//         "email": "iliketurtles@turtles.turtles",
//           "name": "iliketurtles",
//             "picture": "https://s.gravatar.com/avatar/a64eeef825ff2e63157504e89c4e1733?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fil.png",
//               "bio": "",
//                 "coverImg": "https://images.unsplash.com/photo-1586829135343-132950070391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
//                   "github": "",
//                     "linkedin": "",
//                       "resume": "",
//                         "class": "",
//                           "graduated": false,
//                             "createdAt": "2023-07-20T03:16:31.549Z",
//                               "updatedAt": "2023-07-20T03:16:31.549Z",
//                                 "__v": 0,
//                                   "id": "64b8a6fc2bf6d261c3ee91fb"
//   },
//   "likes": [
//     {
//       "_id": "649b4e146845e119caa23265",
//       "name": "jeremy",
//       "picture": "https://s.gravatar.com/avatar/fbe0a0aa52b0a02916a4d8727e477a69?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fje.png",
//       "id": "649b4e146845e119caa23265"
//     }
//   ],
//     "id": "64bb01c113b954e1db1ad40d"
// }