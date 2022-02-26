<template>
  <div
    class="components-Button"
    @mouseenter="this.buttonMouseEnterHandler()"
    @mouseleave="this.buttonMouseLeaveHandler()">
    <div class="components-Button__icon">
      <icon :color="this.iconColor" :name="this.icon"/>
    </div>
    <div class="components-Button-caption">{{this.caption}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import icon from 'v-svg-icons'

interface IData {
  iconColor: string
}

const UN_ACTIVE_ICON_COLOR = '#444'
const ACTIVE_ICON_COLOR = '#fff'

/**
 * Компонент кнопки.
 */
export default defineComponent({
  name: 'Button',
  components: {
    icon
  },
  data (): IData {
    return {
      iconColor: UN_ACTIVE_ICON_COLOR
    }
  },
  props: {
    icon: String,
    caption: String
  },
  methods: {
    buttonMouseEnterHandler (): void {
      this.iconColor = ACTIVE_ICON_COLOR
    },
    buttonMouseLeaveHandler (): void {
      this.iconColor = UN_ACTIVE_ICON_COLOR
    }
  }
})
</script>

<style lang="less">
.components-Button {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  transition: all .1s ease;
  &:hover {
    background: #444;
    color: #fff;
  }
}
.components-Button__icon {
  margin-right: 20px;
}
</style>
