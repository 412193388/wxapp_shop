// pages/cart/index.js
import {getSetting,openSetting,chooseAddress,showModal,showToast} from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow() {
    // 获取缓存总的收获地址
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart')||[];
    this.setData({address});
    this.setCart(cart)
  },

  async handleChooseAddress(){
    try{
      // 获取权限状态
      const res1= await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 判断权限状态
      if(scopeAddress===false){
        await openSetting();
      };
      const address = await chooseAddress();
      // 存入缓存中
      wx.setStorageSync("address", address)
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
    } catch(error) {
      console.log(error);
    }
  },
  

  // 商品选中事件
  handleItemChange(e){
    // 获取被修改的商品的id
    const goods_id  = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked =! cart[index].checked;
    this.setCart(cart)
  },

  // 商品全选功能
  handleAllChecked(e){
    let {cart,allChecked} = this.data;
    allChecked= !allChecked
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart)
  },

  // 商品数量编辑
  async handleItemNumEdit(e){
    const{operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id===id);
    // 判断是否执行删除
    if(cart[index].num===1&&operation===-1){
      // 弹窗提示
      const res = await showModal({content:"您是否要删除？"});
      if (res.confirm) {
        cart.splice(index,1);
        this.setCart(cart)
      } else if (res.cancel){
        console.log("用户点击取消");
      }
    }else{
      cart[index].num +=operation;
      this.setCart(cart);
    }

  },

  // 设置购物车状态，重新计算底部工具栏的数据
  setCart(cart){
    let allChecked = true
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice +=v.num*v.goods_price;
        totalNum += v.num;
      }else{
        allChecked = false;
      }
    });
    // 全选按钮
    allChecked = cart.length!=0?allChecked:false;
    this.setData({
      cart,
      totalPrice,
      allChecked,
      totalNum
    });
    wx.setStorageSync('cart', cart)
  },

  // 点击结算功能
  async handlePay(){
    const {address,totalNum} = this.data;
    if(!address.userName){
      await showToast({title:"您还没有设置地址"})
      return
    };
    if(totalNum===0){
      await showToast({title:"您还没有购买商品"})
      return
    };
    wx.navigateTo({
      url: '/pages/pay/index'
    })
    
  }

})