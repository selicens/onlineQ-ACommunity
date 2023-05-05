<script setup>
  import { ref, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import Nav from "../components/nav/index.vue";
  import { mockData } from "@/utils/mockData.js";
  import { useArticleStore } from "@/stores/article";
  const activeKey = ref("1");
  const router = useRouter();
  const store = useArticleStore();
  const article = store.getAllArticle();
  console.log(article);
  if (article) {
    article.forEach((item) => {
      mockData.unshift(item);
    });
  }
  const goToArticle = () => {
    router.push("/newArticle");
  };
  const width = computed(() => window.innerWidth);
  window.onresize = () => {
    width.value = window.innerWidth;
  };
</script>

<template>
  <Nav></Nav>
  <main>
    <a-row justify="center">
      <a-col :span="20">
        <a-card class="wrapper">
          <a-tabs
            v-model:activeKey="activeKey"
            type="card"
            class="wrapper-tabs"
          >
            <a-tab-pane key="1" tab="最新">
              <a-row :gutter="[, { xs: 8, sm: 16, md: 24, lg: 32 }]">
                <a-col :span="24" v-for="item in mockData" :key="item.id">
                  <a-card>
                    <div class="content">
                      <a-avatar size="large" v-if="width > 750"> </a-avatar>
                      <div>
                        <span>{{ item.content.abstract }}...</span>
                        <div class="details">
                          <span>{{ item.username }}</span>
                          <span>发布于{{ item.date }}</span>
                        </div>
                      </div>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane key="2" tab="最热">Content of Tab Pane 2</a-tab-pane>
          </a-tabs>
          <a-button class="wrapper-button" type="primary" @click="goToArticle"
            >我要发布</a-button
          >
        </a-card>
      </a-col>
    </a-row>
  </main>
</template>
<style scoped>
  main {
    background-color: #ececec;
  }
  .content {
    display: flex;
    align-items: center;
  }
  .content > *:last-child {
    margin-left: 10px;
  }
  .details > span:first-child {
    margin-right: 10px;
  }
  .wrapper {
    position: relative;
  }
  .wrapper-tabs {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .wrapper-button {
    position: absolute;
    top: 24px;
    right: 24px;
  }
</style>
