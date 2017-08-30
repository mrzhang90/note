/**
 * save2local
 */

import flash.external.ExternalInterface;

class save2local
{
    /**
     * ���[�J���ւ̕ۑ�
     * @arg name    [a-z/.]���g�p�\�Bex) "com/sakatoku/test.txt"
     * @arg key     �f�[�^���ʃL�[
     * @arg dat     �ۑ��������f�[�^
     */
    function saveKeyData(name:String, key:String, dat)
    {
        var so:SharedObject = SharedObject.getLocal(name);
        so.data[key] = dat;
    }
    
    function loadKeyData(name:String, key:String)
    {
        var so:SharedObject = SharedObject.getLocal(name);
        return so.data[key];
    }
    /**
     * �f�[�^�̕ۑ��ȈՔ�
     */
    var save_name:String = "save2local/data.txt";
    function saveData(key:String, dat)
    {
        var so:SharedObject = SharedObject.getLocal(save_name);
        so.data[key] = dat;
        _root["a_txt"].text = "save";
    }
    
    function loadData(key:String)
    {
        _root["a_txt"].text = "load";
        var so:SharedObject = SharedObject.getLocal(save_name);
        return so.data[key];
    }
    
    function save2local()
    {
        ExternalInterface.addCallback("saveData", this, saveData);
        ExternalInterface.addCallback("loadData", this, loadData);
        ExternalInterface.addCallback("saveKeyData", this, saveKeyData);
        ExternalInterface.addCallback("loadKeyData", this, loadKeyData);
    }
    
    static function main()
    {
        _root.createTextField("a_txt", _root.getDepth(), 0, 0, 300,300);
        var obj = new save2local();
        /*
        // saveKeyData
        save2local.saveKeyData("test.txt","aaaa","@@@");
        _root.createTextField("a_txt", _root.getDepth(), 0, 0, 300,300);
        _root["a_txt"].text = save2local.loadKeyData("test.txt", "aaaa");
        */
        /*
        // ex
        obj.saveData("aaaa","@@@");
        _root["a_txt"].text = obj.loadData("aaaa");
        */
    }
}

