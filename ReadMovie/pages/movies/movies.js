// pages/movies/movies.js
var app=getApp();
Page({
  data:{
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false
  },
  onLoad:function(options){
    // 正在热映
    var inTheatersUrl=app.globalData.doubanBase+"/v2/movie/in_theaters";
    // 即将上映
    var comingSoonUrl=app.globalData.doubanBase+"/v2/movie/coming_soon";
    // top250
    var top250Url=app.globalData.doubanBase+"/v2/movie/top250";
    
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },
  // processDoubanData:function(moviesDouban,settedKey,categoryTitle){
  //   var movies=[];
  //   for(var idx in moviesDouban.subjects){
  //     var subject=moviesDouban.subject[idx];
  //     var title=subject.title;
  //     if(title.length>=6){
  //       title=title.substring(0,6)+"...";
  //     }
  //     var temp={
  //       stars:util.converToStarsArray(subject.rating.stars),
  //       title:title,
  //       average:subject.rating.average,
  //       coverageUrl:subject.images.large,
  //       movieId:subject.id,
  //     }
  //     movies.push(temp);
  //   }
  //   var readyData={};
  //   readyData[settedKey]={
  //     categoryTitle:categoryTitle,
  //     movies:movies,
  //   }
  //   this.setData(readyData);
  // },
  getMovieListData:function(url, settedKey, categoryTitle){
    var that=this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       header: {
         "Content-Type":"json"
       }, // 设置请求的 header
      success: function(res){
        // success
        that.processDOubanData(res.data, settedKey, categoryTitle);
        console.log(res);
      },
      fail: function() {
        // fail
      }
    })
  }
})