import { is } from "valibot"
import { deleteProduct } from "../services/ProductService"
import { ProductOk } from "../types"
import { formatCurrency } from "../utils"
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline'
import {useNavigate, Form, ActionFunctionArgs, redirect, useFetcher} from 'react-router-dom'
type Products={
    product: ProductOk
}


export  const action=async({params}: ActionFunctionArgs)=>{
  if(params.id){
    await deleteProduct(+params.id)
    return redirect('/')
  }
}

const ProductDetails = ({product}:Products) => {
  
  const isAvailable=product.availability
  const navigate=useNavigate()
  let fetcher=useFetcher()

  
  return (
    <>
      <tr className="border-b">
        <td className="p-3 text-lg text-gray-800">
          {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
          {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
         <fetcher.Form>
          <button type="button" name="id" value={product.id} className={`${isAvailable?'text-black':'text-red-600'}`}>
          {isAvailable?'Disponible':'No disponible'}
          </button>
          </fetcher.Form> 
        </td>
        <td className="p-3 text-lg text-gray-800">
          <div className="flex gap-2 justify-center items-center">
          <PencilSquareIcon className="text-blue-300 hover:text-blue-500 w-[30px]" onClick={()=>navigate(`/products/${product.id}/edit`,{
            // state:{
            //   product
            // }
          })}/> {/* Función toma hacia donde va */}
          <Form className="w-full" method="POST" action={`product/${product.id}/delete`} onSubmit={(e)=>{
            if(!confirm("¿Eliminar?")){
              e.preventDefault()
            }
          }}> 
            <TrashIcon className="text-red-300 hover:text-red-500 w-[30px]"/>
          </Form>
          </div>
        </td>
        
      </tr>
    </>
  )
}

export default ProductDetails
