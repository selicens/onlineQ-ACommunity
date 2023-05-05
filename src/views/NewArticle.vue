<script setup>
  import "@wangeditor/editor/dist/css/style.css"; // 引入 css
  import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
  import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
  import { useArticleStore } from "@/stores/article.js";
  import { useUserStore } from "@/stores/user.js";
  const title = ref();
  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();

  // 内容 HTML
  const valueHtml = ref("<p>hello</p>");
  const valueText = ref();

  const toolbarConfig = {};
  const editorConfig = {
    placeholder: "请输入内容...",
  };

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };
  const handleChange = (editor) => {
    const html = editor.getHtml();
    valueText.value = editor.getText();
    console.log(html);
  };
  const mode = "deafult";
  const store = useArticleStore();
  const userStore = useUserStore();
  const user = userStore.isRejecter();
  const publishArticle = () => {
    const data = {
      id: Math.floor(Math.random() * Math.floor(Math.random())),
      username: user.username,
      date: new Date().toLocaleString(),
      content: {
        title: title.value,
        abstract: valueText.value,
        article: valueHtml.value,
      },
    };
    console.log(data);
    store.setArticle(4, data);
    console.log(store.articles);
  };
</script>

<template>
  <a-card>
    <a-input v-model:value="title" placeholder="输入文章标题..." />
    <div style="border: 1px solid #ccc; margin: 20px 0">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
    <a-button type="primary" @click="publishArticle">发布文章</a-button>
  </a-card>
</template>

<style scoped></style>
