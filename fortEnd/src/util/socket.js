/*
 * @Description: websocket 封装
 * @Author: wangqi
 * @Date: 2020-10-19 09:53:25
 * @LastEditTime: 2020-10-19 17:18:21
 */

class mySocket {
    constructor(url) {
        this._url = url;
        // 是否真正建立连接
        this._lockReconnect = false;
        // 心跳间隔
        this._timeout = 4 * 1000;
        // 断开后再次重连定时器
        this._timeoutNum = null;
        // 客户端心跳定时器
        this._clientTime = null;
        // 服务端心跳定时器
        this._serverTime = null;

        //建立连接
        this.websock = new WebSocket(url);
        //连接成功
        this.websock.onopen = this.onopen.bind(this);
        //连接错误
        this.websock.onerror = this.onerror.bind(this);
        //接收信息
        this.websock.onmessage = this.onmessage.bind(this);
        //连接关闭
        this.websock.onclose = this.onclose.bind(this);
    }

    /**
     * @description: 连接websocket
     * @param {type} 
     * @return {type} 
     */
    onopen() {
        console.log("websocket连接成功");
        // 开启心跳连接
        console.log(this, "this");
        this.start();
    }
    /**
     * @description:    发送消息
     * @param {String}  消息内容
     */
    send(msg) {
        this.websock.send(msg);
    }

    /**
     * @description: 接收服务器推送消息
     * @param {type} 
     * @return {type} 
     */
    onmessage(e) {
        //处理收到消息逻辑
        let event = new CustomEvent('onmessage', { detail: { data: e.data } });
        window.dispatchEvent(event);
        console.log(e.data, "--收到消息");
        //收到服务器信息，心跳重置
        this.reset();
    }

    /**
     * @description: 关闭连接
     * @param {type} 
     * @return {type} 
     */
    onclose() {
        console.log('websocket已关闭');
        // 重连
        this.reconnect();
    }

    /**
     * @description: 连接失败
     * @param {type} 
     * @return {type} 
     */
    onerror() {
        //重连
        this.reconnect();
    }

    /**
     * @description: 重连
     * @param {type} 
     * @return {type} 
     */
    reconnect() {
        if (this._lockReconnect) { return; };
        this._lockReconnect = true;

        this._timeoutNum && clearTimeout(this._timeoutNum);
        this._timeoutNum = setTimeout(() => {
            // 重新连接
            new mySocket(this._url);
            this._lockReconnect = false;
        }, 5000);
    }

    /**
     * @description: 开启心跳
     * @param {type} 
     * @return {type} 
     */
    start() {
        this._clientTime && clearTimeout(this._clientTime);
        this._serverTime && clearTimeout(this._serverTime);
        this._clientTime = setTimeout(() => {
            // 定时心跳发送 'ping'
            if (this.websock.readyState == 1) {
                // 服务端返回 'pong', 接收到消息后      
                this.send('ping');
            } else {
                // 否则重连
                console.log('重连~~');
                this.reconnect();
            }

            this._serverTime = setTimeout(() => {
                console.log('超时~~');
                if (this.websock.readyState !== 1) {
                    console.log('服务器超时关闭');
                    // 服务器超时关闭
                    this.onclose();
                }
            }, this._timeout);

        }, this._timeout);
    }

    /**
     * @description: 重置心跳
     * @param {type} 
     * @return {type} 
     */
    reset() {
        // 清除客户端及服务端定时器      
        clearTimeout(this._clientTime);
        clearTimeout(this._serverTime);
        // 重启心跳
        this.start();
    }


}

export default mySocket; 