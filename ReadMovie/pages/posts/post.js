var postData=require('../../data/postData.js');

Page({
    data:{
        
    },
    onLoad:function(options){
        this.setData({
            post_key:postData.postList
        });
    },
    onPostTap:function(event){
        var postId=event.currentTarget.dataset.postid;
        console.log(postId);
        wx.navigateTo({
          url: 'post-detail/post-detail?id='+postId,
        })
    }
})