# Copyright (c) 2017, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals, print_function
import frappe
import erpnext
from frappe.utils import add_to_date
from frappe.utils import flt, today
from erpnext.utilities.page.leaderboard.leaderboard import get_leaderboard
from erpnext.accounts.utils import get_fiscal_year, now
import datetime

@frappe.whitelist()
def total_collection():
	company = erpnext.get_default_company()
	start_date = frappe.db.sql("""select min(posting_date) from `tabSales Invoice` where company = %s""", (company))[0][0] or today()
	end_date = today()
	custom_filter = {'from_date': start_date,'to_date': end_date,'company': company}
	report = frappe.get_doc('Report', "Sales Payment Summary") 
	columns, data = report.get_data(filters = custom_filter, as_dict=True)
	sales_abbr="Sales - {}".format(frappe.db.get_value('Company', company, 'abbr'))	
	list_of_total_payments = [i["Payments"] for i in data if "Payments" in i]
	return 'Total Collection',list_of_total_payments[-1]

@frappe.whitelist()
def profit_and_loss_chart():
	company = erpnext.get_default_company()
	# custom_filter = {"company":company ,"from_fiscal_year": 2018 ,'to_fiscal_year': 2018 ,'periodicity':"Yearly",'accumulated_values':0}

	filters = frappe._dict()
	#filters.from_fiscal_year=datetime.datetime.today().year
	filters.from_fiscal_year = frappe.db.sql("""select YEAR(min(posting_date)) from `tabSales Invoice` where company = %s""", (company))[0][0] or today()
	filters.to_fiscal_year=datetime.datetime.today().year
	filters.periodicity="Yearly"
	filters.company=company
	filters.accumulated_values=0
	
	# return custom_filter
	# report = frappe.get_doc('Report', "Profit and Loss Statement") 
	
	from erpnext.accounts.report.profit_and_loss_statement.profit_and_loss_statement import execute
	a,b,c,chart=execute(filters)
	return chart
	


@frappe.whitelist()
def total_sales():
	company = erpnext.get_default_company()
	start_date = frappe.db.sql("""select min(posting_date) from `tabSales Invoice` where company = %s""", (company))[0][0] or today()
	custom_filter = {'from_date': start_date ,'to_date': today(),'company': company}
	report = frappe.get_doc('Report', "Sales Register") 
	columns, data = report.get_data(filters = custom_filter, as_dict=True)
	sales_abbr="Sales - {}".format(frappe.db.get_value('Company', company, 'abbr'))	
	list_of_total_sales = [i[sales_abbr] for i in data if sales_abbr in i]
	return 'Total Sales',list_of_total_sales[-1]

@frappe.whitelist()
def due_amount():
	company = erpnext.get_default_company()
	start_date = frappe.db.sql("""select min(posting_date) from `tabSales Invoice` where company = %s""", (company))[0][0] or today()
	custom_filter = {'from_date': start_date ,'to_date': today(),'company': company}
	report = frappe.get_doc('Report', "Sales Register") 
	columns, data = report.get_data(filters = custom_filter, as_dict=True)
	sales_abbr="Sales - {}".format(frappe.db.get_value('Company', company, 'abbr'))	
	list_of_total_outstanding_amount = [i["Outstanding Amount"] for i in data if "Outstanding Amount" in i]
	print(data)
	return 'Due Amount',list_of_total_outstanding_amount[-1]

@frappe.whitelist()
def top_moving_items():
	company = erpnext.get_default_company()
	records = get_leaderboard("Item","Year",company, "total_sales_amount")
	frappe.msgprint(records)