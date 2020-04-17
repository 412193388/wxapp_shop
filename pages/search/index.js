import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    goods:[],
    // 控制按钮是否显示
    isFocus:false,
    inpValue:""
  },
  // 定时器
  TimeId:-1,
  // 输入框改变，会触发的事件
  handleInput(e){
    // 获取输入框的值
    const {value} = e.detail
    // 检测合法性
    if(!value.trim()){
      // 值不合法
      clearTimeout(this.TimeId);
      this.TimeId=setTimeout(() => {
        this.setData({
          goods:[],
          isFocus:false
        })
      }, 1000);
      console.log("ok");
      

      return
    }else{
      // 显示取消按钮
      this.setData({
        isFocus:true
      });
      // 合法 利用定时器来实现防抖
      clearTimeout(this.TimeId);
      this.TimeId=setTimeout(() => {
        this.qsearch(value);
      }, 1000);
      
    }
  },

  //发送请求获取搜索建议 数据
  async qsearch(query){
    const res = await request({url:"/goods/qsearch",data:{query}})
    this.setData({
      goods:res
    })
  },

  // 取消事件
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }
})