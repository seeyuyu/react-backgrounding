import React from 'react';
import { Row, Divider ,Col, Table, Input, Button } from 'antd';
import './employee.less'
const columns=[
  {
    title:'ID',       //当前显示的名字
    key:'id',         //
    dataIndex:'id',    //
  },
  {
    title:'姓名',       //当前显示的名字
    key:'name',         //
    dataIndex:'name',    //
  },{
    title:'联系方式',       //当前显示的名字
    key:'tel',         //
    dataIndex:"tel",    //
  },{
    title:'邮箱',       //当前显示的名字
    key:'email',         //
    dataIndex:'email',    //
  },{
    title:'操作',       //当前显示的名字
    key:'action',         //
    // dataIndex:'action',    //
    render :(text,record) =>(
      <span>
        <a href="javascript:;">修改</a>
        <Divider type="vertical" />
        <a href="javascript:;">详情</a>
        <Divider type="vertical" />
        <a href="javascript:;">删除</a>
      </span>
    )
  },
]

export default class Employee extends React.Component {

  state = {};
  render() {

    const tableData =[
      {
        id:'1',
        name:'lidy',
        tel:'25',
        email:'lidongyan_cn@163.com',
      
      },{
        id:'2',
        name:'yyt',
        tel:'25',
        email:'yyt@163.com',
       
      },{
        id:'3',
        name:'lidy',
        tel:'25',
        email:'lidongyan_cn@163.com',
        
      },{
        id:'4',
        name:'yyt',
        tel:'25',
        email:'yyt@163.com',
       
      },{
        id:'5',
        name:'lidy',
        tel:'25',
        email:'lidongyan_cn@163.com',
        
      },{
        id:'6',
        name:'yyt',
        tel:'25',
        email:'yyt@163.com',
       
      },{
        id:'7',
        name:'lidy',
        tel:'25',
        email:'lidongyan_cn@163.com',
        
      },{
        id:'8',
        name:'yyt',
        tel:'25',
        email:'yyt@163.com',
       
      },{
        id:'9',
        name:'lidy',
        tel:'25',
        email:'lidongyan_cn@163.com',
       
      },{
        id:'10',
        name:'yyt',
        tel:'25',
        email:'yyt@163.com',
       
      },{
        id:'11',
        name:'lidy',
        tel:'25',
        email:'lidongyan_cn@163.com',
       
      },{
        id:'12',
        name:'yyt',
        tel:'25',
        email:'yyt@163.com',
        
      }
    ]

    return (
      <div>
        <div>
          <Row>
            <Col span={18}><Button type="primary">添加员工</Button></Col>
            <Col span={6}>
              <Input className="w200" placeholder="请输入姓名" />

              <Button type="primary" > 查询</Button>
            </Col>
          </Row>
        </div>
        <div>
          <Table 
            bordered
            rowKey = {record => record.id}
            columns= {columns}
            dataSource ={tableData}
          />

        </div>
      </div>
    )
  }
}