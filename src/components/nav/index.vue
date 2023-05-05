<script setup>
  import { computed, ref, onMounted, reactive } from "vue";
  import { useUserStore } from "@/stores/user.js";
  const current = ref(["mail"]);
  const userStatus = ref(null);
  const formRef = ref(null);
  const vibisible = ref(false);
  const activeKey = ref("1");
  const width = computed(() => window.innerWidth);
  window.onresize = () => {
    width.value = window.innerWidth;
  };
  const store = useUserStore();
  const loginAndRejecter = () => {
    console.log("登录或注册", store.user);
    vibisible.value = true;
  };
  const userModalConfig = reactive({
    username: "",
    password: "",
  });
  const validator = async (rule, value) => {
    if (value === "") return Promise.reject("请输入内容");
    return Promise.resolve();
  };
  const rules = {
    username: [{ required: true, trigger: "change", validator: validator }],
    password: [{ required: true, trigger: "change", validator: validator }],
  };
  const handleOk = async () => {
    try {
      const value = await formRef.value.validateFields();
      console.log(value);
      store.sigin(userModalConfig);
      vibisible.value = false;
    } catch (error) {
      console.log(error);
    }
  };
  const isRejecter = () => {
    userStatus.value = store.isRejecter();
    console.log(userStatus.value);
  };
  onMounted(() => {
    isRejecter();
  });
</script>

<template>
  <nav>
    <a-layout>
      <a-layout-header style="background-color: white">
        <a-row justify="space-between">
          <a-col :span="19">
            <div class="logo" v-if="width > 750"></div>
            <a-menu v-model:selectedKeys="current" mode="horizontal">
              <a-menu-item key="mail"> 社区 </a-menu-item>
              <a-menu-item key="app"> 发现 </a-menu-item>
              <a-menu-item key="alipay"> 消息 </a-menu-item>
            </a-menu>
          </a-col>
          <a-col :span="5" v-if="width > 750">
            <a-row :gutter="5">
              <a-col :span="18" class="nav-right">
                <a-input-search :value="width"></a-input-search>
              </a-col>
              <a-col :span="5">
                <a-dropdown>
                  <span>{{ userStatus ? userStatus.username : "未登录" }}</span>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <a href="javascript:;" @click="loginAndRejecter"
                          >登录/注册</a
                        >
                      </a-menu-item>
                      <a-menu-item>
                        <a href="javascript:;">个人信息</a>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-layout-header>
    </a-layout>
  </nav>
  <a-modal v-model:open="vibisible" @ok="handleOk">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="登录">
        <a-form ref="formRef" :model="userModalConfig" :rules="rules">
          <a-form-item label="账号" name="username">
            <a-input v-model:value="userModalConfig.username"></a-input>
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input v-model:value="userModalConfig.password"></a-input>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="注册">
        <a-form ref="formRef" :model="userModalConfig" :rules="rules">
          <a-form-item label="账号" name="username">
            <a-input v-model:value="userModalConfig.username"></a-input>
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input v-model:value="userModalConfig.password"></a-input>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
    <template #footer>
      <a-button @click="() => (vibisible = false)">返回</a-button>
      <a-button type="primary" @click="handleOk">确定</a-button>
    </template>
  </a-modal>
</template>

<style scoped>
  .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: #ececec;
  }
  .nav-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
