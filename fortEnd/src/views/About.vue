<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 10:01:31
 * @LastEditTime: 2020-10-15 14:15:17
-->
<template>
  <div class="about">
    <h1>This is an about page11</h1>
    <button @click="handleClick">send</button>
  </div>
</template>

<script>
import socket from "@/socket";

export default {
  data() {
    return {};
  },
  created() {
    socket.on("messageServer", (data) => {
      console.log(data, "messageServer");
    });
  },

  methods: {
    handleClick() {
      console.log(socket, "xxx");
      socket.emit("messageClient", { sname: "wq" });
    },
  },
};
</script>
