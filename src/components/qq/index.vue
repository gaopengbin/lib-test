<template>
  <n-layout has-sider style="height: 100%">
    <n-layout-sider content-style="padding: 24px;">
      <n-list hoverable clickable>
        <n-list-item v-for="item in friendList" @click="clickFriend(item)">
          <n-avatar size="medium" :src="item[1]" />
          <span>{{ item[0] }}</span>
        </n-list-item>
      </n-list>
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <n-tag type="info" onclick="showModal = true">
          {{ currentCookie?.uin }}</n-tag
        >
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <n-statistic label="一共有" tabular-nums>
          <n-number-animation
            ref="numberAnimationInstRef"
            :from="0"
            :to="msgCount"
          />
          <template #suffix> 条内容 </template>
        </n-statistic>
        <n-infinite-scroll
          style="height: 540px; text-align: left"
          :distance="10"
          @load="handleLoad"
        >
          <n-card hoverable v-for="item in msgList">
            {{ item[1] }}<br />
            <n-image width="100" :src="item[2]" />
            <template #footer>
              {{ item[0] }}
            </template>
          </n-card>

          <div v-if="loading" class="text">加载中...</div>
          <div v-if="noMore" class="text">没有更多了 🤪</div>
        </n-infinite-scroll>
      </n-layout-content>
      <n-layout-footer>成府路</n-layout-footer>
    </n-layout>
  </n-layout>
  <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
    <template #header>
      <div>选择用户</div>
    </template>
    <n-button v-for="item in userList" @click="selectUser(item)">{{
      item.uin
    }}</n-button>
    <n-button @click="getQR">新登录</n-button>
    <img :src="qrimg" v-show="qrimg.length > 0" />
  </n-modal>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
const showModal = ref(false);
const userList = ref<any>([]);
axios.get("/api/get_login_list").then((res) => {
  console.log(res);
  userList.value = res.data.login_list;
  showModal.value = true;
});
const currentCookie = ref();
// 选择用户
const selectUser = (e: any) => {
  currentCookie.value = e;
  showModal.value = false;
  axios
    .post("/api/select_user", {
      cookie: e,
    })
    .then((res) => {
      console.log(res);
      getMsgCount();
      getMessage(0, 10);
    });
};

// 新登录
const qrimg = ref("");
const getQR = () => {
  axios.get("/api/getQR").then((res) => {
    qrimg.value = "data:image/png;base64," + res.data;
  });
  // 轮询
  let interval = setInterval(() => {
    axios.get("/api/login").then((res) => {
      console.log(res);
      if (res.data.cookies) {
        clearInterval(interval);
        // alert("登录成功");
        showModal.value = false;
        getMsgCount();
        getMessage(0, 100);
      }
    });
  }, 1000);
};

const start = ref(0);
const count = ref(10);

// 获取消息总量
const msgCount = ref(0);
const numberAnimationInstRef = ref<any>();
const getMsgCount = () => {
  axios.get("/api/getMessageCount").then((res) => {
    console.log(res);
    msgCount.value = res.data.count;
    numberAnimationInstRef.value?.play();
  });
};

const msgList = ref<any>([]);

const friendList = ref();
const fl: any = new Set();
const getMessage = (start: number, count: number) => {
  lastIndex.value = start + count;
  axios
    .get("/api/getMessage?start=" + start + "&count=" + count)
    .then((res) => {
      console.log(res);
      res.data.user_message.forEach((item: any) => {
        if (item[2]) {
          item[2] = "data:image/png;base64," + item[2];
        }
      });
      // 判断一下是不是重复了
      if (
        res.data.user_message.length > 0 &&
        msgList.value.length > 0 &&
        msgList.value[msgList.value.length - 1][1] ===
          res.data.user_message[0][1]
      ) {
        res.data.user_message.shift();
      }
      msgList.value = msgList.value.concat(res.data.user_message);
      res.data.all_friends.forEach((item: any) => {
        fl.add(item);
      });
      friendList.value = Array.from(fl);
      console.log(friendList);
      loading.value = false;
    });
};
const lastIndex = ref(0);
const loading = ref(false);
const noMore = ref(false);
const handleLoad = () => {
  if (msgList.value.length >= msgCount.value) {
    noMore.value = true;
  } else {
    noMore.value = false;
  }
  if (loading.value) return;
  loading.value = true;
  let start = lastIndex.value;
  let count = 100;
  getMessage(start, count);
};

const clickFriend = (item: any) => {
  console.log(item);
};
</script>

<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>
