// pages/jurassic/jurassic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    userid_server:'legal',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getSystemInfo({
      success (res) {
        console.log("运行环境+"+res.environment)
        if(res.environment=='wxwork'){
          wx.qy.login({
            success: function (login) {
              console.log("code--->" + login.code)
              wx.request({
                url: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
                data: {
                  corpid: 'wxbf4c45e3586fc037',
                  corpsecret: 'mvAdz2HKSLe_IHMsZQcrpme8VhLiOyyh1iYGoZ74NiE'
                },
                success: function (res) {
                  console.log("access_token----->" + res.data.access_token)
                  wx.request({
                    url: 'https://qyapi.weixin.qq.com/cgi-bin/miniprogram/jscode2session',
                    data: {
                      access_token: res.data.access_token,
                      js_code: login.code,
                      grant_type: 'authorization_code',
                    },
                    success: function (user) {
                      console.log("userid==>" + user.data.userid)
                      that.setData({
                        userid: user.data.userid
                      })
                      wx.request({
                        url: 'https://www.maochang.cn/Spring_mybatis/Test/getToken',
                        data: {
                          userid:that.data.userid
                        },
                        success: function (useridinfo) {
                          that.setData({
                            userid_server:useridinfo.data.data
                          })
                          if(useridinfo.data.data=="illegal"){
                            wx.redirectTo({
                              url: '../Error/Error?id=1'
                            })
                          }
                          else{
                            wx.redirectTo({
                              url: '../table/table?define=1'
                            })
                          }
                        },
                      })
                    },
                  }) 
                },
              })
            }
          });
        }
        else{
          wx.redirectTo({
            url: "../Error/Error?id=0"
          })
        }
      }
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

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