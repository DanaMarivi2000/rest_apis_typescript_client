
import {Link, useLoaderData, ActionFunctionArgs}from 'react-router-dom'
import {getProducts, updateAvailability} from '../services/ProductService'
import ProductDetails from '../components/ProductDetails'
import type {Product} from '../types'


export const loader=async()=>{
  const products=await getProducts()
  console.log(products)
  return products
}

export const action=async({request}:ActionFunctionArgs)=>{
  const data=Object.fromEntries(await request.formData())
  await updateAvailability(+data.id)
}


const Products = () => {

  const products=useLoaderData() as Product
  console.log(products)
  return (
    <>
     <div className="flex justify-between align-center">
      <h2 className="text-4xl font-black text-slate-500">Registrar Productos</h2>
       
       <Link to="products/new" className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-400">Agregar a productos</Link>
     </div>
     <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product=>(
              <ProductDetails product={product} key={product.id}/>
            ))}
          </tbody>
        </table>
     </div>
    </>
  )
}

export default Products
