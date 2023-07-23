import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {

  async getPosts() {
    const res = await api.get(`api/posts`)
    logger.log('[GETTING POSTS]', res.data)
    const posts = res.data.posts.map(p => new Post(p))
    logger.log('do I get anything', posts)
    AppState.posts = posts
  }

  async getProfilePosts(profileId) {

    const res = await api.get('api/posts', {
      params: {
        creatorId: profileId,

      }
    })

    logger.log('[GETTING PROFILE POSTS]', res.data)

    const profilePosts = res.data.map(p => new Post(p))
    AppState.projects = profilePosts
  }

  setActiveProject(post) {
    AppState.activePost = post
  }





}


export const postsService = new PostsService()

