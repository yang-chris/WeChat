var postData = require('../../../data/postData.js');
Page({
    data: {

    },
    onLoad: function (options) {
        var postId = options.id;
        this.data.currentPostId = postId;
        var detaileData = postData.postList.article[postId];
        // this.data.detaileData= detaileData;
        this.setData(detaileData);

        var postsCollected = wx.getStorageSync('posts_collected');
        if (postsCollected) {
            var postCollected = postsCollected[postId];
            this.setData({
                collected: postCollected
            })
        } else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected);
        }
    },

    onCollectionTap: function (event) {
        var postsCollected = wx.getStorageSync('posts_collected');
        var postCollected = postsCollected[this.data.currentPostId];
        postCollected = !postCollected;
        // 更新文章的是否缓存值
        postsCollected[this.data.currentPostId] = postCollected;
        wx.setStorageSync('posts_collected', postsCollected);
        // 更新数据绑定变量,从而切换图片
        this.setData({
            collected: postCollected
        })
    }
})