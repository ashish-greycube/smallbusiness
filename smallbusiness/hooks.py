# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "smallbusiness"
app_title = "Small Business App"
app_publisher = "GreyCube Technologies"
app_description = "It is scale down version of erpnext for small business"
app_icon = "octicon octicon-squirrel"
app_color = "#2defbb"
app_email = "admin@greycube.in"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/smallbusiness/css/smallbusiness.css"
app_include_css = [
    "/assets/smallbusiness/css/bdtheme.css",
    "/assets/smallbusiness/css/skin-blue.css",
    "/assets/smallbusiness/css/custom.css",
    "/assets/bsmallbusinessdtheme/css/temp.css",
]
#app_include_css = "/assets/ni_dark_theme/css/ni.dark.theme.css"
#app_include_js = ["/assets/smallbusiness/js/smallbusiness.js"]
app_include_js = [
    "/assets/smallbusiness/js/smallbusiness.js",
    "/assets/smallbusiness/js/bdtheme.js",
    "/assets/smallbusiness/js/custom.js",
    "/assets/js/bdtheme-template.min.js",
]
# include js, css files in header of web template
# web_include_css = "/assets/smallbusiness/css/smallbusiness.css"
web_include_css = "/assets/smallbusiness/css/bdtheme-web.css"
# web_include_js = "/assets/smallbusiness/js/smallbusiness.js"

# include js in page
page_js = {"modules" : "public/js/smallbusiness.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------
website_context = {
	"favicon": 	"/assets/smallbusiness/images/favicon.png",
	"splash_image": "/assets/smallbusiness/images/icon.png"
}
# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "smallbusiness.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

before_install = "smallbusiness.install.before_install"
#after_install = "smallbusiness.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "smallbusiness.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"smallbusiness.tasks.all"
# 	],
# 	"daily": [
# 		"smallbusiness.tasks.daily"
# 	],
# 	"hourly": [
# 		"smallbusiness.tasks.hourly"
# 	],
# 	"weekly": [
# 		"smallbusiness.tasks.weekly"
# 	]
# 	"monthly": [
# 		"smallbusiness.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "smallbusiness.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "smallbusiness.event.get_events"
# }
fixtures = [{
	"doctype": "DocType",
            "filters": { "custom" : ["=", "1"] }
           }, 
    	"Custom Field",
    	"Custom Script",
    	"Property Setter",
            "Print Format"
       ]
