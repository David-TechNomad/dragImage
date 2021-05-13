//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    current: 0,
    swiperList: [{
      show: false,
      fullImage: '/assets/images/pro1/pro_1_suc.jpg',
      list: [{
        url: '/assets/images/pro1/pro_1_01',
        id: 0
      }, {
        url: '/assets/images/pro1/pro_1_02',
        id: 2
      }, {
        url: '/assets/images/pro1/pro_1_03',
        id: 4
      }, {
        url: '/assets/images/pro1/pro_1_04',
        id: 5
      }, {
        url: '/assets/images/pro1/pro_1_05',
        id: 1
      }, {
        url: '/assets/images/pro1/pro_1_06',
        id: 10
      }]
    }, {
      show: false,
      fullImage: '/assets/images/pro2/pro_2_suc.jpg',
      list: [{
        url: '/assets/images/pro2/pro_2_01',
        id: 7
      }, {
        url: '/assets/images/pro2/pro_2_02',
        id: 6
      }, {
        url: '/assets/images/pro2/pro_2_03',
        id: 3
      }, {
        url: '/assets/images/pro2/pro_2_04',
        id: 11
      }]
    }],
    selectList: [{
      url: '/assets/images/prolist/pic1.png',
      txt: '有机椰汁水',
      txt2: '为肌肤提供营养',
      show: true
    }, {
      url: '/assets/images/prolist/pic2.png',
      txt: '阿尔卑斯玫瑰',
      txt2: '排除毒素与污染物',
      show: true
    }, {
      url: '/assets/images/prolist/pic3.png',
      txt: '针叶樱桃',
      txt2: '富含维生素C,提亮肤色',
      show: true
    }, {
      url: '/assets/images/prolist/pic4.png',
      txt: '有机苦橙花',
      txt2: '柔嫩肌肤',
      show: true
    }, {
      url: '/assets/images/prolist/pic5.png',
      txt: '有机枸杞子',
      txt2: '提供能量',
      show: true
    }, {
      url: '/assets/images/prolist/pic6.png',
      txt: '有机无花果',
      txt2: '补水保湿',
      show: true
    }, {
      url: '/assets/images/prolist/pic7.png',
      txt: '有机绣线菊',
      txt2: '净化肌肤',
      show: true
    }, {
      url: '/assets/images/prolist/pic8.png',
      txt: '辣木',
      txt2: '温和去除彩妆与污染物',
      show: true
    }]
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindchange(event) {
    this.setData({
      current: event.detail.current
    })
  },
  touchEnd(event) {
    debugger;
    const index = event.currentTarget.dataset.index
    var bool = true
    let val = this.data.selectList[index]
    const selectList = this.data.selectList
    let swiperList = this.data.swiperList
    let areaList = swiperList[this.data.current].list
    this._observer = wx.createIntersectionObserver(this)
    this._observer
      .relativeTo('#movable' + index)
      .observe('.swiper-item' + index, res => {
        if (res.intersectionRatio > 0.5) {
          const areaIndex = areaList.findIndex(v => index === v.id)
          if (!areaList[areaIndex].show) {
            if (areaIndex || areaIndex === 0) {
              (areaList[areaIndex].show = true)
            }
            val.show = false
            selectList[index] = val
            this.setData({
              selectList,
              swiperList
            })
          }
        }
      })
    setTimeout(() => {
      if (bool) {
        val.x = 0
        val.y = 0
        val.show = true
        selectList[index] = val
        this.setData({
          selectList
        })
      }
      let num = 0
      areaList.forEach(v => {
        if (v.show) num++
      })
      if (num === (areaList.length - 1)) {
        swiperList[this.data.current].show = true
        this.setData({
          swiperList
        })
      }
    }, 100)
  },
  changeCurrent(event) {
    let current = 0
    const length = this.data.swiperList.length
    if (event.currentTarget.dataset.current === 'left') {
      current = this.data.current - 1
      current === -1 && (current = length - 1)
    } else {
      current = this.data.current + 1
      current > (length - 1) && (current = 0)
    }
    this.setData({
      current
    })
  }
})