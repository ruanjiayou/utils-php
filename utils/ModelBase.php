<?php

namespace think;

class ModelBase extends Model {
    public $page_info;

    public function add($data) {
        $id = db($this->name)->insertGetId($data);
        $idKey = $this->name . '_id';
        $condition = array();
        $condition[$idKey] = $id;
        return $this->getInfo($condition);
    }

    public function remove($condition) {
        return db($this->name)->where($condition)->delete();
    }

    public function edit($condition, $data) {
        return db($this->name)->where($condition)->update($data);
    }

    public function getInfo($condition) {
        unset($condition['page']);
        unset($condition['limit']);
        return db($this->name)->where($condition)->find();
    }

    public function getList($opts=array()) {
        $where = $opts['where'];
        $field = isset($opts['field']) ? $opts['field'] : '*';
        $order = isset($opts['order']) ? $opts['order'] : '';
        $limit = isset($where['limit']) ? $where['limit'] : 10;
        $page = isset($where['page']) ? $where['page'] : 1;
        unset($where['page']);
        unset($where['limit']);
        if($limit === 0) {
            return db($this->name)->where($where)->field($field)->order($order)->select();
        } else {
            $res = db($this->name)->where($where)->field($field)->order($order)->paginate($limit,false,['query'=>request()->param()]);
            $this->page_info = $res;
            return $res->items();
        }
    }

    public function paging() {
        $pagination = array();
        if($this->page_info){
            $pagination = array(
                'count' => $this->page_info->count(),
                'limit' => intval($this->page_info->listRows()),
                'total' => $this->page_info->total(),
                'page'  => $this->page_info->currentPage(),
                'pages' => $this->page_info->lastPage()
            );
        }
        return $pagination;
    }
}
?>