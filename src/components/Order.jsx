// import {useEffect} from 'react'

const Order = ({oneOrder, setSingleOrder, deleteOrder}) => {

  // useEffect(() => {
  //   console.log('el componente esta listo (Order)') //este no se va a imprimir al cargar la pag sin orders, sino al añadir el primer order, que es cuando
  //   //este componente entra en uso
  // }, [])

  const {name, product, email, date, comment, id} = oneOrder //el id en este caso solo lo utilizare para identificar el order que quiero borrar

  const handleDelete = () => {
    //console.log('eliminando ', id)
    const answer = confirm('Do you want to delete this order?');

    if(answer) {
      deleteOrder(id)
    }
  }

  return (
    <div className="order-list mt-2 px-10 py-10">
        <p className="font-bold">Customer name: {''}
          <span className="font-normal">{name}</span>
        </p>

        <p className="font-bold">Piece name/reference: {''}
          <span className="font-normal">{product}</span>
        </p>

        <p className="font-bold">Email: {''}
          <span className="font-normal">{email}</span>
        </p>

        <p className="font-bold">Order date: {''}
          <span className="font-normal">{date}</span>
        </p>

        <p className="font-bold">Product description/notes: {''}
          <span className="font-normal">{comment}</span>
        </p>
        <div className="flex justify-between mt-7">
          <button 
            type="button"
            className="button-edit mr-3 text-center"
            //cuando demos click, se va a rellenar el objeto de singleOrder con la info q traemos del padre
            onClick={()=> setSingleOrder(oneOrder)}
            //funcion callback porque este STATE tiene que rellenarse al hacer este click
            //no al crear el objeto en si 
          >


          Edit</button>
          <button 
            type="button"
            className="button-delete text-center"
            //onClick={() => deleteOrder(id)}
            onClick={handleDelete} //para que espere a que ocurra el evento, declarar arriba, NO ()
            >
            

          Delete</button>
        </div>
      </div>
  )
}

export default Order
