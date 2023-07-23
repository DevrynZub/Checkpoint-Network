import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"






class ProfileService {
  async getProfile(profileId) {
    const res = await api.get(`api/profiles/${profileId}`)
    logger.log('[GETTING PEEPS POSTS]', res.data)
    const profile = new Profile(res.data)
    AppState.activeProfile = profile

  }

  async getProfilePosts(profileId) {

    const res = await api.get('api/posts', {
      params: {
        creatorId: profileId,
      }
    })

    logger.log('[GETTING PROFILE POSTS]', res.data)


  }
}


export const profileService = new ProfileService()