if (Modernizr.localstorage){
	//localStorage.clear();
	localStorage.balance = (localStorage.balance) ? localStorage.balance : (1000).toFixed(2) ;
	localStorage.payee_array = (localStorage.payee_array) ? localStorage.payee_array : JSON.stringify([]);
	var temp_payee_data = {}
	var payee_name;
	var bank_account;
	var iban_number;
	var choose_payee;
	var amount_transfered;
	var option_value;
	var create_new_payee_form;
	var make_transfer_form;
	var payee_list;

	$(function(){
		$(document).foundation();
		get_balance();
		$('form#add_payee_form').hide();
		$('form#make_transfer_form').hide();
		$('a#show_current_balance').click(function(){
			change_background_selection($(this));
			toggle_current_balance()
		});
		$('a#show_add_payee').click(function(){
			change_background_selection($(this));
			toggle_add_payee()
		});
		$('a#show_make_transfer').click(function(){
			change_background_selection($(this));
			toggle_make_transfer();
		});
		if(JSON.parse(localStorage.payee_array).length > 0){
			$.each(JSON.parse(localStorage.payee_array),function(i,val){
				insert_payee_option(val.name);
			});
		}
		$( "#date" ).datepicker();
		create_new_payee_form = $('#add_payee_form');
		make_transfer_form = $('#make_transfer_form');
		create_new_payee_form.on('submit',function(e){
			e.preventDefault();
		}).on('valid.fndtn.abide', function() {
												create_new_payee();
		});
		make_transfer_form.on('submit',function(event){
			event.preventDefault();
		}).on('valid.fndtn.abide',function(event){
													transfer_amount();
													});	
	});
}
else{
	alert("native browser doesn't support local data storage");
}

function change_background_selection(object){
	object.siblings().removeClass("selected");
	object.toggleClass('selected');
}

function toggle_current_balance(){
	$('div#current_balance').toggle('slow');
	$('form#make_transfer_form').hide('slow');
	$('form#add_payee_form').hide("slow");
}

function toggle_add_payee(){
	$('form#add_payee_form').toggle("slow");
	$('div#current_balance').hide('slow');
	$('form#make_transfer_form').hide('slow');
}

function toggle_make_transfer(){
	$('form#make_transfer_form').toggle('slow');
	$('form#add_payee_form').hide("slow");
	$('div#current_balance').hide('slow');
}

function get_balance(){
	$('span#current_account_balance').text(localStorage.balance);
}

function change_balance(transfer_amount){
	localStorage.balance = localStorage.balance - transfer_amount;
	get_balance();
}

function create_new_payee()
{
	payee_name = $('#payee_name').val();
	bank_account = $('#bank_account').val();
	iban_number = $('#iban').val();
	$('#payee_name').val('');
	$('#bank_account').val('');
	$('#iban').val('');
	temp_payee_data["name"] = payee_name;
	temp_payee_data["bank_account"] = bank_account; 
	temp_payee_data["iban"] = iban_number;
	save_payee_data(temp_payee_data);
	temp_payee_data = {};
}

function insert_payee_option(option_value){
	$('#choose_payee_name').append("<option value='"+option_value+"'>"+option_value+"</option>");
}

function transfer_amount(){
	amount_transfered = parseFloat($('#amount_transfer').val());
	choose_payee = $('#choose_payee_name').val();
	$('#amount_transfer').val('');
	change_balance(amount_transfered);
	$('#transfer_alert_box').show().fadeOut( 1600 );
}

function save_payee_data(data){
	payee_list = JSON.parse(localStorage.payee_array);
	payee_list.push(data);
	localStorage.payee_array = JSON.stringify(payee_list);
	insert_payee_option(data.name);
	$('#payee_alert_box').show().fadeOut( 1600 );
}
