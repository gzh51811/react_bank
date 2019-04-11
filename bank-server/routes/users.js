var express = require('express');
var router = express.Router();
let {
  find,
  insert,
  updateOne,
  del,
  delall
} = require("../libs/mongod.js");
var token = require("../libs/token.js");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//登录路由
router.post('/login', async (req, res, next) => {
  let {
    inputUser,
    inputPass
  } = req.body;

  let data = await find('t_user_login',{
    username: inputUser
  })

  if (data.length > 0 && data[0].password == inputPass) {
    res.send({
      status: "success",
      token: token.createToken({
        inputUser,
        inputPass
      }, 3600)
    });
  } else {
    res.send({
      status: "fail"
    });
  }
})

//验证用户名路由
router.post('/checname', async (req, res, next) => {
  let {
    inputUser 
  } = req.body;
  let data = await find('t_user_login', {
    username: inputUser
  });
  if (data.length > 0) {
    res.send({
      status: "fail"
    })
  } else {  
    await res.send({
      status: "success"
    })
  }
})

//注册路由
router.post('/register', async (req, res, next) => {
  let {
    inputUser,
    inputPass
  } = req.body;
  console.log(inputPass)
  let data = await find('t_user_login', {
    username: inputUser
  });
  if (data.length > 0) {
    res.send({
      status: "fail"
    })
  } else {
    await insert('t_user_login', [{
      username: inputUser,
      password: inputPass
    }])
    res.send({
      status: "success"
    })
  }
})


//登录状态判断路由
router.post('/isLogin', (req, res, next) => {
  let {
    isToken
  } = req.body;
  if (token.checkToken(isToken)) {
    res.send({
      status: token.checkToken(isToken),
      curuser: token.decodeToken(isToken).payload.data.inputUser
    })
  } else {
    res.send({
      status: token.checkToken(isToken)
    })
  }
})

//获取用户购买理财产品信息
router.post('/userBalance', async (req, res, next) => {
  let {
    susername
  } = req.body

  let data = await find('t_user_balance',{
      username : susername
  });
  res.send(data);
})

//删除用户当行理财产品
router.post('/delBalance', async (req, res, next) => {
  let {
      sgoodsname
  } = req.body;

  await del('t_user_balance', {
      goodsname: sgoodsname
  })
  res.send('successdel');
})
//删除当前用户所有理财产品
router.post('/delallBalance', async (req, res, next) => {
  let {
      susersname
  } = req.body;
  console.log('aa',susersname)
  await delall('t_user_balance', {
    usersname: susersname
  })
  res.send('successalldel');
})

//获取用户购买纪念币信息
router.post('/userCoin', async (req, res, next) => {
  let {
      senduser
  } = req.body
  let data = await find('t_user_coin',{
      username : senduser
  });
  res.send(data);
})

//获取用户话费充值记录
router.post('/userPhone', async (req, res, next) => {
  let {
      senduser
  } = req.body
  let data = await find('t_user_phone',{
      username : senduser
  });
  res.send(data);
})

//用户购买纪念币
router.post('/buyCoin', async (req, res, next) => {
  let {
      sname,
      stitle,
      svalue,
      schangeDate,
      snum
  } = req.body;

  let data = await find('t_user_coin', {
      title: stitle,
      username: sname
  })
  if (data.length > 0) {
      let newNum = snum * 1 + data[0].num * 1
      await updateOne('t_user_coin', {
          title: stitle,
          username: sname
      }, {
              num: newNum
          })
      res.send("plus coin successfuly");
  } else {
      //无购买过该商品时
      await insert('t_user_coin', [{
          username: sname,
          title: stitle,
          value: svalue,
          changeDate: schangeDate,
          num: snum
      }])
      res.send("add coin successfuly");
  }
})
//用户购买理财产品,更新或插入
router.post('/buyBalance', async (req, res, next) => {
  let {
    susername,
    sgoodsname,
    sblhb,
    spricehb,
    snum,
    uid
  } = req.body;

  let data = await find('t_user_balance', {
      goodsname: sgoodsname,
      username: susername
  })
  if (data.length > 0) {
      let newNum = snum * 1 + data[0].num * 1
      await updateOne('t_user_balance', {
          goodsname: sgoodsname,
          username: susername
      }, {
              num: newNum
          })
      res.send("successGx");
  } else {
      //无购买过该商品时
      await insert('t_user_balance', [{
          username: susername,
          goodsname: sgoodsname,
          blhb: sblhb,
          pricehb: spricehb,
          num: snum
      }])
      res.send("successAdd");
  }
})

//用户购买理财产品
router.post('/buyBalance2', async (req, res, next) => {
  let {
      sname,
      sproduct,
      sbennefit,
      sprecent
  } = req.body;

  let data = await find('t_user_balance', {
      product: sproduct,
      username: sname
  })
  if (data.length > 0) {       
      res.send("balance already buy");
  } else {
      //无购买过该商品时
      await insert('t_user_balance', [{
          username: sname,
          product: sproduct,
          bennefit: sbennefit,
          precent: sprecent
      }])
      res.send("add balance successfuly");
  }
})

//用户充值话费
router.post('/buyPhoneFare', async (req, res, next)=>{
  let {
      sname,
      sphone,
      svalue
  } = req.body;
  await insert('t_user_phone',[{
      username: sname,
      phone: sphone,
      value: svalue
  }])
  res.send('add phonefare successfuly')
})
module.exports = router;
