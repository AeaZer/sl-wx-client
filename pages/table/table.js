// pages/tabTwo/tabTwo.js
const utils = require('../../Utils/TimeFormat.js')
const {
  $Message
} = require('../../dist/base/index');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancel: false,
    listData: [],
    list_length: 0,
    name: 'name1',
    showSecond: false,
    showRoom: false,
    day_total: 0,
    month_total: 0,
    index_flag: 0,
    index_second: 0,
    count: 1,
    message: ['数据请求失败，请联系信息技术部专员-小何'],
    intro: [],
    visible: false,
    spinShow: false,
    maxTime: '',
    notice_visible: true,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const timestamp = new Date(); //获取时间戳
    const formatTime = utils.formatTime(timestamp, 'Y-M-D')
    this.setData({
      date: formatTime
    })

    this.API_INFO()
    this.API_Get_Intro()
    const _that = this
    setInterval(function () {
      _that.setData({
        notice_visible: false
      })
    }, 4000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const _that = this
    setTimeout(() => {
      _that.API_Get_Messages()
    }, 1000)
    this.API_Get_MaxTime()
  },

  /**
   * 获取messages的信息
   * @constructor
   */
  API_Get_MaxTime: function () {
    const _that = this.data
    wx.request({
      url: 'https://www.maochang.cn/Spring_mybatis/Test/findMaxDate',
      data: {},
      success: (res) => {
        console.log(res)
        this.setData({
          maxTime: res.data.data
        })
      }
    })
  },

  API_Get_Messages: function () {
    console.log("我被延迟执行了")
    const _that = this.data
    wx.request({
      url: 'https://www.maochang.cn/Spring_mybatis/Test/messages',
      data: {},
      success: (res) => {
        console.log(res)
        const len = res.data.data.length
        this.setData({
          message: res.data.data,
          count: len
        })
      }
    })

  },

  /**
   * 获取introduce的信息
   * @constructor
   */

  API_Get_Intro: function () {
    const _that = this.data
    wx.request({
      url: 'https://www.maochang.cn/Spring_mybatis/Test/introduce',
      data: {},
      success: (res) => {
        console.log(res)
        this.setData({
          intro: res.data.data,
        })
      }
    })

  },
  /**
   * 获取集合信息
   * @constructor
   */
  API_INFO: function () {
    const _that = this.data
    this.setData({
      spinShow: true
    })
    wx.request({
      url: 'https://www.maochang.cn/Spring_mybatis/Test/findAll',
      data: {
        date: this.data.date //行业日期赋值
      },
      success: (res) => {
        console.log(res)
        this.setData({
          listData: res.data.data,
          list_length: res.data.data.length,
          day_total: res.data.dayTotal,
          month_total: res.data.monthTotal,
          spinShow: false
        })
        if (this.data.day_total == 0 || this.data.list_length == 0) {
          $Message({
            content: '所选日期数据还没更新哦,请尝试更换时间',
            type: 'warning',
            duration: 2
          });
        }
      },
      fail: (res) => {
        this.setData({
          spinShow: false
        })
        $Message({
          content: '网络/服务器开小差了，稍等片刻再做尝试',
          type: 'error',
          duration: 4
        });
      }
    })

  },

  /**
   * 点击行业的行发生的一系列变化逻辑
   * @param e
   */
  click_indus: function (e) {
    const _that = this.data
    this.setData({
      showSecond: !this.data.showSecond,
      showRoom: false,
      index_flag: e.currentTarget.dataset.indus
    })
    console.log("index_flag" + _that.index_flag)
  },

  /**
   * 点击二级机构的行发生一系列的数据逻辑的改变
   * @param e
   */
  click_second: function (e) {
    const _that = this.data
    this.setData({
      showRoom: !this.data.showRoom,
      index_flag: e.currentTarget.dataset.indus,
      index_second: e.currentTarget.dataset.second
    })
    console.log("index_flag" + _that.index_flag)
  },

  /**
   *
   */
  handleOpen1: function () {
    this.setData({
      visible: true
    });
  },

  /**
   * 监听introduce的提示框
   */
  open: function () {
    console.log("提示框出来了")
    this.setData({
      visible: true
    })
  },

  /**
   * 日期的监听方法
   * @param e
   */
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    this.API_INFO()
  },

  /**
   * 关闭introduce的监听方法
   */
  handleClose1: function () {
    this.setData({
      visible: false
    });
  },

  /**
   * 点击message控件的监听方法
   */
  handleSuccess: function () {
    if (this.data.count != 0) {
      const str_msg = this.data.message[this.data.count - 1]
      $Message({
        content: str_msg,
        type: 'success'
      });
      this.setData({
        count: this.data.count - 1
      })
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})