import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";




class AdsService {
  async getAds() {
    try {
      const res = await api.get('api/ads');
      const data = res.data
      logger.log('[DID I GET Ads?]', data);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch ads.');
    }
  }



}


export const adsService = new AdsService()