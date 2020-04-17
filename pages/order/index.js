import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    tabs:[
      {
        id:0,
        value:"全部订单",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待发货",
        isActive:false
      },
      {
        id:2,
        value:"退款/退货",
        isActive:false
      }
    ],
  },

  onShow(option){
    const token = wx.getStorageSync("token");
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index',
        });
        return;
      }
    // 获取当前小程序的页面栈=数组 长度最大是10
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    const {type} = currentPage.options;
    // 激活选中标题
    this.changeTitleByIndex(type-1)
    this.getOrders(type);
  },

    // 获取列表订单的方法
    async getOrders(type){
      const res = await request({url:"/my/orders/all",data:{type}});
      res.orders.map(v=>{
        return v.create_time_cn=new Date(v.create_time*1000).toLocaleString()
      })
      this.setData({
        // orders:res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
        orders:res.orders
      })
    },

    // 根据标题索引来激活选中标题
    changeTitleByIndex(index){
      let {tabs} = this.data;
      tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
      this.setData({
        tabs
      })
    },
    // 点击tab事件
    handletabsItemChange(e){
      // 获取被点击标题索引
      const {index} = e.detail;
      this.changeTitleByIndex(index);
      // 重新发送请求
      this.getOrders(index+1)
    }
})