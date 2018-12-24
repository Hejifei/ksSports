var arr = {
  'code': 200,
  'data': {
    'code': '200',
    'pageNum': 3,
    'pageSize': 2,
    'total': 8,
    'pages': 3,
    'list': [{
      'id': 7,
      'name': '何总',
      'gender': '男',
      'phone': '13911111111',
      'type': '教师',
      'idCard': '21050419720518002X'
    }, {
      'id': 39,
      'name': 'ces3333',
      'gender': '男',
      'phone': '18899999999',
      'type': '学生',
      'idCard': '341222199308186817'
    }, {
      'id': 43,
      'name': '测试6666',
      'gender': '男',
      'phone': '18200001111',
      'type': '管理员',
      'idCard': '341222199308186817'
    }, {
      'id': 42,
      'name': 'ly',
      'gender': '女',
      'phone': '13988888888',
      'type': '教师',
      'idCard': '320511196412041027'
    }, {
      'id': 6,
      'name': '胡涛',
      'gender': '男',
      'phone': '15111111111',
      'type': '管理员',
      'idCard': '341222199308186817'
    }, {
      'id': 68,
      'name': 'shaonaihe',
      'gender': '男',
      'phone': '13951107722',
      'type': '教师',
      'idCard': '320106196906042430'
    }, {
      'id': 63,
      'name': 'xu5',
      'gender': '女',
      'phone': '13922222225',
      'type': '教师',
      'idCard': '21050419720518002X'
    }, {
      'id': 79,
      'name': '测试房客01',
      'gender': '未知',
      'phone': '13633336666',
      'type': '教师',
      'idCard': null
    }],
    'isFirstPage': true,
    'isLastPage': false
  },
  'desc': '查询成功！'
}
export default {
  getClubList () {
    return arr
  }
}
