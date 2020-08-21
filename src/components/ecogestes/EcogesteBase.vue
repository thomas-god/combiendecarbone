<script lang="ts">
import Vue from 'vue'
import EcogestePopup from './EcogestePopup.vue'

export default Vue.extend({
  components: { EcogestePopup },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Vélo'
    }
  },
  computed: {
    popup: {
      get(): boolean {
        return this.value
      },
      set(new_value: boolean): void {
        this.$emit('input', new_value)
      }
    }
  }
})
</script>
