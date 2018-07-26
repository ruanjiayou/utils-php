# utils-php
php学习笔记及函数封装

- validater 参数验证器
- ModelBase 基础模型器
- Hinter    自定义错误
- Router    路由分发器

##语法
```php
// 取对象属性,属性不存在报错: 取消提示 $var['name']
error_reporting(E_ALL^E_NOTICE);
// 变量类型
gettype($var);// integer string double boolean NULL float array object
// 判断变量是否是函数
bool function_exists();
//魔术变量，获取当前文件的绝对路径
__FILE__
//魔术变量，获取当前脚本的目录
__DIR__

$_SERVER
//返回当前工作目录
getcwd();
```
##thinkphp 5.0 锦集
```php
// thinkphp 5.0 分页参数
/**
 * @param $limit 每页数量
 * @param $simple 是否是简洁模式(只有上下页)
 * @param [$config] 配置参数
 * @param [$config.list_rows] 每页数量
 * @param [$config.page] 页码
 * @param [$config.path] url路径
 * @param [$config.query] url额外参数
 * @param [$config.fragment] 锚点
 * @param [$config.var_page] 分页变量
 * @param [$config.type] 分页类名
 */
paginate($limit, $simple, $config);

// or/like查询
$condition['goods_name|goods_serial'] = ['like', '%'.$_GET['search'].'%'];

// 时间区间查询
$hql['where']['dynamic_created_at']  = array('between', $timeArr);

// thinkphp 5.0 关联查询 个屁 直接循环数组再查询

// Request请求对象的常用操作
// 获取当前域名
$request->domain();
// 获取当前入口文件
$request->baseFile();
// 获取当前URL地址，不含域名
$request->url();
// 获取包含域名的完整url地址
$request->url(true);
// 获取URL地址 不含QUERY_STRING
$request->baseurl();
// 获取URL访问的ROOT地址
$request->root();
// 获取URL访问的ROOT地址
$request->root(true);
// 获取URL地址中的 PATH_INFO 信息
$request->pathinfo();
// 获取URL地址中的 PATH_INFO 信息，不含后缀
$request->path();
// 获取URL地址中的后缀信息
$request->ext();
// 请求方法
$request->method();
// 资源类型
$request->type();
// 访问ip
$request->ip();
// 是否为ajax请求
var_export($request->isAjax(), true);
// 请求参数
$request->param();
// GET参数
$request->get();
// POST参数
$request->post();
// cookie参数
$request->cookie();
// 上传文件信息
$request->file();
// 模块
$request->module();
// 控制器
$request->controller();
// 操作
$request->action();
// 路由信息
$request->routeInfo();
// 调度信息
$request->dispatch();

// 助手函数
/**
 * 快速导入Traits PHP5.5以上无需调用
 * @param string    $class trait库
 * @param string    $ext 类库后缀
 * @return boolean
 */
load_trait($class, $ext = EXT);
/**
 * 抛出异常处理
 * @param string    $msg  异常消息
 * @param integer   $code 异常代码 默认为0
 * @param string    $exception 异常类
 *
 * @throws Exception
 */
exception($msg, $code = 0, $exception = '');
/**
 * 抛出异常处理
 * @param string    $msg  异常消息
 * @param integer   $code 异常代码 默认为0
 * @param string    $exception 异常类
 *
 * @throws Exception
 */
exception($msg, $code = 0, $exception = '');
/**
 * 获取语言变量值
 * @param string    $name 语言变量名
 * @param array     $vars 动态变量值
 * @param string    $lang 语言
 * @return mixed
 */
lang($name, $vars = [], $lang = '');
/**
 * 获取和设置配置参数
 * @param string|array  $name 参数名
 * @param mixed         $value 参数值
 * @param string        $range 作用域
 * @return mixed
 */
config($name = '', $value = null, $range = '');
/**
 * 获取输入数据 支持默认值和过滤
 * @param string    $key 获取的变量名
 * @param mixed     $default 默认值
 * @param string    $filter 过滤方法
 * @return mixed
 */
input($key = '', $default = null, $filter = null);
/**
 * 渲染输出Widget
 * @param string    $name Widget名称
 * @param array     $data 传入的参数
 * @return mixed
 */
widget($name, $data = [])
/**
 * 实例化Model
 * @param string    $name Model名称
 * @param string    $layer 业务层名称
 * @param bool      $appendSuffix 是否添加类名后缀
 * @return \think\Model
 */
model($name = '', $layer = 'model', $appendSuffix = false)
/**
 * 实例化验证器
 * @param string    $name 验证器名称
 * @param string    $layer 业务层名称
 * @param bool      $appendSuffix 是否添加类名后缀
 * @return \think\Validate
 */
validate($name = '', $layer = 'validate', $appendSuffix = false)
/**
 * 实例化数据库类
 * @param string        $name 操作的数据表名称（不含前缀）
 * @param array|string  $config 数据库配置参数
 * @param bool          $force 是否强制重新连接
 * @return \think\db\Query
 */
db($name = '', $config = [], $force = true)
/**
 * 实例化控制器 格式：[模块/]控制器
 * @param string    $name 资源地址
 * @param string    $layer 控制层名称
 * @param bool      $appendSuffix 是否添加类名后缀
 * @return \think\Controller
 */
controller($name, $layer = 'controller', $appendSuffix = false)
/**
 * 调用模块的操作方法 参数格式 [模块/控制器/]操作
 * @param string        $url 调用地址
 * @param string|array  $vars 调用参数 支持字符串和数组
 * @param string        $layer 要调用的控制层名称
 * @param bool          $appendSuffix 是否添加类名后缀
 * @return mixed
 */
action($url, $vars = [], $layer = 'controller', $appendSuffix = false)
/**
 * 导入所需的类库 同java的Import 本函数有缓存功能
 * @param string    $class 类库命名空间字符串
 * @param string    $baseUrl 起始路径
 * @param string    $ext 导入的文件扩展名
 * @return boolean
 */
 import($class, $baseUrl = '', $ext = EXT)
/**
 * 快速导入第三方框架类库 所有第三方框架的类库文件统一放到 系统的Vendor目录下面
 * @param string    $class 类库
 * @param string    $ext 类库后缀
 * @return boolean
 */
vendor($class, $ext = EXT)
/**
 * 浏览器友好的变量输出
 * @param mixed     $var 变量
 * @param boolean   $echo 是否输出 默认为true 如果为false 则返回输出字符串
 * @param string    $label 标签 默认为空
 * @return void|string
 */
dump($var, $echo = true, $label = null)
/**
 * Url生成
 * @param string        $url 路由地址
 * @param string|array  $vars 变量
 * @param bool|string   $suffix 生成的URL后缀
 * @param bool|string   $domain 域名
 * @return string
 */
url($url = '', $vars = '', $suffix = true, $domain = false)
/**
 * Session管理
 * @param string|array  $name session名称，如果为数组表示进行session设置
 * @param mixed         $value session值
 * @param string        $prefix 前缀
 * @return mixed
 */
session($name, $value = '', $prefix = null)
/**
 * Cookie管理
 * @param string|array  $name cookie名称，如果为数组表示进行cookie设置
 * @param mixed         $value cookie值
 * @param mixed         $option 参数
 * @return mixed
 */
cookie($name, $value = '', $option = null)
/**
 * 缓存管理
 * @param mixed     $name 缓存名称，如果为数组表示进行缓存设置
 * @param mixed     $value 缓存值
 * @param mixed     $options 缓存参数
 * @param string    $tag 缓存标签
 * @return mixed
 */
cache($name, $value = '', $options = null, $tag = null)
/**
 * 记录日志信息
 * @param mixed     $log log信息 支持字符串和数组
 * @param string    $level 日志级别
 * @return void|array
 */
trace($log = '[think]', $level = 'log')
/**
 * 获取当前Request对象实例
 * @return Request
 */
request()
/**
 * 创建普通 Response 对象实例
 * @param mixed      $data   输出数据
 * @param int|string $code   状态码
 * @param array      $header 头信息
 * @param string     $type
 * @return Response
 */
response($data = [], $code = 200, $header = [], $type = 'html')
/**
 * 渲染模板输出
 * @param string    $template 模板文件
 * @param array     $vars 模板变量
 * @param array     $replace 模板替换
 * @param integer   $code 状态码
 * @return \think\response\View
 */
view($template = '', $vars = [], $replace = [], $code = 200)
/**
 * 获取\think\response\Json对象实例
 * @param mixed   $data 返回的数据
 * @param integer $code 状态码
 * @param array   $header 头部
 * @param array   $options 参数
 * @return \think\response\Json
 */
json($data = [], $code = 200, $header = [], $options = [])
/**
 * 获取\think\response\Jsonp对象实例
 * @param mixed   $data    返回的数据
 * @param integer $code    状态码
 * @param array   $header 头部
 * @param array   $options 参数
 * @return \think\response\Jsonp
 */
jsonp($data = [], $code = 200, $header = [], $options = [])
/**
 * 获取\think\response\Xml对象实例
 * @param mixed   $data    返回的数据
 * @param integer $code    状态码
 * @param array   $header  头部
 * @param array   $options 参数
 * @return \think\response\Xml
 */
xml($data = [], $code = 200, $header = [], $options = [])
/**
 * 获取\think\response\Redirect对象实例
 * @param mixed         $url 重定向地址 支持Url::build方法的地址
 * @param array|integer $params 额外参数
 * @param integer       $code 状态码
 * @return \think\response\Redirect
 */
redirect($url = [], $params = [], $code = 302)
/**
 * 抛出HTTP异常
 * @param integer|Response      $code 状态码 或者 Response对象实例
 * @param string                $message 错误信息
 * @param array                 $header 参数
 */
abort($code, $message = null, $header = [])
/**
 * 调试变量并且中断输出
 * @param mixed      $var 调试变量或者信息
 */
halt($var)
/**
 * 生成表单令牌
 * @param string $name 令牌名称
 * @param mixed  $type 令牌生成方法
 * @return string
 */
token($name = '__token__', $type = 'md5')

```
##class类
```php
class test {
  const lang = 'zh-cn';
  static $message = 'Hello World';
  function getLang() {
    return self::lang;
  }
  static function() {
    return self::$message;
  }
}
/* PHP类属性与类静态变量的访问
 * Created on 2016-7-13
 */
class test
{
 const constvar='hello world';
 static $staticvar='hello world';
 function getStaticvar(){
   return self::$staticvar;
 }
}
$obj=new test();
echo test::constvar; //输出'hello world'
echo @test::staticvar; //出错,staticvar 前必须加$才能访问，这是容易和类常量(per-class常量)容易混淆的地方之一
echo test::$staticvar; //输出'hello world'
$str='test';
//echo $str::$staticvar; //出错，类名在这不能用变量动态化
//echo $str::constvar; //出错原因同上
//在类名称存在一个变量中处于不确定（动态）状态时，只能以以下方式访问类变量
$obj2=new $str();
echo $obj2->getStaticvar();

```
##字符串
```php
//分割字符串: 
explode($separator, $str);
//
```
##数组
```php
//数组长度
count($arr);
//循环数组
foreach($arr as $item) {

}
//返回数组中所有的键名。
array_keys();
//把数组中的每个值发送到用户自定义函数，返回新的值
array_map();

```