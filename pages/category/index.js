import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    leftMenuList:[],
    rightMenuList:[],
    // 被点击左侧菜单
    currentIndex:0,
    // 右侧滚动条顶部距离
    scrollTop:0
    
  },
  // 接口返回数据
  Cates:[],

  onLoad: function(options) {
    //Do some initialize when page load.
    // 获取本都存储中的数据
    const Cates = wx.getStorageSync("cates");
    if (!Cates){
      this.getCates();
    }else{
      // 有旧数据 定义过期时间 10s
      if(Date.now()-Cates.time>1000*10){
        this.getCates();
      }else{
        console.log("可以使用旧数据");
        this.Cates=Cates.data;
        // 构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        // 构造右侧的大菜单数据
        let rightMenuList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
  },
  // 获取分类数据
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    //   .then(res=>{
    //     this.Cates=res.data.message;
    //     // 把接口数据存到本地存储中
    //     wx.setStorageSync("cates", {time:Date.now(),data:this.Cates})
    //     // 构造左侧的大菜单数据
    //     let leftMenuList = this.Cates.map(v=>v.cat_name);
    //     // 构造右侧的大菜单数据
    //     let rightMenuList = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightMenuList
    //     })
    //   })

    // 使用es7的async await来发送请求
    const res = await request({url:"/categories"})
    this.Cates=res;
    // 把接口数据存到本地存储中
    wx.setStorageSync("cates", {time:Date.now(),data:this.Cates})
    // 构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(v=>v.cat_name);
    // 构造右侧的大菜单数据
    let rightMenuList = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightMenuList
    })
  },
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;

    let rightMenuList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightMenuList,
      // 右侧滚动条恢复到顶部
      scrollTop: 0
    });
    
  }
})