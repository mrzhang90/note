class TabContent1 extends State<Page>
    with AutomaticKeepAliveClientMixin {
  @override
  void initData() {
    eventDiagnosis=eventBus.on<DiagnosisContent>().listen((data) {
      //xxx
    });
  }

  @override
  disposeData() {
    eventDiagnosis.cancel();
  }

  @override
  Widget buildBody(BuildContext context) {
    return null;
  }
  Widget build(BuildContext context) {
    super.build(context);
  }

  @override
  // TODO: implement wantKeepAlive
  bool get wantKeepAlive => true;
}
