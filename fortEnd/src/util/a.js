let wsUrl;
let socket;
// 心跳间隔
let timeout = 4 * 1000;
// 客户端心跳定时器
let clientTime;
// 服务端心跳定时器
let serverTime;
// 断开后再次重连定时器
let timeoutNum;
// 是否真正建立连接
let lockReconnect;
let onEvent;
const createSocket = ({ url, on }) => {
    wsUrl = url;
    onEvent = on;
    //建立连接
    socket = new WebSocket(url);
    //连接成功
    socket.onopen = onopen;
    //接收信息
    socket.onmessage = onmessage;
    //连接错误
    socket.onerror = onerror;
    //连接关闭
    socket.onclose = onclose;
}

/**
 * @description: 连接websocket
 * @param {*}
 * @return {*}
 */
function onopen() {
    start();
}

/**
 * @description: 接收服务器推送消息
 * @param {*}
 * @return {*}
 */
function onmessage(e) {
    //处理收到消息逻辑
    // let event = new CustomEvent('onmessage', { detail: { data: e.data } });
    let event = new CustomEvent(`${onEvent}`, { detail: { data: e.data } });
    window.dispatchEvent(event);
    //收到服务器信息，心跳重置
    reset();
}

/**
 * @description: 发送消息
 * @param {String} msg 消息内容
 * @return {*}
 */
function emit(msg) {
    socket.send(msg);
}

/**
 * @description: 连接失败
 * @param {*}
 * @return {*}
 */
function onerror() {
    console.log('websocket客户端异常');
    // 重连
    reconnect();
}

/**
 * @description: 监听关闭连接
 * @param {*}
 * @return {*}
 */
function onclose() {
    console.log('websocket已关闭');
    // 重连
    reconnect();
}

/**
 * @description: ws关闭事件
 * @param {*}
 * @return {*}
 */
function close() {
    socket.close();
}

/**
 * @description: 重连
 * @param {*}
 * @return {*}
 */
function reconnect() {
    if (lockReconnect) { return };
    lockReconnect = true;
    timeoutNum && clearTimeout(timeoutNum);
    timeoutNum = setTimeout(() => {
        createSocket({
            url: wsUrl,
            on: onEvent,
        });
        lockReconnect = false;
    });
}

/**
 * @description: 开启心跳
 * @param {*}
 * @return {*}
 */
function start() {
    clientTime && clearTimeout(clientTime);
    serverTime && clearTimeout(serverTime);
    clientTime = setTimeout(() => {
        if (socket.readyState == 1) {
            emit('ping');
        } else {
            // 否则重连
            console.log('重连~~');
            reconnect();
        }

        serverTime = setTimeout(() => {
            console.log('超时~~');
            if (socket.readyState !== 1) {
                console.log('服务器超时关闭');
                // 服务器超时关闭
                close();
            }
        }, timeout);

    }, timeout);
}

/**
 * @description: 重置心跳
 * @param {*}
 * @return {*}
 */
function reset() {
    // 清除客户端及服务端定时器      
    clearTimeout(clientTime);
    clearTimeout(serverTime);
    // 重启心跳
    start();
}

export { createSocket, emit, close, reconnect };