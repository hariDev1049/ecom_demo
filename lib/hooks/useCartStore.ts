import { create } from 'zustand';
import { roundTotalPrice } from '../utils'; 
import { OrderItem } from '../models/OrderModel';
import { persist } from 'zustand/middleware';

type Cart = {
    items : OrderItem[]
    itemsPrice : number
    taxPrice : number
    shippingPrice : number
    totalPrice : number 
}

const initialState: Cart = {
    items : [],
    itemsPrice:0,
    taxPrice:0,
    shippingPrice:0,
    totalPrice:0
}

export const cartStore = create<Cart>()(
    persist(()=> initialState,{
        name:'cartStore',
    })
    )

export default function useCartService(){
    const {items,itemsPrice,taxPrice,shippingPrice,totalPrice} = cartStore();
    return {
        items,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        increase: (item:OrderItem)=> {
            const exist = items.find(it => it.slug === item.slug)
            const updatedCartItems = exist 
            ? (items.map((it)=> 
                it.slug === item.slug 
                ? {...exist, qty:(exist.qty = exist.qty + 1)} : it ) )
            : [...items,{...item, qty:1}]

            const { itemsPrice , taxPrice, shippingPrice, totalPrice} =    calculatePrice(updatedCartItems);

            cartStore.setState({
                items:updatedCartItems,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            })
        },
        decrease: (item: OrderItem)=> {
            const exist = items.find(it => it.slug === item.slug)
            
            let updatedCartItems = exist 
            ? items.map((it)=> 
                it.slug === item.slug && item.qty >= 1
                ? {...exist, qty: exist.qty >= 1 ? exist.qty = exist.qty - 1 : 0} : it
            ) : [...items]
            updatedCartItems = updatedCartItems.filter((item) => item.qty !== 0);

            const { itemsPrice , taxPrice, shippingPrice, totalPrice} =    calculatePrice(updatedCartItems);
            cartStore.setState({
                items:updatedCartItems,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            })
        }

    }
}

const calculatePrice = (items:OrderItem[]) => {
    const itemsPrice = roundTotalPrice(items.reduce((a,b)=> a + b.price * b.qty,0)),
    shippingPrice = roundTotalPrice(itemsPrice > 1000 ? 0 : 50),
    taxPrice = roundTotalPrice(Number(0.15 * itemsPrice)),
    totalPrice = roundTotalPrice(itemsPrice+shippingPrice+taxPrice);

    return {itemsPrice, shippingPrice, taxPrice, totalPrice};
}