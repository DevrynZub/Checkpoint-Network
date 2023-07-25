

export class Profile {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.github = data.github ? data.github : 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    this.linkedin = data.linkedin
    this.resume = data.resume ? data.resume : 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      this.email = data.email
    this.graduated = data.graduated
    this.class = data.class || ''
  }







}



// {
//   "_id": "64b709a176176d2b17adb728",
//     "subs": [
//       "auth0|64b709a00853f5dd7599d02d"
//     ],
//       "email": "giftgiver@gift.giver",
//         "name": "giftgiver",
//           "picture": "https://s.gravatar.com/avatar/1c61e30e33104c69c795af25f13b52ea?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fgi.png",
//             "bio": "",
//               "coverImg": "https://images.unsplash.com/photo-1586829135343-132950070391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
//                 "github": "",
//                   "linkedin": "",
//                     "resume": "",
//                       "class": "",
//                         "graduated": false,
//                           "createdAt": "2023-07-18T21:52:37.763Z",
//                             "updatedAt": "2023-07-18T21:52:37.763Z",
//                               "__v": 0,
//                                 "id": "64b709a176176d2b17adb728"
// }