
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


export function addInfo(options){
    return service({
        url: '/api/addInfo',
        method: 'post',
        data: options
    });
};

