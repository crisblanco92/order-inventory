import {useState, useEffect} from 'react'
import Error from './Error';

const Form = ({order, setOrder, singleOrder, setSingleOrder}) => {

  const [name, setName] = useState('');
  const [product, setProduct] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  const [error, setError] = useState(false)

  useEffect(() => { 
    if (Object.keys(singleOrder).length > 0) { 
      setName(singleOrder.name) 
      setProduct(singleOrder.product)
      setEmail(singleOrder.email)
      setDate(singleOrder.date)
      setComment(singleOrder.comment)
    } 
  }, [singleOrder]) 

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
      // id: generateId()
    }
    
    if (singleOrder.id) {
      //editando el registro
      orderObject.id = singleOrder.id

      const updatedOrders = order.map(singleOrderState => singleOrderState.id === singleOrder.id ? orderObject : singleOrderState)
      setOrder(updatedOrders)
      setSingleOrder({}) 

    } else {
      //nuevo registro
      orderObject.id = generateId() 
      setOrder([...order, orderObject]);
    }

    //reiniciar form.
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
