import React from 'react';
import { Row, Col, Table, Input, Button } from 'antd';
import './employee.less'
export default class Employee extends React.Component {

  state = {};
  render() {
    const columns=[
      {
        title:'ID',       //当前显示的名字
        key:'id',         //
        dateIndex:'id',    //
      },{
        title:'姓名',       //当前显示的名字
        key:'name',         //
        dateIndex:'name',    //
      },{
        title:'联系方式',       //当前显示的名字
        key:'tel',         //
        dateIndex:"tel",    //
      },{
        title:'邮箱',       //当前显示的名字
        key:'email',         //
        dateIndex:'email',    //
      },{
        title:'操作',       //当前显示的名字
        key:'id',         //
        dateIndex:'id',    //
      },
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
          <Table>

          </Table>
        </div>
      </div>
    )
  }
}