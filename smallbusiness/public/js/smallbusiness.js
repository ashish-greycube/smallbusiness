frappe.pages['modules'].refresh = function(wrapper){
    frappe.after_ajax(()=>{
		$('.dropdown-help').hide(); // or .remove();
		$("a[data-name='Learn']").hide();
        $("div.module-section-column:contains('Help')").addClass('hide');
    });
};