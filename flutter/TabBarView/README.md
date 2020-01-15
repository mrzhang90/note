在  TabBarView  组件中切换页面时，子页面每次会重新  initState  一次，导致每次都切换页面均会重绘
解决方法有两步：
1. 在PageView(或TabBarView) 的 children页面上：
    * 类后加上
        ```dart
        with AutomaticKeepAliveClientMixin
        ```
    * 类中加上
        ```dart
        bool get wantKeepAlive => true;
        ```
    * 最后在build中加入
        ```dart
        super.build(context);
        ```
2. 经过以上方法可以实现每个页面切换会缓存当前tab页，但是tab1和tab3切换还是会触发tab2，针对这个问题，可以**用PageView替代TabBarView**。TabBarView的问题肯定都遇到过，各种各样的bug就不一一列举了。使用方法：
    * **封装FixTabBarView.dart**
    * 把类名从TabBarView改成FixTabBarView
    * 然后传递tabController和pageController到FixTabBarView，
    * 添加TabBar的onTap参数，调用pageController.jumpToPage(index);
    * 还要注意你的FixTabBarView的children的State需要with AutomaticKeepAliveClientMixin