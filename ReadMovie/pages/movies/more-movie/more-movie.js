// pages/movies/more-movie/more-movie.js
Page({
  data:{
    navigateTitle:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var category=options.category;
    this.data.navigateTitle=category;
  },
  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  }
  
})