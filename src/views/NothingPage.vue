<template>
  <div :class="$style.main">
    <IcScrollHorizontal>
      <IcTimeline :originData="fakeData" />
    </IcScrollHorizontal>
  </div>
</template>
<script>
import { reactive } from 'vue'

export default {
  setup() {
    const fakeData = reactive({
      2000: {
        8: {
          7: {
            title: 'Title 2000/8/7',
            content: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          },
          8: {
            title: 'Title 2000/8/8',
            content: 'content',
          },
          9: {
            title: 'Title 2000/8/9',
            content: 'content',
          },
          10: {
            title: 'Title 2000/8/10',
            content: 'content',
          },
          11: {
            title: 'Title 2000/8/11',
            content: 'content',
            memorialDay: true
          },
          12: {
            title: 'Title 2000/8/12',
            content: 'content',
          },
          13: {
            title: 'Title 2000/8/13',
            content: 'content',
          },
          14: {
            title: 'Title 2000/8/14',
            content: 'content',
          },
          15: {
            title: 'Title 2000/8/15',
            content: 'content',
          },
          16: {
            title: 'Title 2000/8/16',
            content: 'content',
          },
          17: {
            title: 'Title 2000/8/17',
            content: 'content',
          },
          18: {
            title: 'Title 2000/8/18',
            content: 'content',
          },
          30: {
            title: 'Title 2000/8/30',
            content: 'content',
            memorialDay: true
          }
        },
        11: {
          28: {
            title: 'Title 2000/11/28',
            content: 'content',
          },
          30: {
            title: 'Title 2000/11/30',
            content: 'content',
          }
        }
      },
      2001: {
        2: {
          1: {
            title: 'Title 2001/02/01',
            content: 'content',
          },
          3: {
            title: 'Title 2001/02/03',
            content: 'content',
          }
        }
      }
    })
    return {
      fakeData,
    }
  },
  methods: {
  },
  mounted() {
  },
  beforeUnmount() {
  },
}
</script>

<style lang="scss" module>
.main {
  background-color: var(--bgPrimary);
}
</style>
