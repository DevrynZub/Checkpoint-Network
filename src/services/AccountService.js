import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getUserData() {
    const res = await api.get('account');
    return res.data;
  }

  async updateAccountInfo(data) {
    await api.put('account', data);
    logger.log('[Updated Account Data:]', data);
    AppState.account = data;

  }






}

export const accountService = new AccountService()
