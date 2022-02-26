<template>
  <div class="page">
    <Button caption="show button list" icon="list-ul" @click="showButtonList()"/>
    <Button caption="show card list" icon="id-card" @click="showCard()"/>

    <BottomSheet
      v-if="modalState.isActive"
      @close="closeBottomSheetHandler()"
    >
      <template #content>
        <template v-if="modalState.type === 'list'">
          <ButtonList :items="listItems"/>
        </template>
        <template v-else>
          <div class="page-Modal__card">
            <h3>{{cardState.title}}</h3>
            <div>{{cardState.content}}</div>
          </div>
        </template>
      </template>
    </BottomSheet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BottomSheet from './BottomSheet.vue'
import ButtonList, { IItem } from '@/components/ButtonList.vue'
import Button from '@/components/Button.vue'

interface ICardState {
  title: string
  content: string
}

interface IModalState {
  isActive: boolean
  type: string | null
}

interface IData {
  modalState: IModalState
  cardState: ICardState
  listItems: IItem[]
}

/**
 * Демо-компонент.
 */
export default defineComponent({
  name: 'Demo',
  data (): IData {
    return {
      listItems: [{
        id: '1',
        icon: 'share-alt-square',
        caption: 'Share'
      }, {
        id: '2',
        icon: 'link',
        caption: 'Get link'
      }, {
        id: '3',
        icon: 'edit',
        caption: 'Edit name'
      }, {
        id: '4',
        icon: 'trash-alt',
        caption: 'Delete collections'
      }],
      modalState: {
        isActive: false,
        type: null
      },
      cardState: {
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          'Ab, accusamus ad, aliquam aperiam architecto aut blanditiis, consectetur
          'consequuntur cum dicta dolor dolorem esse ex excepturi fuga in iusto labore magni
          'minima molestiae nemo nesciunt numquam officiis praesentium quae quibusdam quisquam recusandae
          rem rerum saepe tempore unde ut vitae. Cupiditate enim laudantium molestiae nisi quos recusandae unde voluptatibus.
          Ducimus ea laborum nesciunt nulla quos! Alias aspernatur atque consectetur corporis delectus,
          dolor dolore dolorem ea eaque earum error eveniet facere fugiat incidunt iure nostrum odio omnis quaerat quia quis,
          sed temporibus vel voluptas? Accusamus alias autem beatae blanditiis consectetur dicta dolore eligendi,
          et eveniet excepturi hic id ipsam itaque modi molestias mollitia nemo nihil obcaecati odit optio pariatur,
          perferendis provident quae quidem quis quo reiciendis repudiandae saepe similique soluta
          suscipit tempore unde voluptate. Aspernatur corporis distinctio facilis,
          fuga hic iste iusto officiis reiciendis soluta tempora tenetur, totam vitae.`,
        title: 'Some header'
      }
    }
  },
  mounted () {
    this._updateModalState(this._getHistoryData())
    window.onpopstate = () => {
      this._updateModalState(this._getHistoryData())
    }
  },
  components: {
    Button,
    ButtonList,
    BottomSheet
  },
  methods: {
    showCard (): void {
      this._updateModalState({ isActive: true, type: 'card' })
      this._pushHistoryData(this.modalState)
    },
    showButtonList (): void {
      this._updateModalState({ isActive: true, type: 'list' })
      this._pushHistoryData(this.modalState)
    },
    closeBottomSheetHandler (): void {
      this._updateModalState({ isActive: false, type: null })
      this._pushHistoryData(this.modalState)
    },

    _updateModalState ({ isActive, type }: IModalState): void {
      this.modalState.isActive = isActive
      this.modalState.type = type
    },
    _pushHistoryData ({ isActive, type }: IModalState): void {
      window.history.pushState({
        isModalActive: isActive,
        activeModalType: type
      }, '')
    },
    _getHistoryData (): IModalState {
      return {
        isActive: window.history.state?.isModalActive,
        type: window.history.state?.activeModalType
      }
    }
  }
})
</script>

<style>
  .page {
    position: relative;
    margin: 0 auto;
    width: 400px;
  }
  .page-Modal__card {
    padding: 20px;
  }
</style>
