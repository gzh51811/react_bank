var express = require('express');
var router = express.Router();
let {
    insert,
    find,
    updateOne,
    del,
    ObjectId
} = require("../libs/mongod.js")

//获取余额理财信息
router.get('/getBalance', async (req, res, next) => {
    let data = await find('t_balance', {});
    res.send(data);
});

//获取纪念币信息
router.get('/getCoin', async (req, res, next) => {
    let data = await find('t_coin', {});
    res.send(data);
});

//获取话费信息
router.get('/getPhone', async (req, res, next) => {
    let data = await find('t_phone', {});
    res.send(data);
});

//根据id余额理财信息
router.post('/getIdBalance', async (req, res, next) => {
    let {
        id
    } = req.body;
    console.log(id);
    
    let data = await find('t_balance', {
        idhb: id
    })
    console.log(data);
    res.send(data);
});

//根据id纪念币信息
router.post('/getIdCoin', async (req, res, next) => {
    let {
        id
    } = req.body;
    let data = await find('t_coin', {
        _id: ObjectId(id)
    })
    res.send(data);
});


//添加理财产品
router.post('/addBalance', async (req, res, next) => {
    let {
        snamehb,
        sblhb,
        spricehb,
        sqtyhb
    } = req.body;
    await insert('t_balance', [{
        namehb: snamehb,
        blhb: sblhb,
        pricehb: spricehb,
        qtyhb: sqtyhb
    }])
    res.send('add balance success');
})

//添加纪念币
router.post('/addCoin', async (req, res, next) => {
    let {
        stitle,
        svalue,
        sappointmentDate,
        schangeDate
    } = req.body;
    await insert('t_coin', [{
        title: stitle,
        value: svalue,
        appointmentDate: sappointmentDate,
        changeDate: schangeDate
    }])
    res.send('add coin success');
})

//添加话费
router.post('/addPhoneFare', async (req, res, next) => {
    let {
        svalue,
    } = req.body;
    await insert('t_phone', [{
        value: svalue,
    }])
    res.send('add phone fare success');
})


//更改理财产品
router.post('/upadteBalance', async (req, res, next) => {
    let {
        id,
        snamehb,
        sblhb,
        spricehb,
        sqtyhb
    } = req.body;
    await updateOne('t_balance', {
        _id: ObjectId(id)
    }, {
        namehb: snamehb,
        blhb: sblhb,
        pricehb: spricehb,
        qtyhb: sqtyhb
        })
    res.send('update balance success');
})

//更改纪念币
router.post('/upadteCoin', async (req, res, next) => {
    let {
        id,
        stitle,
        svalue,
        sappointmentDate,
        schangeDate
    } = req.body;
    await updateOne('t_coin', {
        _id: ObjectId(id)
    }, {
            title: stitle,
            value: svalue,
            appointmentDate: sappointmentDate,
            changeDate: schangeDate
        })
    res.send('update coin success');
})

//更改话费
router.post('/upadtePhoneFare', async (req, res, next) => {
    let {
        id,
        svalue
    } = req.body;
    await updateOne('t_phone', {
        _id: ObjectId(id)
    }, {
            value: svalue
        })
    res.send('upadte phone success');
})


//删除理财产品
router.post('/delBalance', async (req, res, next) => {
    let {
        id
    } = req.body;
    await del('t_balance', {
        _id: ObjectId(id)
    })
    res.send('delete balance success');
})

//删除纪念币
router.post('/delCoin', async (req, res, next) => {
    let {
        id
    } = req.body;
    await del('t_coin', {
        _id: ObjectId(id)
    })
    res.send('delete coin success');
})

//删除话费
router.post('/delPhoneFare', async (req, res, next) => {
    let {
        id
    } = req.body;
    await del('t_phone', {
        _id: ObjectId(id)
    })
    res.send('delete phone success');
})

//获取用户账号信息
router.get('/getUserData', async (req,res,next)=>{
    let data = await find('t_user_login',{});
    //去除密码信息
    let data2 = data.map((item)=>{
        return {
            _id: item._id,
            username: item.username
        }
    })
    res.send(data2);
})

//获取所有用户的理财信息
router.get('/balanceuser', async (req, res, next) => {
    let data = await find('t_user_balance', {});
    res.send(data);
})

//获取所有用户的纪念币信息
router.get('/coinuser', async (req, res, next) => {
    let data = await find('t_user_coin', {});
    res.send(data);
})

//获取所有用户的话费信息
router.get('/phoneuser', async (req, res, next) => {
    let data = await find('t_user_phone', {});
    res.send(data);
})
module.exports = router;