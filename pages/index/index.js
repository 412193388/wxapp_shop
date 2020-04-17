//Page Object
//引用发送请求的方法
import { request } from "../../request/index.js"

Page({
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    catesList:[],
    // 楼层数据
    floorList:[]
  },
  //options(Object)
  onLoad: function(options){
    // 发送异步请求
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //       swiperList:result.data.message
    //     });
    //   },
    //   fail: () => {},
    //   complete: () => {}
    // });
     this.getSwiperList();
     this.getcatesList();
     this.getFloorList()

  },
  getSwiperList(){
    request({url: '/home/swiperdata'})
     .then(result=>{
        console.log(result);
        result.forEach(v=>v.navigator_url=v.navigator_url.replace(/main/g,'index'))
        this.setData({
          swiperList:result
        });
     })
  },
  getcatesList() {
    request({url: '/home/catitems'})
    .then(result=>{
       console.log(result);
       this.setData({
        catesList:result
       });
    })
  },
  getFloorList() {
    request({url: '/home/floordata'})
    .then(result=>{
       console.log(result);
       result.forEach(v1=>v1.product_list.forEach(v2=>v2.navigator_url=v2.navigator_url.replace(/goods_list/g,'goods_list/index')))
       this.setData({
        floorList:result
       });
    })
  }
});
