import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import {showToast} from "../../utils/asyncWx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false
  },
  goodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    const {goods_id} = options;
    console.log(goods_id);
    this.getGoodsDetail(goods_id)
      
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
    this.goodsInfo = goodsObj;
    
    // 拿缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect")||[];
    // 判断是否收藏
    let isCollect = collect.some(v=>v.goods_id===this.goodsInfo.goods_id)
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        // 部分手机不识别webp图片格式
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      },
      isCollect
    })
  },
  // 点击轮播图放大预览
  handlePrevewImage(e){
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
// 点击加入购物车
  handleCartAdd(){
    // 获取缓存中购物车数组
    let cart = wx.getStorageSync('cart')||[];
    // 判断商品对象是否存在于购物车
    let index = cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    if(index===-1){
      // 商品不存在 第一次添加
      this.goodsInfo.num=1;
      this.goodsInfo.checked=true;
      cart.push(this.goodsInfo);
    }else{
      // 已经在购物车，数量加一
      cart[index].num++;
    }
    // 放回存储中
    wx.setStorageSync('cart', cart);
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    }); 
  },

  // 点击收藏事件
   async handleCollect(){
    let isCollect = false
    // 获取缓存中的商品收藏数组
    let collect =wx.getStorageSync("collect")||[];
    // 判断商品是否被收藏
    let index = collect.findIndex(v=>v.goods_id===this.goodsInfo.goods_id)
    // 当index！=-1表示收藏过
    if(index!==-1){
      collect.splice(index,1);
      isCollect = false
      await showToast({title:'取消收藏'})
    }else{
      // 没有收藏过
      collect.push(this.goodsInfo);
      isCollect = true
      await showToast({title:'收藏成功'})
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  }
})