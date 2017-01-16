var postData = require('../../../data/postData.js');
var app = getApp();
Page({
    data: {
        isPlayingMusic: false,
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
    // 收藏按钮
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

        wx.showToast({
            title: postCollected ? "收藏成功" : "取消收藏",
            icon: 'success',
            duration: 2000
        })
    },

    //音乐
    onMusicTap: function (event) {
        var currentPostId = this.data.currentPostId;
        var postDataItem = postData.postList.article[currentPostId];
        var isPlayingMusic = this.data.isPlayingMusic;
        console.log(postDataItem.music.url);
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })
        } else {
            wx.playBackgroundAudio({
                dataUrl: postDataItem.music.url,
                title: postDataItem.music.title,
                covrImgUrl: postDataItem.music.coverImg,
            })
            this.setData({
                isPlayingMusic: true
            })
            app.globalData.g_currentMusicPostId = this.data.currentPostId;
            app.globalData.g_isPlayingMusic = true;
        }

    }
})