import { ProductOk } from "../types"

type productType={
  product?:ProductOk
}


const ProductForm = ({product}:productType) => {

  return (
    <>
     <div className="mb-4">
            <label htmlFor="name" className="text-gray-800">Nombre del Producto</label>
            <input type="text" id="name" className="mt-2 w-full p-3 bg-gray-50" placeholder="Nombre del Producto" name="name" defaultValue={product?.name}/>
        </div>
        <div className="mb-4">
            <label htmlFor="price">Precio</label>
            <input type="text" id="price" name="price" className="w-full bg-gray-50 p-3 mt-2" placeholder="Precio del Producto" defaultValue={product?.price}/>
        </div>
    </>
  )
}

export default ProductForm
