import 'tabContent1.dart';
import 'FixTabBarView.dart';

class _PrescriptionTabbarState extends State<PrescriptionTabbar>
    with SingleTickerProviderStateMixin {
  TabController controller;
  PageController _pageController;
  List<Tab> tabs = <Tab>[
    Tab(
      text: "主诉/体检",
    ),
    Tab(
      text: "诊断",
    ),
    Tab(
      text: "处方",
    ),
  ];

  List<Widget> tabWidget = List();
  

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    controller = TabController(initialIndex: 0, length: tabs.length, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    tabWidget = <Widget>[
      TabContent1(),
      TabContent1(),
      TabContent1(),
    ];
    return Column(
      children: <Widget>[
        Container(
          child: TabBar(
            controller: controller,
            //可以和TabBarView使用同一个TabController
            tabs: tabs,
            isScrollable: false,
            onTap: (index) {
              widget.getIndex(index);
              // + 用于FixTabBarView页面切换
              _pageController.jumpToPage(index);
            },
          ),
        ),
        Expanded(
          //将TabBarView换成FixTabBarView
          //child: TabBarView(
          //  controller: controller,
          child: FixTabBarView(
            pageController: _pageController,
            tabController: controller,
            children: tabWidget,
            // physics: new NeverScrollableScrollPhysics(),
          ),
        )
      ],
    );
  }
}
