// import {useEffect} from 'react'

import Order from "./Order";

const OrderList = ({ order, setSingleOrder, deleteOrder }) => {

  // useEffect(() =>{  
  //   if(order.length > 0) {
  //     console.log('me imprimo cada vez que añado un order')
  //   } 

  // }, [order])

  return (
    <div className="order-list-container text-center w-1/2 h-screen">
      {order && order.length ? (
        <>
          <h2>Order list</h2>
          <p className="text-center mt-4">
            Manage order{" "}
            <span className="underline text-purple-300">here</span>
          </p>

          {order.map(oneOrder => (
            <Order 
              key={oneOrder.id} 
              oneOrder={oneOrder}
              setSingleOrder={setSingleOrder} 
              deleteOrder={deleteOrder}
            />
          ))}
        </>
      ) 
      : 
      ( 
        <>
          <h2>no order</h2>
            <p className="text-center mt-4">
            Add an order{" "}
            <span className="underline text-purple-300"> and they will show here</span>
            </p>
        </>
       )
      }
    </div>
  );
};

export default OrderList;
