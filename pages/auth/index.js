import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx.js"
Page({
  // 获取用户信息
  async handleGetUserInfo(e){
    try {
      // 获取用户信息
    const { encryptedData,rawData,iv,signature} =e.detail
    // 获取登陆成功的code
    const {code} = await login();
    // 发送请求
    const loginParams={encryptedData,rawData,iv,signature}
    let {token} = await request({url:"/users/wxlogin",data:loginParams,method:"post"})
    wx.setStorageSync("token", token)
    wx.navigateBack({
      delta: 1
    });
      
    } catch (error) {
      console.log(error);
      // 虚拟的token 用来测试
      let token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      wx.setStorageSync("token", token)
      wx.navigateBack({
        delta: 1
      });
    }
  }
})