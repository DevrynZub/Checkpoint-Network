import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";




class AdsService {
  async getAds() {
    try {
      const res = await api.get('api/ads');
      logger.log('[GETTING ADS]', res.data);
      return res.data;
    } catch (error) {
      throw new Error('Failed to fetch ads.');
    }
  }



}


export const adsService = new AdsService()