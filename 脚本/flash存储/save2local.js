/*--------------------------------------------------------------------
 * save2local.js
 * Unoh Inc. 2007/01/26
 * -------------------------------------------------------------------
 */
var save2local = {
    version:    '1.000',
    swf_path:   'save2local.swf',
    objid:      'save2local_objid',
    divid:      'save2local_divid',
    swf:        undefined,
    getObj:     function () {
                    var id = this.objid;
                    return (navigator.appName.indexOf("Microsoft") != -1) ? window[id] : document[id];
                },
    saveData:   function (key, dat) {
                    var f = this.getObj();
                    if (f && f.saveData) f.saveData(key, dat);
                },
    loadData:   function (key) {
                    var f = this.getObj();
                    if (f && f.loadData) return f.loadData(key);
                    return undefined;
                }
};

document.write('<!-- saved from url=(0013)about:internet -->');
document.write('<div id="' + save2local.divid + '"></div>');

save2local.swf  = new SWFObject(save2local.swf_path, save2local.objid, "1", "1", "8", "white");
save2local.swf.write(save2local.divid);

//--------------------------------------------------------------------

