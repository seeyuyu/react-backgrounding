import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Life from './pages/demo/Life';
import Admin from './admin'
import Router from './router'
import { Provider } from 'react-redux'
import configureStore from './redux/store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'
// Redux Store对象，管理所有的Redux状态
const store = configureStore();

axios.interceptors.request.use(function (config) {
  if(!window.localStorage){
    return false
  }else{
    let storage = window.localStorage;
    let token = storage.token;
    config.headers.name = `lidy`;
    
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }else{
      alert("没有token");
    }
  }
  
  // if (token) {
  //   config.headers.Authorization = `token ${token}`;
  // }else{
  //   // alert("没有token");
  // }
  return config
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.request.use(function (config) {
  // alert("拦截到了请求了");
  return config
}, function (error) {
  // 如何在这里加入react中的路由转跳？
  return Promise.reject(error);
});

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
);
// ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();