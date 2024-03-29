import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.component';
// import './shop.styles.scss'
import Category from '../category/category.component';
import { useDispatch } from 'react-redux';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategoriesMap } from '../../store/categories/category.action'

const Shop = () =>{
  const dispatch = useDispatch()
     useEffect(() => {
       const getCategoriesMap = async () => {
         const categoryMap = await getCategoriesAndDocuments('categories');
         // console.log(categoryMap)
         dispatch(setCategoriesMap(categoryMap));
       };
       getCategoriesMap();
     }, [dispatch]);

return (
  <Routes>
    <Route index element={<CategoriesPreview />} />
    <Route path=':category' element={<Category />} />
  </Routes>
);
}

export default Shop;