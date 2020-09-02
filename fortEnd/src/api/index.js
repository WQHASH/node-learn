/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 10:46:20
 * @LastEditTime: 2020-09-02 17:08:54
 */

import service from './request';

/**
 * @description: 测试接口
 * @param {type} 
 * @return {type} 
 */
export function getInfo(options) {
    return service({
        url: "/api/getInfo",
        method: 'get',
        params: options,
    });
};


export function postList(options) {
    return service({
        url: "/api/postList",
        method: 'post',
        data: options,
    });
};


export function addInfo(options) {
    return service({
        url: '/api/addInfo',
        method: 'post',
        data: options
    });
};

export function editInfo(options) {
    return service({
        url: '/api/editInfo',
        method: 'post',
        data: options
    });
}


