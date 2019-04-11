const {
    MongoClient,
    //拿到mongodb里的_id
    ObjectId
} = require('mongodb');

// 连接url 不需更改
const url = 'mongodb://localhost:27017';

//数据库名称
const dbName = 'react_bank';

//创建连接，注意不能创建了就关闭，执行完毕再关闭，所以导出client
let connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            if (err) {
                reject(err);
            } else {
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                resolve({
                    db,
                    client
                })
            }
        });
    })
}

//插入，col为表名，arr为数组对象，是插入内容
let insert = (col, arr) => {
    return new Promise(async (resolve, reject) => {
        //首先要拿到连接导出对象才能进行操作,由于异步,需要先等待完成
        let {
            db,
            client
        } = await connect();
        //操作的表
        const collection = db.collection(col);
        collection.insertMany(arr, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
                client.close();
            }
        });
    })
}

//查找，col为表名，obj为查找条件对象，传入空对象即为查找全部
let find = (col, obj) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        //操作的表
        const collection = db.collection(col);
        collection.find({
            ...obj
        }).toArray(function (err, docs) {
            if (err) {
                reject(arr);
            } else {
                resolve(docs);
                client.close();
            }
        });
    })
}

//删除，col为表名，obj为删除条件对象
let del = (col, obj) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        //操作的表
        const collection = db.collection(col);
        // 删除条件描述格式 哪里的 name 为 katsuki
        // obj{name : katsuki}
        collection.deleteOne({
            ...obj
        }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
                client.close();
            }
        });
    })
}
//删除所有
let delall = async (col,obj)=>{

    let {db,client} = await connect();

    let collection = db.collection(col);
    let res = await collection['deleteMany'](obj);

    client.close();

    return res;
}

//改，col为表名，obj1为更新条件,obj2为更新的值，这个方法只更改第一个满足条件数据
let updateOne = (col, obj1, obj2) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        //操作的表
        const collection = db.collection(col);
        // 改条件描述格式 哪里的 age 为 18, 设置 name 为 katsuki
        // obj1{age : 18} obj2{name : katsuki}
        collection.updateOne({
            ...obj1
        }, {
                $set: {
                    ...obj2
                }
            }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                    client.close();
                }
            });
    })
}




module.exports = {
    insert,
    find,
    del,
    updateOne,
    ObjectId,
    delall
}