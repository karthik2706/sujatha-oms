import * as $ from 'jquery';


export const delhiveryApis = {
    async getPincodeDetails(pincode: string) {
        try {
            const data = await $.ajax({
                type: 'GET',
                url: `https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}&token=6e580e7983de1b44bd44797c38e97a5f0b540fdf`,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "jsonp",
            })
            return data.delivery_codes[0].postal_code;
        } catch (error) {
            console.log(error);
        }
    },

    async createDelhiveryOrder(orderObj:any) {
        try {
            console.log(orderObj);
            const options = {
                method: 'POST',
                headers: { accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pickup_location: { name: orderObj.pickupD },
                    shipments: [
                        {
                            return_pin: '110096',
                            return_city: 'Delhi',
                            return_phone: '1111111111',
                            return_add: 'address',
                            return_state: 'Delhi',
                            return_country: 'India',
                            order: orderObj.ref,
                            phone: orderObj.mobile,
                            products_desc: 'Artificial Jewellery',
                            cod_amount: orderObj.cod || '0',
                            name: orderObj.name,
                            country: orderObj.country,
                            order_date: new Date(),
                            total_amount: orderObj.price,
                            seller_add: '',
                            add: orderObj.address,
                            seller_name: orderObj.rname,
                            seller_inv: '',
                            pin: orderObj.pincode,
                            quantity: orderObj.qty,
                            payment_mode: 'PREPAID',
                            state: orderObj.state,
                            city: orderObj.city
                        }
                    ]
                })
            };
            const order = await $.ajax({
                type: 'POST',
                url: `https://track.delhivery.com/api/cmu/create.json`,
                contentType: "application/json; charset=utf-8",
            })
            return order;
        } catch (error) {
            console.log(error);
        }
    }
}
