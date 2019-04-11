import {createStore} from 'redux';
// import {cartReducer} from './reducers/cartReducer.js'
/**
 * Cart Reducer
 * 关于购物车的规则
 */

// import {ADD_TO_CART,REMOVE_FROM_CART,CHANGE_QTY,CLEAR_CART} from './actions/cartAction'

// 初始状态
let initState = {
    goodslist:[
        {
           id:[]
        }
    ],
    inputUser:[]
}

// state的修改逻辑
let reducer = (state=initState,{type,payload})=>{
    // state: 上一次的状态
    // action: 修改指令
    // 返回值：返回新的state
    switch(type){
         // 获取当前用户名
         case 'user':
         return {
             ...state,
             inputUser:[...state.inputUser,payload]
         }
        // 添加商品到购物车
        case 'add_to_cart':
            return {
                ...state,
                goodslist:[...state.goodslist,payload]
            }

        // // 删除购物车商品
        // case REMOVE_FROM_CART:
        //     return {
        //         ...state,
        //         goodslist:state.goodslist.filter(item=>item.goods_id!=payload.id)
        //     }
        
        // // 修改购物车商品数量
        // case CHANGE_QTY:
        //     return {
        //         ...state,
        //         goodslist:state.goodslist.map(goods=>{
        //             if(goods.goods_id === payload.id){
        //                 goods.qty = payload.qty
        //             }
        //             return goods;
        //         })
        //     }
        
        //     // 清空购物车
        // case CLEAR_CART:
        //     return {
        //         ...state,
        //         goodslist:[]
        //     }

        default:
            return state;
    }
}



let store = createStore(reducer);

export default store;