<template>
  <composition :composition="composition">
    <div>
      <slot-content slotName="hero" />

      <div class="grid grid-cols-3 gap-4 pb-6">
        <div class="col-span-2">
          <slot-content slotName="main" />
        </div>
        <div>
          <slot-content slotName="sidebar" />
        </div>
      </div>

      <slot-content slotName="footer" />
    </div>
  </composition>
</template>

<script>
import { enhanceDefaultComposition } from '~/lib/enhancers.js'


export default {
  async asyncData({ $uniformCanvasNuxt, params }) {
    // fetching the compostion as we did before
    const { composition } = await $uniformCanvasNuxt.getCompositionBySlug({
      slug: '/categories/' + params.name,
    })

    await enhanceDefaultComposition(composition, process.env.CTF_SPACE_ID, process.env.CTF_CDA_ACCESS_TOKEN, params)
    
    return { composition }
  },
}
</script>
