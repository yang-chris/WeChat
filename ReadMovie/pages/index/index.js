Page({
  onTap:function(){
    console.log('ok');
    wx.navigateTo({
      url: '/pages/posts/post',
    })
  }
})