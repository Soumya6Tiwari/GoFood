import React, { useEffect, useRef, useState } from 'react'
import { UseCart, UseDispatchCart } from './ContextReducer';
export default function Card(props) {
    let dispatch = UseDispatchCart();
    let data = UseCart();
    const priceRef = useRef();
    let options = props.options ?? {};
    let priceoptions = Object.keys(options);

    // setting default value and creating states for the same ie for size and quantity
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }


        if (food !== []) {
            // matlab size ke andar kuch bhi change nhi aya pehle bhi half tha ,abhi bhi half hai aur sirf quantity chnge hui hai to uss case me update functionality run ho jati hai
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }

            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                return

            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })


    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "340px" }}>
                    <img src={props.foodItem.img} className="card-img-top text-center" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title" >{props.foodItem.name}</h5>



                        <div className='container w-100'>
                            <select className='m-2  h-100  bg-success rounded' style={{ backgroundColor: "Green" }} onChange={(e) => setQty(e.target.value)}>
                                {
                                    // creating quantity option using javascript
                                    Array.from(Array(6), (e, i) => {
                                        // yaha i is index aur hame pta h ki array me index 0 se start hota h isliye i+1 liya h yaha pr so that 1 se reference mile
                                        return (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        )
                                    })
                                }
                            </select>



                            <select className='m-2  h-100  bg-success rounded ' style={{ backgroundColor: "Green" }} ref={priceRef} onChange={(e) => setSize(e.target.value)}>



                                {priceoptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>

                            <div className='d-inline h-100 fs-5'>
                                ₹{finalPrice}/-
                            </div>

                        </div>
                        <hr></hr>
                        <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
