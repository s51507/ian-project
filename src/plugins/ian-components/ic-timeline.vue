<template>
  <div :class="$style.main">
    <div :class="$style.historyContainer">
      <template v-for="y in timelineData" :key="y.year">
        <div :class="$style.yearContainer">
          <div :class="$style.yearTitle">{{ y.year }}</div>
          <div :class="$style.monthsContainer">
            <template v-for="m in y.months" :key="m.month">
              <div :class="$style.month">
                <div :class="$style.monthTitle">{{ m.month }}月</div>
                <div :class="$style.timeline">
                  <template v-for="d in m.days" :key="d.day">
                    <div :class="[$style.dot, {[$style.hasEvent]: d.title}, d.className]" @click="handleDayClick(d)">
                      <div :class="$style.date">{{ d.day }}</div>
                      <div v-if="d.title" :class="$style.dayTitle">{{ d.title }}</div>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <div :class="$style.detailContainer">
      <div :class="$style.title" :style="genTitleStyle">
        <span :class="$style.bracket" ref="title">{{ selectDayData.title }}</span>
        <transition name="fade">
          <span :class="$style.display" v-if="showDetail">{{ selectDayData.title }}</span>
        </transition>
      </div>
      <div :class="$style.content">
        <transition name="fade">
          <span v-if="showDetail">{{ selectDayData.content }}</span>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch, nextTick } from 'vue'
import getRandomNumber from '@/utils/getRandomNumber'

export default {
  props: {
    originData: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    // const timelineDataFake = [
    //   {
    //     year: 2001,
    //     months: [
    //       {
    //         month: 2  ,
    //         days: [
    //           { day: 1, title: 'Title 2001/02/01', content: 'content' },
    //           { day: 2 },
    //           { day: 3, title: 'Title 2001/02/03', content: 'content', memorialDay: true }
    //         ]
    //       }
    //     ]
    //   }
    // ]
    const timelineData = reactive([])
    const selectDayData = reactive({
      "day": 0,
      "title": "什麼都沒有",
      "content": "點日期可以看到詳情呦",
      "className": "_positionThird_11vyo_126"
    })
    const titleElement = ref(null)
    const titleWidth = ref(240)
    const showDetail = ref(true)

    // 點擊日期後，下方title寬度變化
    watch(
      () => selectDayData.title,
      () => {
        titleWidth.value = 0
        nextTick(() => {
          titleWidth.value = titleElement.value.getBoundingClientRect().width + 30
        })
      }
    )
    return {
      timelineData,
      selectDayData,
      titleElement,
      titleWidth,
      showDetail,
    }
  },
  computed: {
    genTitleStyle() {
      return {
        width: `${this.titleWidth}px`
      }
    }
  },
  methods: {
    generateBaseTimeline() {
      const years = Object.keys(this.originData).map(y => Number(y))

      const startYear = Number(years[0])
      const startMonth = Number(Object.keys(this.originData[startYear])[0])
      const startDay = Number(Object.keys(this.originData[startYear][startMonth])[0])

      const endYear = Number(years[years.length - 1])
      const endYearMonths = Object.keys(this.originData[endYear])
      const endMonth = Number(endYearMonths[endYearMonths.length - 1])
      const endYearMonthDays = Object.keys(this.originData[endYear][endMonth])
      const endDay = Number(endYearMonthDays[endYearMonthDays.length - 1])

      const generateInfo = {
        startYear,
        startMonth,
        startDay,
        endYear,
        endMonth,
        endDay,
      }
      
      this.timelineData = years.map((year) => {
        const isStartYear = (year === generateInfo.startYear)
        const isEndYear = (year === generateInfo.endYear)
        return this.generateYearData(year, { ...generateInfo, isStartYear, isEndYear })
      })

      this.generateDayClass()
    },
    generateYearData(year, generateInfo) {
      // 第一個月份
      let startMonth = 1
      // 這年總共有幾個月
      let monthsLength = 12

      // 起始年 - 從資料第一個月開始
      if (generateInfo.isStartYear) {
        startMonth = generateInfo.startMonth
        monthsLength = monthsLength - generateInfo.startMonth + 1
      }
      // 最後一年 - 資料最後一個月結束
      if (generateInfo.isEndYear) {
        monthsLength = generateInfo.endMonth
      }
      // 開始結束同一年
      if (generateInfo.isStartYear && generateInfo.isEndYear) {
        monthsLength = generateInfo.endMonth - generateInfo.startMonth + 1
      }

      const months = Array.from({ length: monthsLength }, (_arr, idx) => {
        const thisMonth = idx + startMonth
        // 是否為第一年的第一個月份
        const isStartMonth = generateInfo.isStartYear && (thisMonth === generateInfo.startMonth)
        // 是否會最後一年的最後一個月份
        const isEndMonth = generateInfo.isEndYear && (thisMonth === generateInfo.endMonth)
        return this.generateMonthData(year, thisMonth, { ...generateInfo, isStartMonth, isEndMonth })
      })
      return { year, months }
    },
    generateMonthData(year, month, generateInfo) {
      // 第一天日期
      let startDay = 1
      // 最後一天日期
      let endDay = new Date(year, month, 0).getDate()
      // 總天數
      let dayLength = endDay
      if (generateInfo.isStartMonth) {
        startDay = generateInfo.startDay
        dayLength = endDay - generateInfo.startDay + 1
      }
      if (generateInfo.isEndMonth) {
        // 結束月份代表目前在當月，結束日期選今天就好惹
        const nowDate = new Date().getDate()
        // 防個呆以防萬一 (?) ，如果目前日期比較大的話(沒意外的話肯定比較大，就用今天的日期
        dayLength = (nowDate > generateInfo.endDay) ? nowDate : generateInfo.endDay
      }

      const days = Array.from({ length: dayLength }, (_arr, idx) => {
        const thisDay = idx + startDay
        const isLastDate = idx === dayLength - 1
        // 結束月份 && 最後一天
        const dateData = (generateInfo.isEndMonth && isLastDate) ? { title: '今天', content: '未來還有很多很多日子可以一起創造回憶呦～' } : {}
        return this.generateDayData(year, month, thisDay, dateData)
      })
      return { month, days }
    },
    generateDayData(year, month, day, dateData) {
      return {
        year,
        month,
        day,
        ...dateData,
        ...this.originData[year]?.[month]?.[day],
      }
    },
    generateDayClass() {
      const classList = [this.$style.positionFirst, this.$style.positionSecond, this.$style.positionThird, this.$style.positionFourth]

      this.timelineData.map((yObj, yIdx) => yObj.months.map((mObj, mIdx) => mObj.days.map((dObj, dIdx) => {
        if (!dObj.title) return

        if (dObj.memorialDay) return (dObj.className = this.$style.memorialDay)

        // 先隨機出一個class
        const randomClassName = classList[getRandomNumber(0, classList.length)]
        // 昨天
        const yesterday = this.findYesterday(yIdx, mIdx, dIdx)
        // 沒有昨天的話就直接給class了
        if (!yesterday) return (dObj.className = randomClassName)

        // 前天
        const beforeYesterday = this.findYesterday(yesterday.y, yesterday.m, yesterday.d)
        const yesterdayClass = this.timelineData[yesterday.y].months[yesterday.m].days[yesterday.d].className
        const beforeYesterdayClass = beforeYesterday && this.timelineData[beforeYesterday.y].months[beforeYesterday.m].days[beforeYesterday.d].className
        const usedClassList = [yesterdayClass, beforeYesterdayClass]
        // 都沒用過的話就給class囉
        if (!usedClassList.includes(randomClassName)) return (dObj.className = randomClassName)

        // 找出沒用過的class再隨機一次
        const unusedClassList = classList.filter(className => !usedClassList.includes(className))
        dObj.className = unusedClassList[getRandomNumber(0, unusedClassList.length)]
      })))
    },
    findYesterday(y, m, d) {
      // 當月還有前一天的話
      if (d) return { y, m, d: d - 1 }
      
      // 當年還有前一個月的話
      if (m) {
        const preMonthIdx = m - 1
        const preMonthLastDayIdx = this.timelineData[y].months[preMonthIdx].days.length - 1
        return { y, m: preMonthIdx, d: preMonthLastDayIdx }
      }

      // 還有前一年的話
      if (y) {
        const preYearIdx = y - 1
        const preYearLastMonthIdx = this.timelineData[preYearIdx].months.length - 1
        const preYearLastMonthLastDayIdx = this.timelineData[preYearIdx].months[preYearLastMonthIdx].days.length - 1
        return { y: preYearIdx, m: preYearLastMonthIdx, d: preYearLastMonthLastDayIdx }
      }

      // 什麼都沒有的話
      return
    },
    handleDayClick(d) {
      // 空事件
      if (!d.title) return

      const { year, month, day } = this.selectDayData
      // 跟目前選擇的同一天
      if ((d.year === year) && (d.month === month) && (d.day === day)) return

      this.showDetail = false
      setTimeout(() => {
        this.showDetail = true
      }, 300)

      Object.assign(this.selectDayData, d)
    }
  },
  beforeMount() {
    this.generateBaseTimeline()
  },
  mounted() {
    this.titleElement = this.$refs.title
  },
  beforeUnmount() {

  }
}
</script>

<style lang="scss" module>
$memorialDayColor: #2fb8ac;
$positionFirstColor: #86c28b;
$positionSecondColor: #7db4b5;
$positionThirdColor: #61ada0;
$positionFourthColor: #558E6C;

.main {
  height: 100vh;
  padding: 20px 80px 20px 50px;
  position: relative;
  .historyContainer {
    display: inline-flex;
    position: relative;
    .yearContainer {
      position: relative;
      // 最後面的箭頭
      &:last-child > .monthsContainer > .month:last-child > .timeline::after {
        content: " ";
        position: absolute;
        bottom: calc(50% - 15px);
        left: calc(100% + 14px);
        margin-left: -15px;
        border-width: 15px 15px 15px 45px;
        border-style: solid;
        border-color: transparent transparent transparent var(--textPrimary);
      }
      .yearTitle {
        width: 150px;
        font-size: 48px;
        font-weight: 600;
        margin-bottom: 30px;
        color: var(--textPrimary);
        position: sticky;
        left: 0px;
      }
      .monthsContainer {
        position: relative;
        display: inline-flex;
        .month {
          position: relative;
          .monthTitle {
            width: 100px;
            font-size: 36px;
            font-weight: 600;
            margin-bottom: 50px;
            color: var(--textPrimary);
            position: sticky;
            left: 0px;
          }
          .timeline {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
            background: linear-gradient(transparent 40%, var(--textPrimary) 40%, var(--textPrimary) 60%,transparent 60%);
            .dot {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 30px;
              height: 30px;
              margin-right: 35px;
              border-radius: 99em;
              color: var(--textDisable);
              border: 3px solid var(--textPrimary);
              background-color: var(--textPrimary);
              &.hasEvent {
                color: var(--white);
                cursor: pointer;
              }
              & > .date {
                font-weight: 600;
              }
              & > .dayTitle {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                left: -20px;
                width: 150px;
                height: 30px;
                border-radius: 10px;
                color: var(--white);
                border: 3px solid var(--textPrimary);
                &::before {
                  content: "";
                  position: absolute;
                  left: 26px;
                  width: 4px;
                }
              }
              &.memorialDay {
                border-color: $memorialDayColor;
                background-color: $memorialDayColor;
                & > .dayTitle {
                  top: -50px;
                  border-color: $memorialDayColor;
                  background-color: $memorialDayColor;
                  &::before {
                    top: 27px;
                    height: 20px;
                    background-color: $memorialDayColor;
                  }
                }
              }
              &.positionFirst {
                border-color: $positionFirstColor;
                background-color: $positionFirstColor;
                & > .dayTitle {
                  top: 50px;
                  z-index: 40;
                  border-color: $positionFirstColor;
                  background-color: $positionFirstColor;
                  &::before {
                    top: -27px;
                    height: 27px;
                    background-color: $positionFirstColor;
                  }
                }
              }
              &.positionSecond {
                border-color: $positionSecondColor;
                background-color: $positionSecondColor;
                & > .dayTitle {
                  top: 100px;
                  z-index: 30;
                  border-color: $positionSecondColor;
                  background-color: $positionSecondColor;
                  &::before {
                    top: -77px;
                    height: 77px;
                    background-color: $positionSecondColor;
                  }
                }
              }
              &.positionThird {
                border-color: $positionThirdColor;
                background-color: $positionThirdColor;
                & > .dayTitle {
                  top: 150px;
                  z-index: 20;
                  border-color: $positionThirdColor;
                  background-color: $positionThirdColor;
                  &::before {
                    top: -127px;
                    height: 127px;
                    background-color: $positionThirdColor;
                  }
                }
              }
              &.positionFourth {
                border-color: $positionFourthColor;
                background-color: $positionFourthColor;
                & > .dayTitle {
                  top: 200px;
                  z-index: 10;
                  border-color: $positionFourthColor;
                  background-color: $positionFourthColor;
                  &::before {
                    top: -177px;
                    height: 177px;
                    background-color: $positionFourthColor;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .detailContainer {
    position: sticky;
    margin-top: 270px;
    left: 50px;
    height: 400px;
    width: calc(100vw - 100px);
    max-width: 1180px;
    padding: 50px 20px 20px 20px;
    border-radius: 20px;
    border: 3px solid var(--white);
    background-color: #b6c79c;
    .title {
      position: absolute;
      top: -40px;
      padding: 5px 10px;
      font-size: 40px;
      border-radius: 10px;
      font-weight: 600;
      overflow: hidden;
      white-space: nowrap;
      color: var(--white);
      border: 3px solid var(--white);
      background-color: #b6c79c;
      font-family: 'JasonHandwriting2';
      transition: .3s;
      & > .bracket {
        opacity: 0;
      }
      & > .display {
        position: absolute;
        left: 10px;
      }
    }
    .content {
      font-size: 20px;
      font-weight: 600;
      color: var(--white);
      white-space: pre-line;
      font-family: 'JasonHandwriting2';
    }
  }
}
</style>
