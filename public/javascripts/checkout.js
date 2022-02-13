// load env variables
require('dotenv').config();

//console.log(process.env.SECRET_KEY_STRIPE)

Stripe(process.env.SECRET_KEY_STRIPE)

let $form = $('#checkout-form');

$form.submit( function(event){

    $('charge-error').removeClass('hidden'),

    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvs').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#card-name').val()

    }, StripeREsponseHandler);
    return False;
});

function StripeREsponseHandler(status, response){
    if (response.error){

        $('charge-error').text(response.error.message);
        $('charge-error').removeClass('hidden'),
        $('button').prop('disabled', false);

    } else {

        let token = response.id;

        $form.append($('<input type = "hidden" name = "stripToken" />').val(token));

        $form.get(0).submit();
    }


}