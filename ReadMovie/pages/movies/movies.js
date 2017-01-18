// pages/movies/movies.js
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false
  },
  onLoad: function (options) {
    // 正在热映
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    // 即将上映
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    // top250
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },
  getMovieListData: function (url,settedKey) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        that.processDoubanData(res.data,settedKey);
        console.log(res);
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  processDoubanData: function (moviesDouban,settedKey) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars:util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
      }
      movies.push(temp);
    }
    var readyData={};
    readyData[settedKey]={
      movies:movies
    };
    this.setData(readyData);
  },

})