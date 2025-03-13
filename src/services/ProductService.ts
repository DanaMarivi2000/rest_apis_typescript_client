import { safeParse} from "valibot"; //Validar
import { DraftProductSchema, ProductSchema, ProductsSchema } from "../types";
import { ProductOk } from "../types";
import axios from "axios";

type ProductData={
    [k:string]:FormDataEntryValue;
}

export const getProducts=async()=>{
    const url=`${import.meta.env.VITE_API_URL}/api/products`


    try{
        const {data}= await axios(url)
        console.log(data)
        const products=safeParse(ProductsSchema, data.data)
        console.log(products) 
        if(products.success){
            return products.output
        }else{
            throw new Error('Hubo un error')
        }
    }catch(error){
        console.log(error)
    }
}

export const getProductById=async(id:ProductOk['id'])=>{
    const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`
    console.log(url)
    try{
        const {data}=await axios(url)
        console.log(data)
        const response=safeParse(ProductSchema,data.data)
        console.log(response)
        if(response.success){
            return response.output
        }else{
            throw new Error('Hubo un error')
        }
    }catch(error){
        console.log(error)
    }

}



export  const addProduct=async(data: ProductData)=>{
    const url= `${import.meta.env.VITE_API_URL}/api/products`
    
    try{
        const dataVerified=safeParse(DraftProductSchema, {
            name:data.name,
            price:Number(data.price)
        })
        console.log(dataVerified)
        if(dataVerified.success){
           await axios.post(url,{
                name:dataVerified.output.name,
                price:dataVerified.output.price
            })

        }else{
            throw new Error('Datos no válidos')
        }
        
    }catch(error){
        console.log(error)
    }

}

export const updateProduct=async(data:ProductData, id:ProductOk['id'])=>{
 
   try{

       const result=safeParse(ProductSchema,{
           id,
           name:data.name,
           price:Number(data.price),
           availability:Boolean(data.availability)
        })
        if(result.success){
            const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }
        console.log(result)
    }catch(error){
        console.log(error)
    }
}

export const updateAvailability=async(id:ProductOk['id'])=>{
    try{
        const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    }catch(error){
        console.log(error)
    }
}





export const deleteProduct=async(id:ProductOk['id'])=>{
    try{
        const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    }catch(error){
        console.log(error)
    }
}