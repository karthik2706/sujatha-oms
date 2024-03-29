import * as $ from 'jquery';

export const delhiveryApis = {
    async getPincodeDetails(pincode: string) {
        // const $loading = $('.loading');
        let data: any;
        try {
            data = await $.ajax({
                type: 'GET',
                url: `https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}&token=6e580e7983de1b44bd44797c38e97a5f0b540fdf`,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "jsonp",
                beforeSend: function() {
                    // $loading.removeClass('hide');
                }
            }).done(function(){
                
                // $loading.addClass('hide');
            });
            return data.delivery_codes[0].postal_code;
        } catch (error) {
            // $loading.addClass('hide');
            console.log(error);
        }
    },

    async createDelhiveryOrder(orderObj:any) {
        try {
            const order = await $.ajax({
                type: 'POST',
                url: '//localhost:3001/createOrder',
                data: orderObj
            });
            return order;
        } catch (error) {
            console.log(error);
        }
    },

    async sendSMSOrder(orderObj:any) {
        try {
            const order = await $.ajax({
                type: 'POST',
                url: '//localhost:3001/sendSMS',
                data: orderObj
            });
            return order;
        } catch (error) {
            console.log(error);
        }
    }
}
