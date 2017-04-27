var accounts, account;
var MyAdvancedToken;

// Initialize
function initializeMyAdvancedToken() {
	myMyAdvancedToken = MyAdvancedToken.deployed();
	$("#confAddress").html(myMyAdvancedToken.address);
	myMyAdvancedToken.owner.call().then(
	function(owner){
		$("#confOrganizer").html(owner);
		}
	)
	//var Coin_owner = myMyAdvancedToken.owner.call();
	//$("#confOrganizer").html(Coin_owner);
	}

function transfer(transfer_from,transfer_to,transfer_value){
	
	var msgResult;
	
	myMyAdvancedToken.transfer(transfer_to,transfer_value,{from: transfer_from}).then(
	function(){
		msgResult = "sendcoin successful";
		$("#transferResult").html(msgResult).show(300).delay(3000).hide(300);	
	}).catch(
	function(e){
	  console.log(e);
	  msgResult = "sendcoin failed";
	  $("#transferResult").html(msgResult).show(300).delay(3000).hide(300);
	})
			
}

function lookup(Address_lookup){
	myMyAdvancedToken.balanceOf.call(Address_lookup).then(
		function(coins_owned) {
			$("#coins_owned").html(coins_owned.toNumber());			
		}).then(
		function(){
		  return myMyAdvancedToken.frozenAccount.call(Address_lookup);
		}).then(
		function(freeze_status){
		  if (freeze_status == true)
		    $("#freeze_status").html("frozen"); 
		  else
		  	$("#freeze_status").html("no_frozen");
		}).then(
	  function(){
		  return myMyAdvancedToken.totalSupply.call();
	  }).then(
	  function(totalSupply){
	  	$("#totalSupply").html(totalSupply.toNumber());
	  }).then(
	  function(){
		  msgResult = "Lookup successful";
		  $("#lookupResult").html(msgResult).show(300).delay(3000).hide(300);	
	  }).catch(
	  function(e){
	    console.log(e);
	    msgResult = "Lookup failed";
	    $("#lookupResult").html(msgResult).show(300).delay(3000).hide(300);
	})	
}

function freezeAccount(freezeAccount_target, freezeAccount_freeze_bool, freezeAccount_owner){
  myMyAdvancedToken.freezeAccount(freezeAccount_target,freezeAccount_freeze_bool,{from: freezeAccount_owner}).then(
  function(){
		msgResult = "done";
		$("#freezeAccountResult").html(msgResult).show(300).delay(3000).hide(300);	
	}).catch(
	function(e){
	  console.log(e);
	  msgResult = "failed";
	  $("#freezeAccountResult").html(msgResult).show(300).delay(3000).hide(300);
	})
}

function mintToken(mintToken_target,mintToken_mintedAmount,mintToken_owner){
  myMyAdvancedToken.mintToken(mintToken_target,mintToken_mintedAmount,{from: mintToken_owner}).then(
  function(){
		msgResult = "mintToken successful";
		$("#mintTokenResult").html(msgResult).show(300).delay(3000).hide(300);	
	}).catch(
	function(e){
	  console.log(e);
	  msgResult = "mintToken failed";
	  $("#mintTokenResult").html(msgResult).show(300).delay(3000).hide(300);
	})
}

window.onload = function() {

	web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }
    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
    accounts = accs;
    account = accounts[0];

  	initializeMyAdvancedToken();
  });

	// Wire up the UI elements
		
	$("#transfer").click(function() {
		var transfer_from = $("#transfer_from").val();
		var transfer_to = $("#transfer_to").val();
		var transfer_value = $("#transfer_value").val();
		transfer(transfer_from,transfer_to,transfer_value);
		});
		
	$("#freezeAccount").click(function() {
		var freezeAccount_target = $("#freezeAccount_target").val();
		var freezeAccount_freeze = $("#freezeAccount_freeze").val();
	  var freezeAccount_owner = $("#freezeAccount_owner").val();
	  if (freezeAccount_freeze ==  "Freeze")
		  var freezeAccount_freeze_bool = true;
		else
			 freezeAccount_freeze_bool = false;
		freezeAccount(freezeAccount_target,freezeAccount_freeze_bool,freezeAccount_owner);
		});
	
	$("#mintToken").click(function() {
		var mintToken_target = $("#mintToken_target").val();
		var mintToken_mintedAmount = $("#mintToken_mintedAmount").val();
	  var mintToken_owner = $("#mintToken_owner").val();
	  mintToken(mintToken_target,mintToken_mintedAmount,mintToken_owner);
		});
		
						
	$("#lookup").click(function() {
		var val = $("#Address_lookup").val();
		lookup(val);
		});
};
/*	
	// refundTicket
function refundTicket(buyerAddress, ticketPrice) {

		var msgResult;

		myConferenceInstance.registrantsPaid.call(buyerAddress).then(
		function(result) {
			if (result.toNumber() == 0) {
				$("#refundTicketResult").html("Buyer is not registered - no refund!");
			} else {		
				myConferenceInstance.refundTicket(buyerAddress, 
					ticketPrice, {from: accounts[0]}).then(
					function() {
						return myConferenceInstance.numRegistrants.call();
					}).then(
					function(num) {
						$("#numRegistrants").html(num.toNumber());
						return myConferenceInstance.registrantsPaid.call(buyerAddress);
					}).then(
					function(valuePaid) {
						if (valuePaid.toNumber() == 0) {
							msgResult = "Refund successful";
						} else {
							msgResult = "Refund failed";
						}
						$("#refundTicketResult").html(msgResult);
					});	
			}
		});
}

// buyTicket
function buyTicket(buyerAddress, ticketPrice) {

	myConferenceInstance.buyTicket({ from: buyerAddress, value: ticketPrice }).then(
		function() {
			return myConferenceInstance.numRegistrants.call();
		}).then(
		function(num) {
			$("#numRegistrants").html(num.toNumber());
			return myConferenceInstance.registrantsPaid.call(buyerAddress);
		}).then(
		function(valuePaid) {
			var msgResult;
			if (valuePaid.toNumber() == ticketPrice) {
				msgResult = "Purchase successful";
			} else {
				msgResult = "Purchase failed";
			}
			$("#buyTicketResult").html(msgResult);
		});
}



// Check Values
function checkValues() {
	myConferenceInstance.quota.call().then(
		function(quota) { 
			$("input#confQuota").val(quota);
			return myConferenceInstance.organizer.call();
	}).then(
		function(organizer) { 
			$("input#confOrganizer").val(organizer);
			return myConferenceInstance.numRegistrants.call(); 
	}).then(
		function(num) { 
			$("#numRegistrants").html(num.toNumber());
			return myConferenceInstance.organizer.call();
	});
}

// Change Quota
function changeQuota(val) {
	myConferenceInstance.changeQuota(val, {from: accounts[0]}).then(
		function() {
			return myConferenceInstance.quota.call();
		}).then(
		function(quota) {
			if (quota == val) {
				var msgResult;
				msgResult = "Change successful";
			} else {
				msgResult = "Change failed";
			}
			$("#changeQuotaResult").html(msgResult);
		});
}







*/
	
	/*
	$("#changeQuota").click(function() {
		var val = $("#confQuota").val();
		changeQuota(val);
	});

	$("#buyTicket").click(function() {
		var val = $("#ticketPrice").val();
		var buyerAddress = $("#buyerAddress").val();
		buyTicket(buyerAddress, web3.toWei(val));
	});

	$("#refundTicket").click(function() {
		var val = $("#ticketPrice").val();
		var buyerAddress = $("#refBuyerAddress").val();
		refundTicket(buyerAddress, web3.toWei(val));
	});

	$("#createWallet").click(function() {
		var val = $("#password").val();
		if (!val) {
			$("#password").val("PASSWORD NEEDED").css("color", "red");
			$("#password").click(function() { 
				$("#password").val("").css("color", "black"); 
			});
		} else {
			createWallet(val);
		}
	});

	$("#fundWallet").click(function() {
		var address = $("#wallet").html();
		fundEth(address, 1);
	});

	$("#checkBalance").click(function() {
		var address = $("#wallet").html();
		$("#balance").html(getBalance(address));
	});

	// Set value of wallet to accounts[1]
	$("#buyerAddress").val(accounts[1]);
	$("#refBuyerAddress").val(accounts[1]);
*/

