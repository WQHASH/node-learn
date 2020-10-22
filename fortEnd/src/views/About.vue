<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 10:01:31
 * @LastEditTime: 2020-10-22 13:56:21
-->
<template>
  <div class="about">
    <h1>This is an about page11</h1>
    <button @click="handleClick">send</button>
    <button @click="close">关闭</button>
    <button @click="connect">重连</button>
    <p>{{ socketStr }}</p>
  </div>
</template>

<script>
// import { createSocket, sendWSPush, onmessageWS } from "@/util/websocket";
// import mySocket from "@/util/socket";

import { createSocket, emit, reconnect, close, onEvent } from "@/util/a";
// let ws;
export default {
  data() {
    return {
      obj: {
        sname: "wq",
        sage: 12,
        num: 1,
      },
      socketStr: "121",
      socket: null,
    };
  },
  created() {
    // this.socket.on("messageServer", (data) => {
    //   console.log(data, "messageServer");
    // });

    // createSocket("ws://localhost:3001");
    // window.addEventListener("onmessageWS", (e) => {
    //   console.log(e);
    //   this.socketStr = e.detail.data;
    // });

    // =============
    // mySocket
    // this.socket = new mySocket("ws://localhost:3001");
    // this.socket.on = "onmessage";
    // window.addEventListener("onmessage", (e) => {
    //   if (e.detail.data !== "ping") {
    //     this.socketStr = e.detail.data;
    //   }
    // });

    // =============
    // 原生
    // ws = new WebSocket("ws://localhost:3001");
    // ws.onopen = function () {
    //   // Web Socket 已连接上，使用 send() 方法发送数据
    //   ws.send("发送数据");
    //   console.log("数据发送中...");
    // };

    // ws.onmessage = function (evt) {
    //   var received_msg = evt.data;
    //   console.log("数据已接收...", `${received_msg}`);
    // };

    // =============
    // aaaa
    createSocket({
      url: "ws://localhost:3001",
      on: "onmessage",
    });
    window.addEventListener(`onmessage`, (e) => {
      if (e.detail.data !== "ping") {
        this.socketStr = e.detail.data;
      }
    });
  },

  methods: {
    handleClick() {
      // console.log(this.socket, "xxx");
      // console.log(this.obj, "obj");
      // this.socket.emit("messageClient", { sname: "wq" });
      // sendWSPush({ sname: "xxxx" });
      //  ws.send(JSON.stringify({"sname":"wq"}));
      let num = this.obj.num++;
      // this.socket.emit(num);
      emit(num);
    },
    close() {
      // this.socket.close();
      console.log("websocket- 关闭");
      close();
    },
    connect() {
      reconnect();
    },
  },
};
</script>
