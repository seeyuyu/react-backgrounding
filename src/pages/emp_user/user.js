import React from 'react';
import {Row ,Divider, Col, Table, Input, Button} from 'antd'
import Add from './userAdd'
const {Fragment} =React;
const tableDate =[
  {
    id:'1',
    name:'zhangsan',
    tel:123321,
    email:'zhangsan@163.com',
    createTime:'12312323123',
    avater:'www.baidu.com'
  },
  {
    id:'2',
    name:'lisi',
    tel:123321,
    email:'lisi@163.com',
    createTime:'12312323123',
    avater:'www.baidu.com'
  },  {
    id:'3',
    name:'wangwu',
    tel:123321,
    email:'wangwu@163.com',
    createTime:'12312323123',
    avater:'www.baidu.com'
  },  {
    id:'4',
    name:'zhaoliu',
    tel:123321,
    email:'zhaoliu@163.com',
    createTime:'12312323123',
    avater:'www.baidu.com'
  },
]

export default class User extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    visible:false, 
    isModify:false,
    isReadOnly:false,
    sonDate: {
      name:'',
      tel:'',
      email:''
    }
  }
    // 关闭弹出框
    visibleChange =()=>{
      this.setState({
        visible:false,
      })
    }
  // 从子，弹出框中拿到数据，并且发送ajax请求
  getSonDate =(params,isModify) =>{
    console.log(params);
    console.log(isModify);
    console.log('接受子级数据如上');
    if(isModify){
      //修改表单

    }else{
      //添加表单

    }
  }
  addUser =()=>{
    console.log('增加按钮被触发')
    this.setState({
      visible:true,
      isModify:false,
      isReadOnly:false,
    })
  }
    // 点击修改员工的信息
    fixUpForm = (text,isReadOnly=false)=>{
      // console.log('123')
      const {name,tel,email} =text;
      console.log(text);
      this.setState({
        visible:true,
        isModify:true,
        isReadOnly,
        sonDate:{
          name,
          tel,
          email
        }
      })
      //好像和vue的refs差距很大
      // this.refs['employeeAdd'].init('123');
      // console.log(this.refs['employeeAdd'])
    }
  render() {
    const columns =[
      {
        title:'Id',
        key:'id',
        dataIndex:'id',
      },
      {
        title:'姓名',
        key:'name',
        dataIndex:'name',
      },
      {
        title: '联系方式',
        key: 'tel',
        dataIndex:'tel'
      },
      {
        title: '邮箱',
        key: 'email',
        dataIndex: 'email',
      },
      {
        title: '注册时间',
        key:'createTime',
        dataIndex:'createTime',
      },
      {
        title:'头像',
        key:'avater',
        dataIndex:'avater',
      },
      {
        title:'操作',
        render: (text)=>{
          return <span>
            <Button type="primary" onClick ={() =>{ this.fixUpForm(text)}}>修改</Button>
            <Divider type="vertical"></Divider>
            <Button type="primary" onClick ={() =>{ this.fixUpForm(text,true)}}>详情</Button>
            <Divider type="vertical"></Divider>
            <Button type="primary" onClick ={() =>{}}>删除</Button>
          </span>
        }
      }
    ]
    const {visible, isModify, sonDate ,isReadOnly} =this.state
    return (
      <Fragment>
        <div>
          <Row>
            <Col span={18}>
              <Button type ="primary" onClick={this.addUser}>添加客户</Button>
            </Col>
            <Col span={6}>
              <Input className ='w200' placeholder = "请输入用户姓名"/>
              <Button type='primary'>查询</Button>
            </Col>
          </Row>
        </div>
        <div>
          <Table
            bordered
            rowKey = {record => record.id}
            columns ={columns}
            dataSource ={tableDate}
          >
          </Table>
        </div>
        <Add
          visible ={visible}
          isModify = {isModify}
          fatherDate = {sonDate}
          isReadOnly = {isReadOnly}
          sendSonDate = {this.getSonDate}
          visibleChange = {this.visibleChange}
        /> 
      </Fragment>
    )
  }
}