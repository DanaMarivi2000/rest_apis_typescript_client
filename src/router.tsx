import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products from './views/Products'
import NewProduct from './views/NewProduct'
import {action as newProductAction} from './views/NewProduct' 
import {loader as loaderProducts} from './views/Products'
import {loader as loaderEdit} from './components/EditProduct'
import EditProduct from './components/EditProduct'
import {action as actionEdit} from './components/EditProduct'
import {action as actionDelete} from './components/ProductDetails'
import {action as updateAvailabilityActiion} from './views/Products'


const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<Products/>,
                loader:loaderProducts,
                action:updateAvailabilityActiion,
            },
            {
                path:'products/new',
                element:<NewProduct/>,
                action: newProductAction, //Cual va a ser la función que se va a ejecutar cuando el usuario oprima submit
            },
            {
                path: 'products/:id/edit', //ROA pattern
                element: <EditProduct/>,
                loader:loaderEdit,
                action:actionEdit,
            },
            {
                path:'products/:id/delete',
                action:actionDelete
            }
        ]
    },
    {
        
    }
])

export default router
