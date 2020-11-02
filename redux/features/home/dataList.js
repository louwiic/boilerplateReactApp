import React from 'react';

const initState = [];

const dataList = (state = initState, action) => {
  switch (action.type) {
    case 'LOAD':
      state = action.data;
      return {
        ...state,
        arr: state
      }

    case 'PAGINATE':
      return {
        ...state,
        arr: [...state.arr, ...action.data]
      } 
    case 'UPDATE':
      state.push({
        title: 'Cocktail',
        data: ['Rhum', 'Punch', 'Sunrise'],
      });
      return state;
     case 'SEARCH_IN_LIST':

      let text = action.data;

      let prevState = [...state]
      if(text == ""){

      }

      if (text !== '') {  
       
        prevState.filter((item) => {
          let itemSearched = [];
          if (item.title == text) {
            itemSearched.push(item);
          }
          item.data.filter((d) => {
            if (d == text) {
              itemSearched.push(item);
              return item;
            }
          });
          if (itemSearched.length > 0) {
            state = itemSearched;            
          }
        });
      } 

      return state;

      // return [
      //   ...state,
      //   {
      //     id: action.id,
      //     text: action.text,
      //     completed: false,
      //   },
      // ];

      // const newData = dataList.filter((item) => {
      //   let itemSearched = [];
      //   if (item.title == text) {
      //     itemSearched.push(item);
      //   }
      //   item.data.filter((d) => {
      //     if (d == text) {
      //       itemSearched.push(item);
      //       return item;
      //     }
      //   });
      //   if (itemSearched.length > 0) {
      //     setDataList(itemSearched);
      //   }
      // });


    default:
      return state;
  }
};

export default dataList;
