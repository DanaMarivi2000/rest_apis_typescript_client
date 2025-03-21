import {Form, LoaderFunctionArgs, useLoaderData, redirect, ActionFunctionArgs, useActionData} from 'react-router-dom'
import { getProductById, updateProduct } from '../services/ProductService'

import ErrorMessage from './ErrorMessage'
import ProductForm from './ProductForm'
    
export const loader=async({params}:LoaderFunctionArgs)=>{
    console.log(params)
    console.log(params.id)
        if(params.id){
            const data=await getProductById(+params.id)
            console.log(data)
            if(!data){
                return redirect('/')
            }else{
                return data
            }
        }
    }

    const availabilityOptions=[{name:"Disponible", value:true},{name:"No Disponible", value:false}]
    export const action=async({request,params}:ActionFunctionArgs)=>{
        const data=Object.fromEntries(await request.formData())
        let error=""
        if(Object.values(data).includes("")){
            error="Todos los campos son obligatorios"
        }
        if(error.length){
            return error
        }
        if(params.id){
            await  updateProduct(data, +params.id)
            return redirect("/")
        }
    }
const EditProduct=()=>{
    const product=useLoaderData()
    const error=useActionData()
    return(
            <>
 <div className="flex justify-between align-center">
      <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
     </div>

     {error&&<ErrorMessage>{error}</ErrorMessage>}
<Form className="mt-10" method="POST">
       <ProductForm product={product}/>
       <div className='mb-4'>
            <label htmlFor="availability">Disponibilidad</label>
            <select name="availability" id="availability" className='mt-2 block w-full p-3 bg-gray-50' defaultValue={product.availability.toString()}>{availabilityOptions.map(option=>(
                <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}</select>
        </div>    
        <input type="submit" value="Guardar Cambios" className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded" />
    </Form>

            </>
    )
}

export default EditProduct