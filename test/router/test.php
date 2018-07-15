<?php
use think\Hinter;
use think\Request;
use think\Response;
use think\Validater;
return [
    'pattern id' => '\d+',
    'get /hello/:name' => function(Request $req, Response $res) {
        var_dump($req->routeInfo());
        var_dump($req->param());
        var_dump($req->get());
        var_dump($req->post());
        var_dump($req->put());
        var_dump($req->delete());
        var_dump($res);
        return 'Hello';
    },
    'get /article/:id' => function(Request $req, Response $res) {
        // var_dump($req->routeInfo());
        // var_dump($req->param());
        // var_dump($req->get());
        // var_dump($req->post());
        // var_dump($req->put());
        // var_dump($req->delete());
        // var_dump($res);

        //return json(['type'=>'test']);

        return json($req->paging(function($hql, $query){
            if(isset($query['type'])) {
                $hql['type'] = $query['type'];
            }
            return $hql;
        }));
    }
];
?>