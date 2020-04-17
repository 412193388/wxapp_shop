<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    html,body{
      padding: 0;
      margin: 0;
    }

    .item_introduce{
      padding-left: 20px;
    }
    .item_wrap_row{
      display: flex;
      padding-top: 20px;
    }
    .pages_introduce{
      padding-left: 20px;
      display: flex;
      flex-direction: column;
    }
    .item_wrap{
      display: flex;
      flex: 1;
    }
    .image{
      width: 200px;
      padding-left: 20px;
    }
    img{
      width: 100%;
    }
    .content_wrap{
      padding-left: 20px;
      align-self: center;

    }
    h1,h2,h3{
        padding-left: 20px;
      }
    .title{}
    .content{}
  </style>
</head>
<body>
  <div class="item_introduce">
    <h1>微信购物小程序——采用黑马程序员提供的开源API</h1>
    <h3>
      使用到的前端技术
    </h3>
    <ul>
      <li>小程序Tabbar组件</li>
      <li>自定义Tabs、SearchInput等组件</li>
      <li>采用less样式编辑</li>
      <li>CSS3中var功能</li>
      <li>ES6中的promise</li>
      <li>async和await</li>
      <li>解构赋值</li>
      <li>定时器实现防抖</li>
      <li>项目本地存储存更新</li>
      <li>采用json通讯格式</li>
      <li>微信内置的wx.getSetting、chooseAddress等方法</li>
      <li>...</li>
    </ul>
  </div>
  <div class="pages_introduce">
    <h1>页面介绍</h1>
    <div class="item_wrap_row">
    <!-- 用户页面介绍 -->
      <div class="item_wrap">
        <div class="image">
          <img src="./123/index.png" alt="">
        </div>

        <div class="content_wrap">
          <div class="title">
            <h1>用户页面</h1>
            <h2>实现功能</h2>
          </div>
          <div class="content">
            <ul>
              <li>微信用户登录及头像显示</li>
              <li>收藏页面数据更新和跳转</li>
              <li>全部订单查询</li>
              <li>意见反馈功能</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 购物车页面介绍 -->
      <div class="item_wrap">
        <div class="image">
          <img src="./123/cart.png" alt="">
        </div>

        <div class="content_wrap">
          <div class="title">
            <h2>购物车页面</h2>
            <h3>实现功能</h3>
          </div>
          <div class="content">
            <ul>
              <li>微信用户登录以及地址、token的获取</li>
              <li>购物车数据获取和更新</li>
              <li>总价格计算及发送支付请求</li>
              <li>全选、加减按钮的逻辑控制</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="item_wrap_row">
      <!-- 商品页面介绍 -->
      <div class="item_wrap">
        <div class="image">
          <img src="./123/goods_list.png" alt="">
        </div>
        <div class="content_wrap">
          <div class="title">
            <h1>商品列表页面</h1>
            <h2>实现功能</h2>
          </div>
          <div class="content">
            <ul>
              <li>用户上滑页面更新</li>
              <li>滚动条触底加载下一页数据</li>
              <li>tab组件点击样式更新</li>
              <li>搜索页面跳转</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 分类页面介绍 -->
      <div class="item_wrap">
        <div class="image">
          <img src="./123/category.png" alt="">
        </div>
        <div class="content_wrap">
          <div class="title">
            <h1>分类页面</h1>
            <h2>实现功能</h2>
          </div>
          <div class="content">
            <ul>
              <li>请求数据保存和过期更新</li>
              <li>带参数跳转页面</li>
              <li>搜索页面跳转</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="item_wrap_row">
    <!-- 首页页面介绍 -->
      <div class="item_wrap">
        <div class="image">
          <img src="./123/index.png" alt="">
        </div>
        <div class="content_wrap">
          <div class="title">
            <h1>首页页面</h1>
            <h2>实现功能</h2>
          </div>
          <div class="content">
            <ul>
              <li>轮播图</li>
              <li>导航栏功能</li>
              <li>底部tabBar设置</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 商品详情页面介绍 -->
      <div class="item_wrap">
        <div class="image">
          <img src="./123/item_detail.png" alt="">
        </div>
        <div class="content_wrap">
          <div class="title">
            <h1>商品详情页面</h1>
            <h2>实现功能</h2>
          </div>
          <div class="content">
            <ul>
              <li>轮播图预览大图功能</li>
              <li>加入购物车功能</li>
              <li>商品收藏功能</li>
              <li>分享功能</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="item_wrap_row">
      <!-- 订单查询页面介绍 -->
      <div class="item_wrap">
        <div class="image">
          <img src="./123/order.png" alt="">
        </div>
        <div class="content_wrap">
          <div class="title">
            <h1>订单查询页面</h1>
            <h2>实现功能</h2>
          </div>
          <div class="content">
            <ul>
              <li>顶部tab组件</li>
              <li>订单数据查询</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 搜索页面介绍 -->
      <div class="item_wrap">
        <div class="image">
          <img src="./123/search.png" alt="">
        </div>
        <div class="content_wrap">
          <div class="title">
            <h1>搜索页面</h1>
            <h2>实现功能</h2>
          </div>
          <div class="content">
            <ul>
              <li>取消清空搜索数据</li>
              <li>输入防抖功能</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
