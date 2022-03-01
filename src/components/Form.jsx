import {useState, useEffect} from 'react'
import Error from './Error';

const Form = ({order, setOrder, singleOrder, setSingleOrder}) => {

  const [name, setName] = useState('');
  const [product, setProduct] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  const [error, setError] = useState(false)

  useEffect(() => { //sirve para escuchar los cambios que sucedan
    if (Object.keys(singleOrder).length > 0) { //comprobar si el objeto esta vacio, devuelve true false
      setName(singleOrder.name) //lee cambios en el objeto de singleOrder, detecta que no esta vacio, 
      //y modifica el state con los datos de ese objeto que hemos activado una vez hago click en EDIT
      setProduct(singleOrder.product)
      setEmail(singleOrder.email)
      setDate(singleOrder.date)
      setComment(singleOrder.comment)
    } 
  }, [singleOrder]) //en este array vacio van las dependencias, lo que se coloque aqui va a ser el valor que react revise cuando cambie (al editar), y si cambia realiza un re render 
  //se ejecutara cada vez que singleOrder cambie, en este caso

  //puede haber varios useEffect para varias cosas
  // useEffect(() => {
  //   console.log('el componente esta listo (Form)') //cuando el componente se ha cargado, es decir, esta en uso
  // }, [])

  const generateId= () => {
    const random = Math.random().toString(36).substr(2)
    const day = Date.now().toString(36) 

    return random + day
    
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    //validation form
    if ([name, product, email, date, comment].includes('')) {
      console.log('hay string vacio')
      setError(true)
      return;
    }

    setError(false)

    //order objeto
    const orderObject = {
      name, 
      product, 
      email, 
      date, 
      comment,
      // id: generateId() muevo este generador de ir al nuevo registro que creo mas abajo
    }
    // console.log(orderObject)
    // colocar objeto en el state, haciendo una copia de lo q ya hay, no reescribiendo: COGER LO QUE HAY EN EL STATE,
    // COPIARLO Y AGREGARLO COMO UN NUEVO OBJETO DE ORDER
    
    if (singleOrder.id) {
      //editando el registro
      orderObject.id = singleOrder.id

      //creamos una nueva variable (para almacenar un nuevo array). Iteramos sobre todos los orders, creando la variable temporal de orderState para hacer ref a l que esta en el state 1,
      //entonces vamos a leer del state, e identificar que registro estamos editando. 
      // SI el ID DE singleOrderState === AL ID DE  singleOrder, ENTONCES DEVUELVO EL OBJETO ACTUALIZADO DE orderObject (YA CON ID), en caso contrario DEVUELVO EL
      //OBJETO COMO ESTA, SIN MODIFICARSE
      const updatedOrders = order.map(singleOrderState => singleOrderState.id === singleOrder.id ? orderObject : singleOrderState)
      //le pasamos el array nuevo que devuelve el .map
      setOrder(updatedOrders)
      setSingleOrder({}) //limpia el STATE que se rellena al hacer click en editar un order

    } else {
      //nuevo registro
      orderObject.id = generateId() //si no cumple con la condicion de tener ID, se viene al  else, y antes de almacenarlo en el STATE, se le generara in ID unico)
      setOrder([...order, orderObject]);
    }

    //reiniciar form. esto sucede porque los VALUE estan asociados a los name, product, email...
    setName('')
    setProduct('')
    setEmail('')
    setDate('')
    setComment('')

  }


  return (
    <div className="form-container w-1/2">
      <h2 className="text-center">Enter order</h2>
      <p className="text-center mt-4">Add order here and <span className="underline text-purple-300">manage them</span></p>

      <form 
        onSubmit={handleSubmit}
        className="form mt-5 px-10 py-10"
        >
        {/* pasarle "children" como prop al componente hijo Error permite pasar mucho contenido html, no solo 1 prop, que terminaria siendo muchas props */}
        {error && 
          <Error className="error">
            All fields are mandatory
          </Error>}

        <div>
          <label 
            className="form-field"
            htmlFor="customer"
            >
            Customer Name
            </label>
          
          <input 
            className="input"
            id="customer"
            type="text"
            placeholder="Customer name"
            value={name}
            onChange={ (e) => setName(e.target.value)}
            />
        </div>

        <div>
          <label 
            className="form-field"
            htmlFor="product"
            >
            Piece name/reference
            </label>
          
          <input 
            className="input"
            id="product"
            type="text"
            placeholder="Piece name"
            value={product}
            onChange={ (e) => setProduct(e.target.value)}
            />
        </div>

        <div>
          <label 
            className="form-field"
            htmlFor="email"
            >
            Email
            </label>
          
          <input 
            className="input"
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
            />
        </div>

        <div>
          <label 
            className="form-field"
            htmlFor="date"
            >
            Order date
            </label>
          
          <input 
            className="input"
            id="date"
            type="date"
            value={date}
            onChange={ (e) => setDate(e.target.value)}
            />
        </div>

        <div>
          <label 
            className="form-field"
            htmlFor="description"
            >
            Product description/notes
            </label>
          
          <textarea 
            className="input"
            id="description"
            placeholder="Write a comment"
            value={comment}
            onChange={ (e) => setComment(e.target.value)}
          />
        </div>

        <input 
          type="submit" 
          className="button w-full mt-3 hover:bg-purple-300 cursor-pointer transition-colors" 
          value={singleOrder.id ? 'edit order' : 'add order'}
        /> 
      </form>
    
    </div>
  )
}

export default Form
