
test("Verifies that if browser supports localStorage, balance and payee_array are not null",function(){	
		ok(localStorage.balance,"balance is not null or undefined");
		ok(localStorage.payee_array,"payee_array is not null or undefined");
});

test("verifies that when user enter all required fields and click on the Add payee button, saves payee to localStorage and its length incremented by 1, also adds payee name(Hitfox) to select box",function(){
	var initial_payee_length = JSON.parse(localStorage.payee_array).length;
	$('#payee_name').val("Hitfox");
	$('#bank_account').val("123456789");
	$('#iban').val("iban123456789");
	$('#create_payee').click();
	notEqual(initial_payee_length,JSON.parse(localStorage.payee_array).length,"localStorage payee_array length changed after successfully adding payee");
	equal(initial_payee_length+1,JSON.parse(localStorage.payee_array).length,"Length of payee_array incremented by 1");
	var option_value = $('#choose_payee_name option:first').text();
	equal("Hitfox",option_value,"Hitfox added to select box");
});

test("Verifies that when transfer(200) the balance values changes by 200",function(){
	 var current_balance = $('span#current_account_balance').text();
	 change_balance(200);
	equal(localStorage.balance,current_balance-200,"After transfer of 200, local storage balance is: "+localStorage.balance+".");
});

test("verifies that local storage balance display in the current balance box", function() {
	get_balance();
    var current_balance = $('span#current_account_balance').text();
	equal(localStorage.balance,current_balance,"current balance is: "+current_balance+".");
});
