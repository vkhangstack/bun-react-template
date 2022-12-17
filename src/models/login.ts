import { Reducer } from 'redux'
import { Effect } from 'dva'
import { stringify } from 'querystring'
import { getPageQuery } from '@/utils/utils'
import router from 'umi/router'

import { fakeAccountLogin, getFakeCaptcha } from '@/services/login'

export interface StateType {
  status?: 'ok' | 'error'
  type?: string
  currentAuthority?: 'user' | 'guest' | 'admin'
}

export interface LoginModelType {
  namespace: string
  state: StateType
  effects: {
    login: Effect
    getCaptcha: Effect
    logout: Effect
  }
  reducers: {
    changeLoginStatus: Reducer<StateType>
  }
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }): any {
      const response: any = yield call(fakeAccountLogin, payload)
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      })
      // Login successfully
      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href)
        const params: any = getPageQuery()
        let { redirect } = params as { redirect: string }
        if (redirect) {
          const redirectUrlParams = new URL(redirect)
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length)
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1)
            }
          } else {
            window.location.href = '/'
            return
          }
        }
        router.replace(redirect || '/')
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload)
    },

    logout() {
      const { redirect } = getPageQuery()
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      }
    },
  },
}

export default Model
