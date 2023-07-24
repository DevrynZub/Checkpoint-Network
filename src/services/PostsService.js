import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {

  async getPosts() {
    const res = await api.get(`api/posts`)
    // logger.log('[GETTING POSTS]', res.data)
    const posts = res.data.posts.map(p => new Post(p))
    // logger.log('do I get anything', posts)
    AppState.posts = posts
  }

  async getProfilePosts(profileId) {
    const res = await api.get('api/posts', {
      params: {
        creatorId: profileId,
      }
    })
    logger.log('[GETTING PROFILE POSTS]', res.data)
    const getProfilePosts = res.data.posts.map(p => new Post(p))
    AppState.posts = getProfilePosts
  }

  setActiveProject(post) {
    AppState.activePost = post
  }

  async createPost(postData, creatorId) {
    const res = await api.post('api/posts', postData);
    // logger.log('[CREATED POST]', res.data);
    const post = new Post(res.data);


    AppState.posts.push(post);


    if (AppState.activeProfile?.id === creatorId) {
      AppState.activeProfile.posts.push(post);
    }
  }

  async deletePost(postId) {

    const res = await api.delete(`api/posts/${postId}`)
    logger.log('[REMOVING POST]', res.data)
    const postIndex = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(postIndex, 1)
  }

  async editPost(postData) {
    const res = await api.put(`api/posts/${postData.id},`, postData)
    logger.log('[EDIT POST]', res.data)
    const post = new Post(res.data)
    const postIndex = AppState.posts.findIndex(post => post.id == postData.id)
    AppState.posts.splice(postIndex, 1, post)
  }

  setPostToEdit(postToEdit) {
    AppState.activePost = postToEdit
  }

  async likePost(postId) {
    try {
      const response = await api.post(`/api/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to like the post.');
    }
  }

  async unlikePost(postId) {
    try {
      const response = await api.delete(`/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to unlike the post.');
    }
  }





}


export const postsService = new PostsService()