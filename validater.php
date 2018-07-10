<?php
/**
 * php版参数校验类
 * 作者: 阮家友
 * 时间: 2018-7-10 01:28:10
 * 联系: 1439120442@qq.com
 *  git: https://github.com/ruanjiayou
 */
  $messages = array(
    'zh-cn' => array(
      'required'=> '{{field}} 字段不能为{{value}}!',
      'url'=> '{{field}} 字段的值 {{data}} 不是有效的url!',
      'email'=> '{{field}} 字段的值 {{data}} 不是有效的邮件格式!',
      'date'=> '{{field}} 字段的值 {{data}} 不是有效的 日期时间 格式!',
      'dateonly'=> '{{field}} 字段的值 {{data}} 不是有效的日期格式!',
      'timeonly'=> '{{field}} 字段的值 {{data}} 不是有效的时间格式!',
      'custom'=> '{{data}} 不是 {{field}} 字段中 自定义的验证方法 {{value}}!',
      'methods'=> array(),
      'int'=> '{{field}} 字段的值 {{data}} 必须是整数!',
      'float'=> '{{field}} 字段的值 {{data}} 不是有效的浮点数!',
      'float.m'=> '{{field}} 字段的值 {{data}} 整数位数多于限定值 {{value}}!',
      'float.n'=> '{{field}} 字段的值 {{data}} 小数位数多于限定值 {{value}}!',
      'boolean'=> '{{field}} 字段的值 {{data}} 不是布尔类型!',
      'enum'=> '{{field}} 字段的值 {{data}} 不是{{rule}} 规则中 {{value}} 中的一种!',
      'min'=> '{{field}}的值最小为{{value}}!',
      'max'=> '{{field}}的值最大为{{value}}!',
      'minlength'=> '{{field}}的长度最小为{{value}}!',
      'maxlength'=> '{{field}}的长度最大为{{value}}!',
      'length'=> '{{field}}的长度不是{{value}}!',
      'file'=> '{{data}} 不是预期({{value}})的文件格式!'
    )
  );
  class Validater {
    static public $types = ['required', 'nullable', 'empty', 'nozero', 'minlength', 'maxlength', 'length', 'min', 'max', 'methods', 'array', 'char', 'string', 'enum', 'int', 'float', 'file', 'boolean', 'date', 'dateonly', 'timeonly', 'email', 'url', 'IDCard', 'creditCard'];
    static public $atoms = ['methods', 'array', 'char', 'string', 'enum', 'int', 'float', 'file', 'boolean', 'date', 'dateonly', 'timeonly', 'email', 'url', 'IDCard', 'creditCard'];
    static public $bools = [1, '1', true, 'TRUE'];
    public $lang;
    public $methods;
    public $rules;
    /**
     * 
     */
    function __construct($rules = array(), $methods = array(), $lang = 'zh-cn') {
      if(!is_null($lang)) {
        $this->lang = $lang;
      }
      if(!is_null($methods)) {
        $this->methods = $methods;
      }
      $this->rules = $this->parse($rules);
    }
    /**
     * 辅助函数: 字符串转数组
     * @param {string} $str 字符串
     * @param {string} $separator 分割符
     * @param {function} 回调函数
     */
    function _str2arr($str, $sperator = ',', $cb = null) {
      $arr = array_map(function($item){
        return trim($item);
      }, explode($sperator, $str));
      return $arr;
    }
    /**
     * 将数据编译到模板
     * @param {string} $str 模板
     * @param {object} $data 数据
     */
    function compile($str, $data) {
      $res = $str;
      preg_match_all('(\{\{\s*([a-z0-9A-Z]+)\s*\}\})', $str, $arr);
      $raws = $arr[0];
      $keys = $arr[1];
      for($i=0;$i<count($raws);$i++){
        $key = $keys[$i];
        $value = isset($data[$key]) ? $data[$key] : ' ?? ';
        $res = str_replace($raws[$i], $value, $res);
      }
      return $res;
    }
    /**
     * 统一错误处理
     * @param {object} o 错误详情
     */
    function error($o) {
      global $messages;
      $o['message'] = $this->compile($messages[$this->lang][$o['rule']], $o);
      throw new Exception(json_encode($o, JSON_FORCE_OBJECT));
    }
    /**
     * 过滤并验证参数(使filter()和check()两个函数的串联)
     * @param {object} data 待校验数据
     */
    function validate($data) {
      return $this::check($this::filter($data));
    }
    /**
     * 按rules的字段过滤额外的字段(将布尔类型的转为true/false)
     * @param {object} 原数据
     */
    function filter($data) {
      $res = array();
      foreach($data as $k => $v) {
        if(isset($this->rules[$k])) {
            $rule = $this->rules[$k];
            if(isset($rule['boolean']) && $rule[$k]['boolean'] == true) {
              $res[$k] = in_array($data[$k], self::$bools) ? true : false;
            } else {
              $res[$k] = $data[$k];
            }
        }
      }
      return $res;
    }

    /**
     * 字符串转规则对象
     * @param {string} $str 字符串规则
     * @returns {object} 增强的规则对象
     */
    function _str2rule($str) {
      $arr = $this::_str2arr($str, '|');
      $hasAtom = false;
      $rule = array();
      for($i = 0; $i < count($arr); $i++) {
        $s = $arr[$i];
        preg_match_all("/^([a-zA-Z0-9]+)[:]?(.*)$/", $s, $match);
        $k = $match[1][0];
        $v = $match[2][0];
        // 检查: 至少一个基本类型
        if($hasAtom == false && in_array($k, self::$atoms)) {
          $hasAtom = true;
        }
        if('file' == $k) {
          $rule['file'] = $this->_str2arr($v);
        } else if('methods' == $k) {
          $rule['methods'] = array();
          $methods = $this->_str2arr($v);
          foreach($methods as $method) {
            if(isset($this->methods[$method])) {
              $rule['methods'][$method] = $this->methods[$method];
            }
          }
        } else if('min' == $k) {
          $rule['min'] = floatval($v);
        } else if('max' == $k) {
          $rule['max'] = floatval($v);
        } else if('float' == $k) {
          if(trim($v) == ''){
            $rule['float'] = array('m'=>10,'n'=>2);
          } else {
            $mn = $this->_str2arr($v);
            $rule['float'] = array('m'=>intval($mn[0]), 'n'=>intval($mn[1]));
          }
        } else if('minlength' == $k) {
          $rule['minlength'] = intval($v);
        } else if('maxlength' == $k) {
          $rule['maxlength'] = intval($v);
        } else if('length' == $k) {
          $rule['length'] = intval($v);
        } else if('enum' == $k) {
          $rule['enum'] = $this->_str2arr($v);
        } else {
          $rule[$k] = true;
        }
      }
      if($hasAtom == false) {
        $this->error('验证语法中必须要有基本类型!');
      }
      return $rule;
    }
    /**
     * 将简易字符串验证转化为增强的对象
     * @param {object} $rules 验证对象
     */
    function parse($rules) {
      $res = array();
      foreach($rules as $k => $v) {
        $res[$k] = $this::_str2rule($v);
      }
      return $res;
    }
    /**
     * 校验字段
     * @param {object} $data 数据
     * @returns {object} 处理后的数据
     */
    function check($data) {
      foreach($this->rules as $k => $rule) {
        $v = $data[$k];
        $err = array('field'=>$k, 'data'=>$v, 'rule'=>'', 'value'=>'');
        // undefined null '' 的处理:required处理undefined;nullable处理null;empty 处理 空字符串
        if(null == $v && $rule['nullable'] || $v == '' && $rule['empty']) {
          continue;
        }
        if(isset($rule['nonzero']) && ($v == 0 || $v == '0')) {
          $err['rule'] = 'nonzero';
          $this->error(err);
        }
        if(null == $v || '' == $v) {
          if(isset($rule['required'])) {
            $err['rule'] = 'required';
            $err['value'] = $v;
            $this->error(err);
          } else {
            unset($data[$k]);
            continue;
          }
        }
        if(isset($rule['int'])) {
          if(!is_numeric($v)) {
            $err['rule'] = 'int';
            $this->error(err);
          }
          $v = intval($v);
        }
        if(isset($rule['float'])) {
          $regstr = '/^([0-9]+)(.([0-9]+))?$/';
          preg_match($regstr, $v, $mn);
          if(!is_numeric($v) || count($mn) == 0) {
            $err['rule'] = 'float';
            $this->error($err);
          }
          $m = strlen($mn[1]);
          $n = count($mn) == 4? strlen($mn[3]) : 0;
          if($m > $rule['float']['m']) {
            $err['rule'] = 'float.m';
            $err['value'] = $rule['float']['m'];
            $this->error($err);
          }
          if($n > $rule['float']['n']) {
            $err['rule'] = 'float.n';
            $err['value'] = $rule['float']['n'];
            $this->error($err);
          }
          $v = floatval($v);
        }
        if(isset($rule['min']) && $v < $rule['min']){
          $err['rule'] = 'min';
          $this->error($err);
        }
        if(isset($rule['max']) && $v > $rule['max']) {
          $err['rule'] = 'max';
          $this->error($err);
        }
        if(isset($rule['array']) && is_array($rule['array']) && !is_array($v)) {
          $err['rule'] = 'array';
          $this->error($err);
        }
        if(is_string($v) && isset($rule['minlength']) && strlen($v) < $rule['minlength']) {
          $err['rule'] = 'minlength';
          $err['value'] = $rule['minlength'];
          $this->error($err);
        }
        if(is_string($v) && isset($rule['maxlength']) && strlen($v) > $rule['maxlength']) {
          $err['rule'] = 'maxlength';
          $err['value'] = $rule['maxlength'];
          $this->error($err);
        }
        if(is_string($v) && isset($rule['length']) && strlen($v) != $rule['length']) {
          $err['rule'] = 'length';
          $err['value'] = $rule['length'];
          $this->error($err);
        }
        if(isset($rule['enum']) && !in_array($v, $rule['enum'])) {
          $err['rule'] = 'enum';
          $err['value'] = implode(',', $rule['enum']);
        }
        if(isset($rule['boolean'])) {
          $v = in_array($v, self::$bools) ? true : false;
        }
        //TODO: 日期验证
        $data[$k] = $v;
        if(isset($rule['methods'])) {
          foreach($rule['methods'] as $f => $fn) {
            $res = $fn($v);
            if(!$res) {
              $err['rule'] = 'methods';
              $err['value'] = $f;
              $this->error($err);
            }
          }
        }
      }
      return $data;
    }
    /**
     * 其他内置函数 isUrl() isInt 
     */
  }
?>