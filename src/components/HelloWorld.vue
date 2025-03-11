<script setup lang="ts">
import { getViewer } from "ssczm";
import { Tree } from "./tree/tree";
import "./tree/tree-view.scss";
import { nextTick } from "vue";
import "./test/test";
nextTick(() => {
  console.log("nextTick", getViewer());
  let t = new Tree({
    el: document.getElementById("test"),
    treeData: [
      {
        label: "矢量数据",
        children: [
          {
            label: "地形图数据",
            children: [
              {
                label: "1:5万地形图",
                children: [
                  {
                    label: "点",
                  },
                  {
                    label: "线",
                  },
                  {
                    label: "面",
                  },
                ],
              },
            ],
          },
          {
            label: "地下管网数据",
            children: [
              {
                label: "排水管网",
              },
              {
                label: "供水管网",
              },
              {
                label: "燃气管网",
              },
            ],
          },
        ],
      },
      {
        label: "点",
      },
    ],
    style: {
      // parentIcon: "src/assets/images/文件夹@2x.png",
      parentIcon: "bi bi-folder",
      childrenIcon: "bi bi-file-earmark-image",
    },
    defaultExpandAll: true,
    props: {
      label: "label",
      children: "children",
      labelRender: (data: any) => {
        return data.label;
        // if (data.children) {
        //   return `<font style="color:var(--bs-emphasis-color)">${data.label}</font>`;
        // } else {
        //   return `<font color='red'>${data.label}</font>`;
        // }
      },
      handleNodeClick: (node: any, e: Event) => {
        console.log("handleNodeClick", node, e);
      },
      extraBtns: [
        {
          name: "添加",
          icon: "bi bi-plus",
          onClick: (node: any) => {
            console.log("添加", node);
          },
          show: (node: any) => node.children && node.children.length > 0,
        },
        {
          name: "删除",
          icon: "bi bi-trash",
          onClick: (node: any) => {
            console.log("删除", node);
          },
        },
      ],
    },
  });
  t.initialize();
});

</script>

<template>
  <base-earth configUrl="config/config.json"/>
  <my-test />
  <!-- <basic-test /> -->
  <n-button>naive-ui</n-button>
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-success">success</button>
  <div class="treeview">
    <ul id="test"></ul>
  </div>

  <!-- <div id="earth"></div> -->
  <w-comp />
  <basic-test />
</template>

<style scoped>
ul,
#test {
  list-style-type: none;
  padding-left: 1rem;
}

#test {
  margin: 0;
  padding: 0;
}
.treeview {
  width: 600px;
  height: 300px;
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  text-align: left;
}
</style>
