document.querySelector("form").addEventListener("submit", oldTaxslab);
function oldTaxslab(event) {
  event.preventDefault();
  var firstSlab = 250000;
  var secondSlab = 500000;
  var surch = 5000000;
  var surchCr = 10000000;
  var CTC = parseInt(document.getElementById("CTC").value || 0);
  var C80 = document.getElementById("80C").value || 0;
  var stNd = document.getElementById("stnd").value || 0;
  // HRA calculaions
  var rent_paid = parseInt(document.getElementById("rent").value || 0);
  var basicSalary = parseInt(CTC * (50 / 100));
  var special_allow = parseInt(CTC * (20 / 100));
  var hra_provided = parseInt(basicSalary * (40 / 100));
  var d_a = parseInt(CTC - (basicSalary + special_allow + hra_provided));
  var fifty_40_perc_hra = parseInt(basicSalary * (40 / 100));
  var basic_plus_Da = parseInt((basicSalary + d_a) * (10 / 100));

  var ten_perc_salary;
  if (rent_paid > basic_plus_Da) {
    ten_perc_salary = parseInt(rent_paid - basic_plus_Da);
  } else {
    ten_perc_salary = 0;
  }

  var hra_exemption = Math.min(
    hra_provided,
    fifty_40_perc_hra,
    ten_perc_salary
  );
  var taxable = parseInt(CTC) - parseInt(C80) - parseInt(stNd) - hra_exemption;
  var Appl_row1 = document.getElementById("row1_col1");
  var bal_row1 = document.getElementById("row1_col2");
  var Appl_row2 = document.getElementById("row2_col1");
  var bal_row2 = document.getElementById("row2_col2");
  var Appl_row3 = document.getElementById("row3_col1");
  var bal_row3 = document.getElementById("row3_col2");
  var Appl_row4 = document.getElementById("row4_col1");
  var Appl_row5 = document.getElementById("total");
  var tax_row2 = document.getElementById("Five%value");
  var tax_row3 = document.getElementById("Twenty%value");
  var tax_row4 = document.getElementById("Thirty%value");
  var subTotal = document.getElementById("SubtotalTax");
  var surCharge = document.getElementById("surchageTax");
  var educCess = document.getElementById("edc_cess");
  var tax87A = document.getElementById("taxRebate");
  var totalTax = document.getElementById("totalTax");
  var perMonthpay = document.getElementById("monthlyPay");

  document.getElementById("taxable").innerHTML =
    "Your Total taxable income is " + taxable;

  var Appl_row1_value;
  if (taxable > firstSlab) {
    Appl_row1_value = firstSlab;
    Appl_row1.innerHTML = Appl_row1_value;
  } else {
    Appl_row1_value = taxable;
    Appl_row1.innerHTML = Appl_row1_value;
  }

  var bal_row1_value; // not setting any value to this var and setting the value according to the conditions.
  if (taxable >= firstSlab) {
    bal_row1_value = taxable - firstSlab;
    bal_row1.innerHTML = bal_row1_value;
  } else {
    bal_row1_value = 0; // setting variable value if amount is lesser than taxable.
    bal_row1.innerHTML = bal_row1_value; // and assigning to the HTML tag (if amount is lesser than taxable.)
  }

  var Appl_row2_value;
  if (bal_row1_value >= firstSlab) {
    Appl_row2_value = firstSlab; //var Appl_row2_value; will change the value according to conditions.
    Appl_row2.innerHTML = Appl_row2_value;
  } else {
    Appl_row2_value = bal_row1_value;
    Appl_row2.innerHTML = Appl_row2_value;
  }
  // Getting balance amount in row2 col 2
  var bal_row2_value = bal_row1_value - Appl_row2_value; // saving the bal_row2 in a variable.
  bal_row2.innerHTML = bal_row2_value; // reusing the above variable in HTML tag.

  // Getting Applicable amount for 3rd slab
  var Appl_row3_value;
  if (bal_row2_value > secondSlab) {
    Appl_row3_value = secondSlab;
    Appl_row3.innerHTML = Appl_row3_value; // setting a value to DOM
  } else {
    Appl_row3_value = bal_row2_value;
    Appl_row3.innerHTML = Appl_row3_value; // setting a value to DOM
  }
  // Getting balance amount in row3 col 2
  var bal_row3_value = bal_row2_value - Appl_row3_value;
  bal_row3.innerHTML = bal_row3_value;

  var Appl_row4_value = bal_row3_value;
  Appl_row4.innerHTML = Appl_row4_value;

  Appl_row5.innerHTML =
    Appl_row1_value + Appl_row2_value + Appl_row3_value + Appl_row4_value;

  var tax_row2_value = parseInt(Appl_row2_value * (5 / 100));
  tax_row2.innerHTML = tax_row2_value;

  var tax_row3_value = parseInt(Appl_row3_value * (20 / 100));
  tax_row3.innerHTML = tax_row3_value;

  var tax_row4_value = parseInt(Appl_row4_value * (30 / 100));
  tax_row4.innerHTML = tax_row4_value;

  var subTotal_value = parseInt(
    tax_row2_value + tax_row3_value + tax_row4_value
  );
  subTotal.innerHTML = subTotal_value;

  var surCharge_value = parseInt(subTotal_value);
  if (taxable > surch && taxable < surchCr) {
    surCharge_value = parseInt(surCharge_value * (10 / 100));
    surCharge.innerHTML = surCharge_value;
  } else if (taxable < surch) {
    surCharge_value = 0;
    surCharge.innerHTML = surCharge_value;
  } else {
    surCharge_value = parseInt(surCharge_value * (15 / 100));
    surCharge.innerHTML = surCharge_value;
  }

  var educCess_value;
  if (taxable > secondSlab) {
    educCess_value = parseInt((subTotal_value + surCharge_value) * (4 / 100));
    educCess.innerHTML = educCess_value;
  } else {
    educCess_value = 0;
    educCess.innerHTML = educCess_value;
  }

  var subTotalTax = subTotal_value + surCharge_value + educCess_value;
  var tax87A_value = 0;
  if (taxable === secondSlab) {
    tax87A_value = 12500;
    tax87A.innerHTML = tax87A_value;
  } else if (taxable < secondSlab) {
    tax87A_value = subTotalTax;
    tax87A.innerHTML = tax87A_value;
  } else {
    tax87A_value = 0;
    tax87A.innerHTML = tax87A_value;
  }
  var totalTax_value = subTotalTax - tax87A_value;
  totalTax.innerHTML = totalTax_value;

  perMonthpay.innerHTML = parseInt(totalTax_value / 12);

  // For New tax slabs
  var new_Appl_row1 = document.getElementById("Appl_new_row1_col1");
  var new_bal_row1 = document.getElementById("Bal_new_row1_col2");
  var new_Appl_row2 = document.getElementById("Appl_new_row2_col1");
  var new_bal_row2 = document.getElementById("Bal_new_row2_col2");
  var new_Appl_row3 = document.getElementById("Appl_new_row3_col1");
  var new_bal_row3 = document.getElementById("Bal_new_row3_col2");
  var new_Appl_row4 = document.getElementById("Appl_new_row4_col1");
  var new_bal_row4 = document.getElementById("Bal_new_row4_col2");
  var new_Appl_row5 = document.getElementById("Appl_new_row5_col1");
  var new_bal_row5 = document.getElementById("Bal_new_row5_col2");
  var new_Appl_row6 = document.getElementById("Appl_new_row6_col1");
  var new_bal_row6 = document.getElementById("Bal_new_row6_col2");
  var new_Appl_row7 = document.getElementById("Appl_new_row7_col1");
  var new_subTotal_Appl = document.getElementById("new_taxSubApl_col1"); //
  var new_taxRow2 = document.getElementById("new_tax_5%");
  var new_taxRow3 = document.getElementById("new_tax_10%");
  var new_taxRow4 = document.getElementById("new_tax_15%");
  var new_taxRow5 = document.getElementById("new_tax_20%");
  var new_taxRow6 = document.getElementById("new_tax_25%");
  var new_taxRow7 = document.getElementById("new_tax_30%");
  var new_subTax = document.getElementById("new_subTaxrow");
  var new_surchrow = document.getElementById("new_surch");

  var new_Appl_row1_value;

  if (CTC >= firstSlab) {
    new_Appl_row1_value = firstSlab;
    new_Appl_row1.innerHTML = new_Appl_row1_value;
  } else {
    new_Appl_row1_value = CTC;
    new_Appl_row1.innerHTML = new_Appl_row1_value;
  }

  var new_bal_row1_value;
  if (CTC >= new_Appl_row1_value) {
    new_bal_row1_value = CTC - new_Appl_row1_value;
    new_bal_row1.innerHTML = new_bal_row1_value;
  } else {
    new_bal_row1_value = CTC;
    new_bal_row1.innerHTML = new_bal_row1_value;
  }

  // balaneAmt(CTC, new_bal_row1_value, new_Appl_row1_value, new_bal_row1);

  // function balaneAmt(previBal, currnetBal, applAmnt, domElmnt) {
  //   if (previBal >= applAmnt) {
  //     currnetBal = previBal - applAmnt;
  //     domElmnt.innerHTML = currnetBal;
  //   } else {
  //     currnetBal = previBal;
  //     domElmnt.innerHTML = currnetBal;
  //   }
  // }

  var new_Appl_row2_value;
  if (new_bal_row1_value >= firstSlab) {
    new_Appl_row2_value = firstSlab;
    new_Appl_row2.innerHTML = new_Appl_row2_value;
  } else {
    new_Appl_row2_value = new_bal_row1_value;
    new_Appl_row2.innerHTML = new_Appl_row2_value;
  }
  // applAmnt(new_bal_row1_value, new_Appl_row2_value, new_Appl_row2);

  // function applAmnt(previBal, currentApl, domElmnt) {
  //   if (previBal >= firstSlab) {
  //     currentApl = firstSlab;
  //     domElmnt.innerHTML = currentApl;
  //   } else {
  //     currentApl = previBal;
  //     domElmnt.innerHTML = currentApl;
  //   }
  // }

  var new_bal_row2_value;
  if (new_bal_row1_value >= firstSlab) {
    new_bal_row2_value = new_bal_row1_value - new_Appl_row2_value;
    new_bal_row2.innerHTML = new_bal_row2_value;
  } else {
    new_bal_row2_value = new_bal_row1_value;
    new_bal_row2.innerHTML = new_bal_row2_value;
  }

  var new_Appl_row3_value;
  if (new_bal_row2_value >= firstSlab) {
    new_Appl_row3_value = firstSlab;
    new_Appl_row3.innerHTML = new_Appl_row3_value;
  } else {
    new_Appl_row3_value = new_bal_row2_value;
    new_Appl_row3.innerHTML = new_Appl_row3_value;
  }

  var new_bal_row3_value;
  new_bal_row3_value = new_bal_row2_value - new_Appl_row3_value;
  new_bal_row3.innerHTML = new_bal_row3_value;

  var new_Appl_row4_value;
  if (new_bal_row3_value >= firstSlab) {
    new_Appl_row4_value = firstSlab;
    new_Appl_row4.innerHTML = new_Appl_row4_value;
  } else {
    new_Appl_row4_value = new_bal_row3_value;
    new_Appl_row4.innerHTML = new_Appl_row4_value;
  }

  var new_bal_row4_value;
  new_bal_row4_value = new_bal_row3_value - new_Appl_row4_value;
  new_bal_row4.innerHTML = new_bal_row4_value;

  var new_Appl_row5_value;
  if (new_bal_row4_value >= firstSlab) {
    new_Appl_row5_value = firstSlab;
    new_Appl_row5.innerHTML = new_Appl_row5_value;
  } else {
    new_Appl_row5_value = new_bal_row4_value;
    new_Appl_row5.innerHTML = new_Appl_row5_value;
  }

  var new_bal_row5_value;
  new_bal_row5_value = new_bal_row4_value - new_Appl_row5_value;
  new_bal_row5.innerHTML = new_bal_row5_value;

  var new_Appl_row6_value;
  if (new_bal_row5_value >= firstSlab) {
    new_Appl_row6_value = firstSlab;
    new_Appl_row6.innerHTML = new_Appl_row6_value;
  } else {
    new_Appl_row6_value = new_bal_row5_value;
    new_Appl_row6.innerHTML = new_Appl_row6_value;
  }

  var new_bal_row6_value;
  new_bal_row6_value = new_bal_row5_value - new_Appl_row6_value;
  new_bal_row6.innerHTML = new_bal_row6_value;

  var new_Appl_row7_value;
  new_Appl_row7_value = new_bal_row6_value;
  new_Appl_row7.innerHTML = new_Appl_row7_value;

  var new_subTotal_Appl_value;
  new_subTotal_Appl_value = parseInt(
    new_Appl_row1_value +
      new_Appl_row2_value +
      new_Appl_row3_value +
      new_Appl_row4_value +
      new_Appl_row5_value +
      new_Appl_row6_value +
      new_Appl_row7_value
  );
  new_subTotal_Appl.innerHTML = new_subTotal_Appl_value;

  var new_taxRow2_value;
  new_taxRow2_value = parseInt(new_Appl_row2_value * (5 / 100));
  new_taxRow2.innerHTML = new_taxRow2_value;

  var new_taxRow3_value;
  new_taxRow3_value = parseInt(new_Appl_row3_value * (10 / 100));
  new_taxRow3.innerHTML = new_taxRow3_value;

  var new_taxRow4_value;
  new_taxRow4_value = parseInt(new_Appl_row4_value * (15 / 100));
  new_taxRow4.innerHTML = new_taxRow4_value;

  var new_taxRow5_value;
  new_taxRow5_value = parseInt(new_Appl_row5_value * (20 / 100));
  new_taxRow5.innerHTML = new_taxRow5_value;

  var new_taxRow6_value;
  new_taxRow6_value = parseInt(new_Appl_row6_value * (25 / 100));
  new_taxRow6.innerHTML = new_taxRow6_value;

  var new_taxRow7_value;
  new_taxRow7_value = parseInt(new_Appl_row7_value * (30 / 100));
  new_taxRow7.innerHTML = new_taxRow7_value;

  var new_subTax_value;
  new_subTax_value = parseInt(
    new_taxRow2_value +
      new_taxRow3_value +
      new_taxRow4_value +
      new_taxRow5_value +
      new_taxRow6_value +
      new_taxRow7_value
  );
  new_subTax.innerHTML = new_subTax_value;

  var new_surchrow_value = new_subTax_value;

  if (CTC > surch && CTC < surchCr) {
    new_surchrow_value = parseInt(new_surchrow_value * (10 / 100));
    new_surchrow.innerHTML = new_surchrow_value;
  } else if (CTC < surch) {
    new_surchrow_value = 0;
    new_surchrow.innerHTML = new_surchrow_value;
  } else {
    new_surchrow_value = parseInt(new_surchrow_value * (15 / 100));
    new_surchrow.innerHTML = new_surchrow_value;
  }

  var new_cess = document.getElementById("new_tax_edu");

  var new_cess_value;
  if (CTC > 500000) {
    new_cess_value = parseInt(
      (new_subTax_value + new_surchrow_value) * (4 / 100)
    );
  } else {
    new_cess_value = 0;
  }
  new_cess.innerHTML = new_cess_value;

  var new_87A_Appl = document.getElementById("new_87Ataxcol");

  var new_87A_Appl_value = 0;
  if (CTC === secondSlab) {
    new_87A_Appl_value = 12500;
  } else if (CTC < secondSlab) {
    new_87A_Appl_value = new_subTax_value;
  } else {
    new_87A_Appl_value = 0;
  }
  new_87A_Appl.innerHTML = new_87A_Appl_value;

  var new_totalTax = document.getElementById("new_totalTaxrow");

  var new_totalTax_value;
  new_totalTax_value =
    new_subTax_value + new_surchrow_value + new_cess_value - new_87A_Appl_value;
  new_totalTax.innerHTML = new_totalTax_value;

  var new_permonthTax = document.getElementById("new_permonth");
  new_permonthTax.innerHTML = parseInt(new_totalTax_value / 12);

  document.getElementById("old_taxpayable").innerHTML =
    "Tax Payable as per Old Tax = " + totalTax_value;
  document.getElementById("new_taxpayable").innerHTML =
    "Tax Payable as per new Tax = " + new_totalTax_value;

  // var diff_tax_value;
  if (totalTax_value > new_totalTax_value) {
    document.getElementById("diff_taxpayable").innerHTML =
      " You are paying an extra tax of Rs " +
      (totalTax_value - new_totalTax_value) +
      " .It is better to admit new Tax slab ";
  } else {
    document.getElementById("diff_taxpayable").innerHTML =
      " It is better to admit old tax slab  you can Save Rs  " +
      (new_totalTax_value - totalTax_value);
  }

  document.getElementById("tax_message").classList.remove("display_none");
}
