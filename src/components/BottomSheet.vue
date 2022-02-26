<template>
  <div class="components-BottomSheet">
    <Transition name="bottomSheetCover">
      <div
        class="components-BottomSheet__cover"
        @click="hoverClickHandler()"
        v-if="isModalMounted"
      ></div>
    </Transition>

    <Transition name="bottomSheetContent">
      <content class="components-BottomSheet__content" v-if="isModalMounted">
        <slot name="content"/>
      </content>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ComponentPublicInstance } from 'vue'

/**
 * Компонент всплывающего окна с низу страницы
 */
export default defineComponent({
  name: 'BottomSheet',
  data () {
    return {
      isModalMounted: false
    }
  },
  mounted () {
    this.isModalMounted = true
  },
  unmounted () {
    this.isModalMounted = false
  },
  methods: {
    hoverClickHandler () {
      this.isModalMounted = false
      setTimeout(function (context: ComponentPublicInstance) {
        context.$emit('close')
      }, 200, this)
    }
  }
})
</script>

<style lang="less">
.components-BottomSheet {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.components-BottomSheet__content {
  width: 400px;
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  box-shadow: 1px 1px 12px 0 #333;
  padding: 5px;
}
.components-BottomSheet__cover {
  background: rgba(0, 0, 0, .5);
  z-index: 0;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 1;
}

.animation(@name, @time, @field, @value) {
  .@{name}-enter-active,
  .@{name}-leave-active {
    transition: @field @time ease;
  }

  .@{name}-enter-from,
  .@{name}-leave-to {
      @{field}: @value;
  }
}

.animation(bottomSheetContent, .2s, bottom, -100%);
.animation(bottomSheetCover, .2s, opacity, 0);
</style>
