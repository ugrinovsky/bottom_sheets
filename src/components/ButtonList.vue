<template>
  <Button
    v-for="item in items"
    :key="item.id"
    :icon="item.icon"
    :caption="item.caption"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@/components/Button.vue'

export interface IItem {
  id: string
  icon: string
  caption: string
}

/**
 * Компонент списка кнопок.
 */
export default defineComponent({
  name: 'ButtonList',
  components: { Button },
  props: {
    items: {
      type: Array as () => IItem[],
      required: true,
      defaultValue: []
    }
  }
})
</script>

<style>

</style>
