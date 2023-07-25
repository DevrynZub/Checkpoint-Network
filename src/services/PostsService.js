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
    AppState.page = res.data.page
    AppState.totalPages = res.data.total_pages
  }

  async getNextPageOfPosts() {
    const res = await api.get(`api/posts/?page=${AppState.page + 1}`)
    logger.log('[got next page of posts]', res.data)
    const posts = res.data.posts.map(postPojo => new Post(postPojo))

    AppState.posts = posts

    AppState.page = res.data.page

    AppState.totalPages = res.data.total_pages
  }

  async getNewPageOfPosts(pageNumber) {
    const res = await api.get(`api/posts/?page=${pageNumber}`)
    logger.log('[got next page of posts]', res.data)

    const posts = res.data.posts.map(postPojo => new Post(postPojo))

    AppState.posts = posts

    AppState.page = res.data.page

    AppState.totalPages = res.data.total_pages
  }

  async getPostById(postId) {
    const res = await api.get(`post/${postId}`)
    logger.log('got posts by id', res.data)
    const post = new Post(res.data)
    AppState.activePost = post
  }


  async getPostsByQuery(queryObject) {
    const res = await api.get(`api/posts?query=${queryObject.query}`);
    logger.log('got posts with query', res.data)
    const posts = res.data.posts.map(postPojo => new Post(postPojo))

    AppState.posts = posts;
    AppState.query = queryObject
    return posts;
  }


  async getPostsByQueryWithPageNumber(queryObject, pageNumber) {
    const res = await api.get(`search/post?query=${queryObject.query}&page=${pageNumber}`)
    logger.log('got posts with query', res.data)
    const posts = res.data.posts.map(postPojo => new Post(postPojo))

    AppState.posts = posts

    AppState.page = res.data.page

    AppState.totalPages = res.data.total_pages

    AppState.query = queryObject

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
    logger.log('[CREATED POST]', res.data);
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

  clearPosts() {
    AppState.posts = []
    AppState.page = 0
    AppState.totalPages = 0
    AppState.query = null
  }
}













export const postsService = new PostsService()