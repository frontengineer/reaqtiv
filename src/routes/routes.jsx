// polyfill webpack require.ensure
if(typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };

import { Router, Route, IndexRoute } from 'react-router';
import AuthService from '../service/AuthService';
import MainStream from '../store/MainModel';

let ProtectedComponent = require('../shared/ProtectedComponent');
let React  = require('react');

module.exports = {
 path: '/',
 getComponent(location, cb){
   require.ensure([], (require)=>{
     cb(null, require('../shared/Main'));
   })
 },
 getIndexRoute(location, callback) {
   require.ensure([], function (require) {
     callback(null, {
       component: require('../shared/Home'),
     })
   })
 },
 childRoutes : [
   { path: 'login', getComponent(location, cb){
     require.ensure([], (require)=>{
       cb(null, require('../shared/Login'));
     })
   }},
   { path: 'logout', getComponent(location, cb){
     require.ensure([], (require)=>{
       cb(null, require('../shared/Logout'));
     })
   }},
   { path: 'signup', getComponent(location, cb){
     require.ensure([], (require)=>{
       cb(null, require('../shared/SignUp'));
     })
   }},
   { path: 'library', getComponent(location, cb){
     require.ensure([], (require)=>{
       cb(null, require('../shared/Library'));
     })
   }},
   { path: 'createspec', getComponent(location, cb){
     require.ensure([], (require)=>{
       cb(null, ProtectedComponent(require('../form_builder/CreateSpec')));
     })
   }}
 ]

};
