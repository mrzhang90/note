## MVP
### 使用
* Model下
    1. 创建Model类,使用json_model插件
    1. contraint下创建接口文件
* Presenter
    1. 创建Presenter类，构造方法引入UI，init方法写入页面加载时需要的数据
* View
    1. 在page页面内
    1. 找到createState方法，初始化Presenter并将UI传给Presenter
        ```dart
        UserPresenter presenter = new UserPresenter(view);
        presenter.init();//初始化数据
        ```
    1. 继承View，实现方法
        ```dart
        class _UserCenterState extends State<UserCenter> implements View{
            UserPresenter _presenter;
            
            //必须实现的方法
            @override
            void onLoadUserinfoComplete(String _userName) {

            }
            @override
            void onLoadUserinfoError() {
            }
            @override
            setPresenter(Presenter presenter) {
                _presenter = presenter;
            }
        }
        ```
### 分析
* MVP核心文件 - mvp.dart
    * IView类
        约束视图的行为
    * IPresenter类
        与 IView 进行交互，为其提供除了 UI 行为的其他逻辑处理，如网络请求，数据库查询等操作
    ```dart
    abstract class IView<T> {
        setPresenter(T presenter);
    }

    abstract class IPresenter{
        init();
    }
    ```
* Model 数据源 - Models目录
    * loginModel.dart
    fromJson()将数据转成LoginModel类，同时约束了数据字段
    * constraint文件夹
    约束 - 约束的内容为 IView 和 IPresenter
        ```dart
        abstract class Presenter implements IPresenter{
            loadUserInfo(); //用于加载数据
        }

        abstract class View implements IView<Presenter>{
            void onLoadUserinfoComplete(String userName); //更新界面
            void onLoadUserinfoError();                   //界面错误处理
        }
        ```
* Presenter
    在Presenter 的构造方法中初始化自己的 _view 字段，并调用setPresenter注入presenter 对象。
    然后在init中初始化userInfo数据
    loadUserInfo会获取数据，然后调用onLoadUserinfoComplete更新UI
    ```dart
    View _view;
    UserPresenter(this._view){
        //view 注入到 presenter 对象
        _view.setPresenter(this);
    }
    loadUserInfo(){
        userInfo.then((userInfo) {
            if (userInfo.length == 0) return;
            String userName=userInfo[0];
            //onLoadUserinfoComplete 方法更新 UI
            _view.onLoadUserinfoComplete(userName);
        }).catchError((onError){
            print('onError');
            _view.onLoadUserinfoError();
        });
    }
    @override
    init(){
        //读取并渲染-用户本地缓存账号
        userInfo=UserInfo.getUserInfo('userInfo');
    }
    ```
* View的实现
    在createState方法里初始化UserPresenter，并将UI传给Presenter类，然后调用init方法初始化presenter
    ```dart
    @override
    _LoginPageState createState(){
        _LoginPageState view = _LoginPageState(arg: this.arguments);
        UserPresenter presenter = new UserPresenter(view);
        presenter.init();
        return view;
    }
    ```在initState方法里调用loadUserInfo加载数据，当数据加载完成，Presenter会触发_view.onLoadUserinfoComplete，从而更新userName
    然后
    ```dart
    void initState() {
        super.initState();    
        _presenter.loadUserInfo();
    }
    @override
    void onLoadUserinfoComplete(String _userName) {
        setState(() {
            userName = _userName;
        });
    }
    ```