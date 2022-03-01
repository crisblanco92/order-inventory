import {useState, useEffect} from 'react'

import Form from './components/Form'
import Header from './components/Header'
import OrderList from './components/OrderList'

function App() {
  const [order, setOrder] = useState([]); //el cojunto de orders es un array
  const [singleOrder, setSingleOrder] = useState({}) // un order individual es un objeto //este objeto esta vacio hasta que doy click en EDITAR, que es 
  //para el que funciona y el que lo rellena 


  //con esto, al recargar se resetea el localStorage. Esto es porque al inicio ORDER es un array vacio. Hay que escribir un codigo que primero revise si 
  //hay algun STORAGE, y entonces lo ponga en el STATE, y sino que inicie con lo que haya en el STATE.
  useEffect(() => {
    const obtenerLS = () => {
      const ordersLS = JSON.parse(localStorage.getItem('order')) ?? [] // si no hay nada en LS, agrega un array vacio (para no tener un null cuando recarga). este ARRAY VACIO
      //que viene de LS es inicialmente un string, por eso no sale el triangulo. hay que convertirlo en OBJETO con JSON.parse (no existe el tipo de dato array en JS)

      // console.log(ordersLS)
      //colocar lo que saque de arriba, en el STATE
      setOrder(ordersLS)
    }

    obtenerLS()
  }, [])

  //ES IMPORTANTE EL ORDEN. el primer UseEffect se ejecutara cuando el comp este listo, y seteara lo que detecte al array vacio. El segundo UseEffect lo 
  //convertira a string


  //cuando haya cambios en orders, los guardamos en localStorage (solo pueden guardarse strings, no arrays)
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
        //se pasan desde aqui al 1 hijo y luego al 2 hijo.
          order={order}
          setSingleOrder={setSingleOrder} //le paso setSO porque es la parte que va a MODIFICAR el estado
          deleteOrder={deleteOrder}
        />
      </div>
    </div>
  )
}

export default App
