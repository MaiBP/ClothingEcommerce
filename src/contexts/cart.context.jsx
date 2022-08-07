import { createContext, useReducer} from "react";
import { createAction } from '../utils/reducer/reducer.utils'

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    //if found, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem) =>  
        cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1} 
        : cartItem);
    }

    //return new array with modified cartItems/new cart item
    return [...cartItems, {...productToAdd, quantity: 1}]; 
}

const removeCartItem = ( cartItems, cartItemToRemove) => {
    //find item to remove matching id
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //if quantity is equal 1 remove item from the cart
    if (existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
    }
    //return cart items with matching cart item reducing quantities. 
      return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
}

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

//** USE REDUCER **//
const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        ...payload
      }
    case 'SET_IS_CART_OPEN':
      return{
        ...state,
       isCartOpen: payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }

}



export const CartProvider = ({ children }) => {
   
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

 
  const updateCartItemsReducer= (newCartItems) => {

       const newCartCount = newCartItems.reduce(
         (total, cartItem) => total + cartItem.quantity,
         0
       );
       
        const newCartTotal = newCartItems.reduce(
          (total, cartItem) => total + cartItem.quantity * cartItem.price,
          0
        ); 
        dispatch( 
          createAction(
            CART_ACTION_TYPES.SET_CART_ITEMS,{ 
              cartItems: newCartItems, 
              cartCount: newCartCount, 
              cartTotal: newCartTotal,
        }))
    }
    

    //updates the cart items
    const addItemToCart = (productToAdd) => {
      const newCartItems = (addCartItem(cartItems, productToAdd))
      updateCartItemsReducer(newCartItems)
    }

    const removeItemToCart = (cartItemToRemove) => {
      const newCartItems = removeCartItem(cartItems, cartItemToRemove)
      updateCartItemsReducer(newCartItems);
    };
 //Deletes the item from list 'x'
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItems);
    };

const setIsCartOpen = (bool) => {
  dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool))
}

    const value = {
      isCartOpen,
      setIsCartOpen,
      addItemToCart,
      cartItems,
      cartCount,
      removeItemToCart,
      clearItemFromCart,
      cartTotal,
    };
    return (
        <CartContext.Provider value= {value}>{children}</CartContext.Provider>
    )
}




//** USING CONTEXT WITHOUT REDUCER**//

// import { createContext, useState, useEffect} from "react";

// const addCartItem = (cartItems, productToAdd) => {
//   //find if cartItems contains productToAdd
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === productToAdd.id
//   );

//   //if found, increment quantity
//   if (existingCartItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   }

//   //return new array with modified cartItems/new cart item
//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// const removeCartItem = (cartItems, cartItemToRemove) => {
//   //find item to remove matching id
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === cartItemToRemove.id
//   );

//   //if quantity is equal 1 remove item from the cart
//   if (existingCartItem.quantity === 1) {
//     return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
//   }
//   //return cart items with matching cart item reducing quantities.
//   return cartItems.map((cartItem) =>
//     cartItem.id === cartItemToRemove.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : cartItem
//   );
// };

// const clearCartItem = (cartItems, cartItemToClear) =>
//   cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {},
//   cartItems: [],
//   addItemToCart: () => {},
//   removeItemToCart: () => {},
//   clearItemFromCart: () => {},
//   cartCount: 0,
//   cartTotal: 0,
// });

// export const CartProvider = ({ children }) => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0);

//   useEffect(() => {
//     const newCartCount = cartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity,
//       0
//     ); //new total in cart count
//     setCartCount(newCartCount);
//   }, [cartItems]);

//   //set the cart total price
//   useEffect(() => {
//     const newCartTotal = cartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity * cartItem.price,
//       0
//     );
//     setCartTotal(newCartTotal);
//   }, [cartItems]);

//   //updates the cart items
//   const addItemToCart = (productToAdd) => {
//     setCartItems(addCartItem(cartItems, productToAdd));
//   };

//   const removeItemToCart = (cartItemToRemove) => {
//     setCartItems(removeCartItem(cartItems, cartItemToRemove));
//   };
//   //Deletes the item from list 'x'
//   const clearItemFromCart = (cartItemToClear) => {
//     setCartItems(clearCartItem(cartItems, cartItemToClear));
//   };

//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     addItemToCart,
//     cartItems,
//     cartCount,
//     removeItemToCart,
//     clearItemFromCart,
//     cartTotal,
//   };
//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };