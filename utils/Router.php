<?php
use think\Route;
use think\Request;
use think\Response;

Request::hook('paging', function(Request $req, $cb = null){
  $query = $req->get();
  $condition = [];
  if(isset($query['page']) && is_numeric($query['page'])) {
    $condition['page'] = intval($query['page']);
  }
  if(isset($query['limit']) && is_numeric($query['limit'])) {
    $condition['limit'] = intval($query['limit']);
  }
  if(!empty($query['order'])) {
    $condition['order'] = str_replace('-', ' ', $query['order']);
  }
  if(!empty($query['search'])) {
    $condition['search'] = $query['search'];
  }
  if(!empty($cb)) {
    $condition = $cb($condition, $query);
  }
  return $condition;
});

Response::hook('return', function(Response $res, $result) {
  $res->data(['status'=> empty($result) ?'success':'fail','data'=>$result]);
});

Response::hook('success', function(Response $res){
  $res->data(['status'=>'success']);
});

Response::hook('fail', function(Response $res){
  $res->data(['status'=>'fail']);
});

Response::hook('paging', function(Response $res, $result) {
  $content = [
    'status' => 'success',
    'result' => [],
  ];
  if($result!==null && isset($result['listRows'])) {
    $content['result'] = $result->listRows();
    $content['pagination'] = [
        'page'=>$result->currentPage(),
        'pages'=>$result->lastPage(),
        'limit'=>$result->listRows(),
        'count'=>$result->count(),
        'total'=>$result->total(),
      ];
  } else {
    $content['result'] = $result;
  }
  $res->data($content);
});

class CustomRoute {
  static $routes = [];
  static function scanner($opt = array()) {
    if(!isset($opt['recusive'])) {
      $opt['recusive'] = false;
    }
    if(isset($opt['dir']) && is_dir($opt['dir'])) {
      $dh = opendir($opt['dir']);
      while(($file=readdir($dh))!==false) {
        if($file !='.'&&$file!='..') {
          $fullpath = $opt['dir'].'/'.$file;
          if(is_file($fullpath)) {
            $arr = include($fullpath);
            foreach($arr as $k=>$v){
              self::$routes[$k] = $v;
            }
          }
          if(is_dir($fullpath)) {
            $opt2 = [
              'dir'=>$fullpath,
              'recusive' => $opt['recusive'],
              'callback' => function_exists($opt['callback']) ? $opt['callback'] : null];
            self::scanner($opt2);
          }
        }
      }
    }
  }

  static function loadAll($opt) {
    self::scanner($opt);
    foreach(self::$routes as $k => $v) {
      $info = explode(' ', $k);
      $method = strtolower($info[0]);
      $route = $info[1];
      // TODO: match group
      if('pattern' == $method) {
        Route::pattern($route,$v);
      } else if(in_array($method, ['post', 'delete', 'put', 'get'])) {
        Route::rule($route, function(Request $req, Response $res) use($v){
          $result = $v($req, $res);
          if(empty($result)) {
            $result = $res->getData();
          }
          if(is_string($result)) {
            return $result;
          } else {
            return json($result);
          }
        }, $method);
      }
    }
  }
}

?>