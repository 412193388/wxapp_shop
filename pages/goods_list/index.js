

import { values } from "../../lib/runtime/runtime";
import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/goods_list/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[],

  },
  // 接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid||"";
    this.QueryParams.query = options.query||"";
    this.getGoodList();
  },
  // 页面上滑滚动条触底
  onReachBottom(){
    // 判断有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      // 没有下一页数据
      // console.log("没有数据");
      wx.showToast({
        title: '没有下一页数据'
      });
    }else{
      // 还有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodList();
    }
  },
  // 下拉刷新页面
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    });
    this.QueryParams.pagenum = 1;
    this.getGoodList();
  },


  // 请求商品搜索接口
  async getGoodList(){
    const res = await request({url:"/goods/search",data:this.QueryParams});
    // 获取总条数
    const total = res.total;
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
    console.log(this.totalPages);
    
    this.setData({
      // 拼接数组
      goodsList:[...this.data.goodsList,...res.goods]
    });
    // 手动关闭等待效果
    wx.stopPullDownRefresh();
  },
  // 点击tab事件
  handletabsItemChange(e){
    // 获取被点击标题索引
    const {index} = e.detail
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  }
})