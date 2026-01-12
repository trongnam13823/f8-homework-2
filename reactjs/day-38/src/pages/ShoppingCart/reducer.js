const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        const newItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        const newTotalPrice = state.totalPrice + action.payload.price;
        const newTotalQuantity = state.totalQuantity + 1;

        return {
          items: newItems,
          totalPrice: newTotalPrice,
          totalQuantity: newTotalQuantity,
        };
      }

      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
        totalPrice: state.totalPrice + action.payload.price,
        totalQuantity: state.totalQuantity + 1,
      };
    }

    case "REMOVE_FROM_CART": {
      const itemToRemove = state.items.find((item) => item.id === action.payload);
      if (!itemToRemove) return state;

      return {
        items: state.items.filter((item) => item.id !== action.payload),
        totalPrice: state.totalPrice - itemToRemove.price * itemToRemove.quantity,
        totalQuantity: state.totalQuantity - itemToRemove.quantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const item = state.items.find((item) => item.id === action.payload.productId);
      if (!item) return state;

      const quantityDiff = action.payload.quantity - item.quantity;

      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter((item) => item.id !== action.payload.productId),
          totalPrice: state.totalPrice - item.price * item.quantity,
          totalQuantity: state.totalQuantity - item.quantity,
        };
      }

      return {
        items: state.items.map((item) =>
          item.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
        ),
        totalPrice: state.totalPrice + item.price * quantityDiff,
        totalQuantity: state.totalQuantity + quantityDiff,
      };
    }

    case "CLEAR_CART":
      return {
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
      };

    case "LOAD_CART":
      return action.payload;

    default:
      throw Error("CartReducer Error action.type invalid");
  }
};

export default CartReducer;
