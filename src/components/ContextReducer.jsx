import React, { createContext, useContext, useReducer } from 'react'

//global state
const CartStateContext = createContext();
//dispatch
const CartDispatchContext = createContext();

// hum yaha state ka use na karte hue ,reducer ka use karenge

const reducer = (state, action) => {

  //making use of switch
  switch (action.type) {
    case "ADD":
      return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, img: action.img, price: action.price }]
    case "REMOVE":
      let newArr = [...state]
      newArr.splice(action.index, 1)
      return newArr;
    case "UPDATE":
      let arr = [...state]
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(food.qty, parseInt(action.qty), action.price + food.price)
          arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
        }
        return arr
        
      })
      return arr;
    case "DROP":
        let empArray = []
        return empArray  
    default:
      console.log("Error in Reducer");
  }

}
export const CartProvider = ({ children }) => {
  // initial value will be an empty array kyuki intially hamara cart empty hai and then uske andar we perform actions such as adding deleting etc in a list
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>

        {children}

      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
};


export const UseCart = () => useContext(CartStateContext);
export const UseDispatchCart = () => useContext(CartDispatchContext);


