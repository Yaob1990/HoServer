import { message } from 'antd'

import { getToken } from '@/utils/authority'
import Constants from '@/utils/constants'
import request from '@/utils/request'

/**
 * 获取当前用户
 */
export async function queryCurrent() {
    const token = getToken()
    if (!token) {
        return null
    }

    const rep = await request(`${Constants.API_PREFIX}/user/current`, {
        method: 'GET',
    })

    if (rep.code / 1 !== 0) {
        message.error(`获取当前用户信息失败:  ${rep.message || '接口异常'}`)
    } else {
        return rep.data
    }
}

/**
 * 用户登录
 */
export async function userLogin(args) {
    const url = args.type === 'mobile' ? `${Constants.API_PREFIX}/user/login/mobile` : `${Constants.API_PREFIX}/user/login`
    // 获取用户信息
    const rep = await request(url, {
        method: 'POST',
        data: args,
    })
    if (rep.code === 0) {
        // 获取用户权限
        // const permissions = (rep.data.permissions || []).map(p => p.name)
        // if (rep.data.is_admin) {
        //     permissions.push('admin') // for menu authority
        // }
        const permissions = ['admin']
        return {
            status: 'ok',
            type: args.type,
            autoLogin: args.autoLogin,
            currentAuthority: permissions,
            ...rep.data,
        }
    } else {
        message.error(`登录失败:  ${rep.message || '接口异常'}`)
        return {
            status: 'error',
            type: args.type,
            currentAuthority: 'guest',
        }
    }
}
