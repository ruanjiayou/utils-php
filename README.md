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