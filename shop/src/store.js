import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: "user",
    initialState: {name: 'kim', age: 20},
    reducers: {
      changeUser(state){
        state.age += 1
      }
    }
});
export let {changeUser} = user.actions


let cartItems = createSlice({
    name: "cartItems",
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers: {
      setCartItems(state, action){
        let {id, count} = action.payload;
        let item = state.find((item)=>{
          return item.id === id
        });

        if (item){
          item.count = count;
        }
      },
      addCartItem(state, action){

        let aleadyItem = state.find((item)=>{
          return item.name === action.payload.name
        });

        if (aleadyItem) {
          aleadyItem.count += 1;
        } else {
          let uid = state.length + 1
          let addItem = {
            id: uid,
            name: action.payload.name,
            count: 1
          };
          state.push(addItem);
        }

      },
      removeCartItem(state, action){
        let id = action.payload.id
        return state.filter((item)=>{
          return item.id !== id
        });
      }
    } 
})
export let {setCartItems, addCartItem, removeCartItem} = cartItems.actions

// let watcheItems = createSlice({
//     name: "watcheItems",
//     initialState: [],
//     reducers: {

//     }
// });
// export let {} = watcheItems.actions


export default configureStore({
  reducer: {
    user: user.reducer,
    cartItems: cartItems.reducer

   }
}) 