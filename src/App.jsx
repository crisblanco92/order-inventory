import {useState, useEffect} from 'react'

import Form from './components/Form'
import Header from './components/Header'
import OrderList from './components/OrderList'

function App() {
  const [order, setOrder] = useState([]); 
  const [singleOrder, setSingleOrder] = useState({})
  useEffect(() => {
    const obtenerLS = () => {
      const ordersLS = JSON.parse(localStorage.getItem('order')) ?? [] 


      setOrder(ordersLS)
    }

    obtenerLS()
  }, [])

  useEffect(() => {
    // console.log('listo o cambio orders')
    localStorage.setItem('order', JSON.stringify(order)) //ya sea un array vacio o lleno de objetos, lo va a convertir en string.
  }, [order])



  const deleteOrder = (id) => {
    console.log('eliminando paciente',id)
    
    const orderToDelete = order.filter(item => item.id !== id) 

    setOrder(orderToDelete)
  }

  return (
    <div className ="container mx-auto mt-20">
      <Header/>

      <div className="sections mt-12 flex">
        <Form
          order={order} 
          setOrder={setOrder}
          singleOrder={singleOrder}
          //limpia el STATE que se rellena al hacer click en editar un order Q LO BORRE DE LA MEMORIA, NO SOLO DEL DOM
          setSingleOrder={setSingleOrder}
        />
        <OrderList
          order={order}
          setSingleOrder={setSingleOrder} 
          deleteOrder={deleteOrder}
        />
      </div>
    </div>
  )
}

export default App
