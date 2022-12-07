import Base from './base.js'

export default {
  light: {
    ...Base.light,
    primary: '#333333',
    primaryHover: '#333333',
    primaryActive: '#444444',

    secondary: '#CC2330',
    secondaryHover: '#B31F2A',
    secondaryActive: '#E62736',

    itemHoverBg: 'rgba(230, 53, 53, 0.05)',

    inputActive: '#333333',
    inputActiveShadow: '#989BA3',

    gradualPrimary: 'linear-gradient(180deg, #878787 0%, #3A3A3A 39.99%, #262626 100%)',
    gradualSecondary: 'linear-gradient(90deg, #878787 0%, #262626 100%)',

    iconGradualStart: '#1732FF',
    iconGradualEnd: '#0C186C',

    betInfoBg: '#CC2330',
    bettingCellBg: '#333333',
    lotteryInfoRoundText: '#FFFFFF',
    lotteryInfoCountdownText: '#FFFFFF',
    lotteryInfoCountdownBgText: 'rgba(255, 255, 255, 0.1)',

    toastSuccessBg: '#333333',

    allCouponBgGradual: 'linear-gradient(48.99deg, #22282B 0%, #00637E 100%)',

    k3Active: 'linear-gradient(153.72deg, #CC2330 0%, #DA7D84 93.17%, #D31120 99.95%)',
  },
  dark: {
    ...Base.dark,
    primary: '#333333',
    primaryHover: '#333333',
    primaryActive: '#444444',

    secondary: '#CC2330',
    secondaryHover: '#B31F2A',
    secondaryActive: '#E62736',

    itemHoverBg: 'rgba(230, 53, 53, 0.05)',

    inputActive: '#333333',
    inputActiveShadow: '#989BA3',

    gradualPrimary: 'linear-gradient(180deg, #878787 0%, #3A3A3A 39.99%, #262626 100%)',
    gradualSecondary: 'linear-gradient(90deg, #878787 0%, #262626 100%)',

    iconGradualStart: '#1732FF',
    iconGradualEnd: '#0C186C',

    betInfoBg: '#CC2330',
    bettingCellBg: '#333333',
    lotteryInfoRoundText: '#FFFFFF',
    lotteryInfoCountdownText: '#FFFFFF',
    lotteryInfoCountdownBgText: 'rgba(255, 255, 255, 0.1)',

    toastSuccessBg: '#333333',

    allCouponBgGradual: 'linear-gradient(48.99deg, #22282B 0%, #00637E 100%)',

    k3Active: 'linear-gradient(153.72deg, #CC2330 0%, #DA7D84 93.17%, #D31120 99.95%)',
  }
}
