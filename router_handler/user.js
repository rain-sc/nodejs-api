const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.regUser = (req, res) => {
  const userInfo = req.body 
  const selectUserSql = 'select * from ev_users where username=?'
  const insertUserSql = 'insert into ev_users set ?'

  if(!userInfo.username || !userInfo.password) {
    return res.send({status: 1, message: '用户名或密码不能为空'})
  }

  db.query(selectUserSql,[userInfo.username],function(err,result){
    if(err) return res.cc(err)
    if(result.length > 0) return res.cc('用户名已被占用，请更换其他用户名')
  })

  userInfo.password = bcrypt.hashSync(userInfo.password,10)

  db.query(insertUserSql,{username:userInfo.username,password:userInfo.password},function(err,result){
    if(err) return res.send({status:1,message:err.message})

    if(result.affectedRows !== 1){
      return res.cc('注册用户失败，请稍后再试')
    }

    res.cc('注册成功',0)
  })
}

exports.login = (req, res) => {
  res.send('login ok')
}