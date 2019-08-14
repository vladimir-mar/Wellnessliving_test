const fixPrice = {
	shipping: 0,
	tax: 10
};
let productDataObj = [
	{
		id: 1,
		name: 'green mung beas',
		img: 'foto-product-cart.png',
		price: 100,
		amount: 1
	},
	{
		id: 2,
		name: 'laird green ientils',
		img: 'foto-product-cart.png',
		price: 110,
		amount: 1
	},
	{
		id: 3,
		name: 'Fava bean',
		img: 'foto-product-cart.png',
		price: 120,
		amount: 1
	}
],
productCart = {
	compileProduct: function(){
		let numElemObj = productDataObj.length,
		dataTpl = null,
		totalProduct = 0;
		if(numElemObj){
			let compileObj = [];
			for(let i = 0; i < numElemObj; i++){
				let localObj = productDataObj[i],
				sumProduct = localObj.price * localObj.amount;
				compileObj.push({
					id: localObj.id,
					img: localObj.img,
					name: localObj.name,
					price: localObj.price,
					val: localObj.amount,
					priceSum: sumProduct
				});
				totalProduct += sumProduct;
			}
			dataTpl = productCart.loadTemplate('tpl-product', compileObj);
		} else {
			dataTpl = productCart.loadTemplate('tpl-empty');
		}
		$('#mark_product').html( dataTpl );
		productCart.compileTotal(totalProduct);
	},
	compileTotal: function(totalProduct){
		let compileObj = {
			subTotal: totalProduct,
			shipping: fixPrice.shipping,
			tax: fixPrice.tax,
			total: totalProduct ? totalProduct + fixPrice.shipping + fixPrice.tax : 0
		};
		$('#mark_total').html( productCart.loadTemplate('tpl-total', compileObj) );
	},
	removeProduct: function(idProduct){
		productDataObj.splice( productCart.scanProduct(idProduct), 1);
		productCart.compileProduct();
	},
	changeAmountProduct: function(idProduct, newVal){
		if (productDataObj[productCart.scanProduct(idProduct)].amount !== newVal) {
			productDataObj[productCart.scanProduct(idProduct)].amount = newVal;
			productCart.compileProduct();
		}
	},
	scanProduct: function(idProduct){
		for(let i = 0; i < productDataObj.length; i++){
			if (productDataObj[i].id === idProduct) {
	 			return i;
			}
		}
	},
	loadTemplate: function(idTpl, objTpl){
		let template = Handlebars.compile($('#'+idTpl).html());
		return template(objTpl);
	}
}
$( document ).ready(function() {
	productCart.compileProduct();
	$('body').on('click', '.icon-close', function(){
		productCart.removeProduct( $(this).parents('.table-string').data('id') );
	});
	$('body').on('input', '.table-string__amount', function(){
		let newVal = Number( $(this).val() );
		if ( newVal > 0 ) productCart.changeAmountProduct( $(this).parents('.table-string').data('id'), newVal );
	});
});