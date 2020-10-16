<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-08-28 10:01:31
 * @LastEditTime: 2020-10-16 19:18:58
-->
<template>
  <div class="about">
    <h1>This is an about page11</h1>
    <button @click="handleClick">send</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      obj: {
        sname: "wq",
        sage: 12,
      },
    };
  },
  created() {
    // this.socket.on("messageServer", (data) => {
    //   console.log(data, "messageServer");
    // });
  },

  methods: {
    handleClick() {
      // console.log(this.socket, "xxx");
      // console.log(this.obj, "obj");

      // this.socket.emit("messageClient", { sname: "wq" });
    },
  },
};
</script>
