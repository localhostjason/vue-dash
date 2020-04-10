<template>
  <div>
    <el-row>
      <div style="width: 200px;" class="pull-left">
        <ul class="vertial-step">
          <li v-for="(item, index) in tabs" :class="[{ active: hasActive(index) || index === num }, 'step-item']"
              @click="tab(item.name, index)" ref="ele">

            <div class='step-title'>
              <span class='category-index-step'>{{ index + 1 }}</span>
              <span class='step-txt'>{{ item.label }}</span>
            </div>
            <div v-if="index < tabs.length -1 "><span class='step-line'></span></div>
          </li>

          <li class="step-pointer" :style="{top: height + 'px'}">
            <span class="step-pointer-1"></span>
            <span class="step-pointer-2"></span>
          </li>
        </ul>
      </div>
      <div class="tab-content pull-left"
           style="width: calc(100% - 201px);border-left:1px solid rgb(204, 214, 224); min-height: 380px">
        <slot></slot>
      </div>
    </el-row>

  </div>
</template>

<script>
  import './tab.scss'

  export default {
    name: "index",
    props: {
      active: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        tabs: [],
        num: 0,
        showTab: null,
        numArray: [],

        tabTitle: [],

        height: 30
      }
    },
    mounted() {
      let slot = this.$slots.default;
      let numArrayCopy = [];

      for (let i = 0; i < slot.length; i++) {
        if (slot[i].tag === "div") {
          const attr_name = slot[i].data.attrs.name;
          const attr_label = slot[i].data.attrs.label;
          this.tabs.push({label: attr_label, name: attr_name,});

          if (slot[i].elm) {
            if (attr_name === this.active) {
              slot[i].elm.className = "";
              numArrayCopy = Array((i + 2) / 2).fill(0).map((_, x) => x);
            } else
              slot[i].elm.className = "hide";

            if (!this.active && !this.showTab) {
              slot[0].elm.className = "";
            }
          }
        }
      }

      if (this.active) {
        this.numArray = numArrayCopy;
        this.height = (numArrayCopy.length) * 50 - 20;
      }

    },
    methods: {
      hasActive(index) {
        return this.numArray.includes(index)
      },
      tab(item, index) {
        this.$emit('handlerChange', item);

        this.num = index;
        this.showTab = item;
        this.numArray = Array(index + 1).fill(0).map((_, i) => i);

        let slot = this.$slots.default;
        for (let i = 0; i < slot.length; i++) {
          if (slot[i].tag === "div") {
            item === slot[i].data.attrs.name ? slot[i].elm.className = "" : slot[i].elm.className = "hide";
          }
        }

        this.height = (this.numArray.length) * 50 - 20;
      }
    }
  }
</script>
