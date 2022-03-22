import Quantity from './quantity';
import { useEffect, useState } from 'react';
import { pathOr } from 'ramda';
import { useDebouncedCallback } from 'use-debounce';
import { useOrderItems } from 'vtex.order-items/OrderItems';

const QuantityWrapper = (props: any) => {
    const { updateQuantity } = useOrderItems();
    const quantityOrderForm = pathOr(0, ['quantity'], props);
    const id = pathOr('',['id'], props);
    const seller = pathOr('',['seller'], props);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(quantityOrderForm);
        return () => {
            setQuantity(0)
        }
    }, [quantityOrderForm]);

    const updateQuantityFunction = async (value: any) => {
        updateQuantity({ id, quantity: value, seller })
    }

    const debouncedFunction = useDebouncedCallback(updateQuantityFunction, 1000)

    const upQuantity = () => {
        debouncedFunction.cancel();
        setQuantity(quantity + 1)
        debouncedFunction(quantity + 1)
    }

    const downQuantity = () => {
        debouncedFunction.cancel();
        setQuantity(quantity - 1)
        debouncedFunction(quantity - 1)
    }

    return <Quantity upQuantity={upQuantity} downQuantity={downQuantity} quantity={quantity}/>
}

export default QuantityWrapper