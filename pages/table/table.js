import * as echarts from '../../ec-canvas/echarts';

let chart = null;

 
function setOption(chart, xdata, ydata){
  var option = {
    //定义图标的标题和颜色
      title: {
        top: 10,
        text: '总销售',
        left: 'center'
      },
      color: ["#37A2DA"], 
      //定义你图标的线的类型种类
      /* legend: {
      data: ['总销售'],
      top: 25,
      left: 'center',
      width: "100%",
      backgroundColor: '#FFFFFF',
      z: 100,
      // show: false,
      }, */
      grid: { 
      containLabel: true
      },
    //当你选中数据时的提示框
      tooltip: {
        show: true,
        trigger: 'axis',
        confine: true
        // position: function (pos, params, dom, rect, size) {
        //   var obj = { top: 1 };
        //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        //   return obj;
        // }
      },
      //	x轴
      xAxis: {
        type: 'category',
        boundaryGap: false,
        //data: ['1','2','3','4','5','6','7'],//x轴数据
        data: xdata,//x轴数据
        
        // x轴的字体样式
        axisLabel: {
          show: true,
          showMaxLabel: true,
          textStyle: {
            color: '#000',
            fontSize: '10',
            align: 'center',
          },
          // interval:0,
          // rotate:60,
          // formatter: '{MM}-{dd}',
        },
        // 控制网格线是否显示
        splitLine: {
          show: false,
          //  改变轴线颜色
          lineStyle: {
            // 使用深浅的间隔色
            color: ['#aaaaaa']
          }
        },
        // x轴的颜色和宽度
        axisLine: {
          lineStyle: {
            color: '#000',
            width: 1,   //这里是坐标轴的宽度,可以去掉
          }
        }
        // show: false //是否显示坐标
      },
      yAxis: {
        x: 'center',
        type: 'value',
        //网格线
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        // show: false
      },
      series: [{
        name: '总销售',
        type: 'line',
        // smooth: true,
        // data: [7,5,21,15,12,30,28]
        data: ydata
      }]
    };
    chart.setOption(option)
}


/* function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);        
  chart.setOption(chart, xdata, ydata);
  return chart;
} */


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
    define_twice:false,
    hidden: true,
    type1: 'primary',
    type2: 'default',
    ec: {
      // onInit: setOption
      lazyLoad: true
    }
    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const that = this.data
    // if(options.define==1){
    //   this.setData({
    //     define_twice:true
    //   })
    // }else{
    //   console.log("这是非法跳转页")
    // }

    // if(!that.define_twice){
    //   wx.redirectTo({
    //     url: '../jurassic/jurassic',
    //   })
    // }
    // else{
    //   console.log("正常跳转页，无需进行再次验证")
    // }
    const timestamp = new Date(); //获取时间戳
    const formatTime = utils.formatTime(timestamp, 'Y-M-D')
    this.setData({
      date: '2021-10-30'
      // date: formatTime
    })

    this.API_INFO()
    this.API_Get_Intro()
    this.monthbtn()
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
    this.oneComponent = this.selectComponent('#mychart');
    const _that = this
    setTimeout(() => {
      _that.API_Get_Messages()
    }, 1000)
    this.API_Get_MaxTime()
  },

  onShow:function(){
  
  },
  

  /**
   * 获取messages的信息
   * @constructor
   */
  API_Get_MaxTime: function () {
    const _that = this.data
    wx.request({
      // url: 'http://localhost:8080/Test/findMaxDate',
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
      // url: 'http://localhost:8080/Test/messages',
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
      // url: 'http://localhost:8080/Test/introduce',
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
      // url: 'http://localhost:8080/Test/findAll',
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
    this.getOption()
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
    return {
      title: '日报表小程序',
      path:'/pages/jurassic/jurassic',
      imageUrl : '/static/icons/basicprofile.png'
    }
  },

  init_one: function (xdata, ydata) {           //初始化第一个图表
    this.oneComponent.init((canvas, width, height) => {
        const chart = echarts.init(canvas, null, {
            width: width,
            height: height
        });
        setOption(chart, xdata, ydata)
        this.chart = chart;
        return chart;
    });
},

  getOption: function () {        //这一步其实就要给图表加上数据
    var _this = this;
    wx.request({
        // url: 'http://localhost:8080/Test/findMonth',    //请求数据的接口地址
        url: 'https://www.maochang.cn/Spring_mybatis/Test/findMonth',
        data: {
          date: this.data.date //行业日期赋值
        },
        success:function(res){
          console.log(res)
          var xList = new Array()
          var yList = new Array()
          for(var i = res.data.data.dateArrList.length - 7 ;i < res.data.data.dateArrList.length; i++){  //通过定义一个局部变量k遍历获取到了map中所有的key值  
            xList.push(res.data.data.dateArrList[i]); //获取到了key所对应的value的值！
            yList.push(res.data.data.dayTotalList[i]);
          }  
          _this.init_one(xList,yList)
          // _this.init_one(res.data.data.dateArrList,res.data.data.dayTotalList)
          // _this.init_one(['2020-03-10','2020-03-11','2020-03-12','2020-03-13','2020-03-14','2020-03-15','2020-03-16'],[12,17,23,6,17,22,12])
          // _this.init_one(['10-21','10-22','10-23','10-24','10-25','10-26','10-27'],[356.45,318.76,467.1,369,234.19,350.11,341.06])
        }
    })  
  },
  weekbtn: function(e) {
    console.log("触发了点击事件，近1周数据")
    this.setData({type1: 'primary'});
    this.setData({type2: 'default'});
    // status = false
    // this.setData({hidden: false})
    var _this = this;
    wx.request({
        // url: 'http://localhost:8080/Test/findMonth',    //请求数据的接口地址
        url: 'https://www.maochang.cn/Spring_mybatis/Test/findMonth',
        data: {
          date: this.data.date //行业日期赋值
        },
        success:function(res){
          var xList = new Array()
          var yList = new Array()
          for(var i = res.data.data.dateArrList.length - 7 ;i < res.data.data.dateArrList.length; i++){  //通过定义一个局部变量k遍历获取到了map中所有的key值  
            // console.log('dateArrList:  '+res.data.data.dateArrList[i]);
            // console.log('dateArrList:  '+res.data.data.dayTotalList[i]);
            xList.push(res.data.data.dateArrList[i]); //获取到了key所对应的value的值！
            yList.push(res.data.data.dayTotalList[i]);
            // console.log(xList)
            // console.log(yList)
          }  
          _this.init_one(xList,yList)
        }
    })  
  },

  toastHide: function(e){
    console.log("触发bindchange，隐藏toast")
    // status = true
    // this.setData({ hidden: true })
  },

  monthbtn: function(e){
    console.log("触发了点击事件，1个月数据")
    this.setData({type1: 'default'});
    this.setData({type2: 'primary'});
    var _this = this;
    wx.request({
        // url: 'http://localhost:8080/Test/findMonth',    //请求数据的接口地址
        url: 'https://www.maochang.cn/Spring_mybatis/Test/findMonth',
        data: {
          date: this.data.date //行业日期赋值
        },
        success:function(res){
          var xList = new Array()
          var yList = new Array()
          for(var i = res.data.data.dateArrList.length - 30 ;i < res.data.data.dateArrList.length; i++){  //通过定义一个局部变量k遍历获取到了map中所有的key值  
            xList.push(res.data.data.dateArrList[i]); //获取到了key所对应的value的值！
            yList.push(res.data.data.dayTotalList[i]);
          }  
          _this.init_one(xList,yList)
       } 
    })
  },
})