frappe.pages['business-dashboard'].on_page_load = function (wrapper) {

	frappe.require([
		"assets/smallbusiness/css/bootstrap.min.css",
		"assets/smallbusiness/css/AdminLTE.min.css",
    "assets/smallbusiness/css/_all-skins.min.css",
    "assets/smallbusiness/css/ionicons.min.css"
	], function () {
		frappe.dashboard = new frappe.Dashboard(wrapper);
	});
};


frappe.Dashboard = Class.extend({
	init: function (parent) {
		frappe.ui.make_app_page({
			parent: parent,
			title: "Dashboard",
			single_column: true
		});

		this.parent = parent;
		this.page = this.parent.page;
		this.make();
},


	make: function () {
		var me = this;

		var $container = $(`
	  <section class="content">
      <!-- Info boxes -->
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-aqua"><i class="fa fa-shopping-cart"></i></span>

            <div class="info-box-content">
            <span class="info-box-text" id="total_sales_name"></span>
            <span class="info-box-number" id="total_sales_value"></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-red"><i class="fa fa-heart"></i></span>

            <div class="info-box-content">
              <span class="info-box-text" id="total_collection_name"></span>
              <span class="info-box-number" id="total_collection_value"></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->

        <!-- fix for small devices only -->
        <div class="clearfix visible-sm-block"></div>

        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-green"><i class="fa fa-usd"></i></span>

            <div class="info-box-content">
              <span class="info-box-text" id="due_amount_name"></span>
              <span class="info-box-number" id="due_amount_value"></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-yellow"><i class="fa fa-users"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">New Members</span>
              <span class="info-box-number">2,000</span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->

      <div class="row">

      <div class="col-md-7">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title" id="profit_and_loss_chart_title"></h3>
          <div class="box-tools pull-right">
          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
          </button>
          <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
        </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body" >
          <div class="row">
            <div class="col-md-7">
              <div class="chart">
                <!-- Sales Chart Canvas -->
                <div id="profit_and_loss_chart" style="height: 400px; width: 539px;" width="539" height="400"></div>
              </div>
              <!-- /.chart-responsive -->
            </div>
          </div>          <!-- /.row -->
        </div>
      </div>
     </div>
             <div class="col-md-5">
          <!-- MAP & BOX PANE -->
          <div class="box box-success">
            <div class="box-header with-border">
              <h3 class="box-title">Top 10 Outstanding Customer</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="row">
                <div class="class="col-md-5">
                 
                  <div class="chart">
                  <!-- Sales Chart Canvas -->
                  <div id="top_10_customer_outstanding" style="height: 400px; width: 539px;" width="539" height="400"></div>
                </div>
                <!-- /.chart-responsive -->
              
                  </div>
                </div>
       
                <!-- /.col -->
              </div>
              <!-- /.row -->
            </div>
            <!-- /.box-body -->
          </div>

      </div>
      <!-- /.row -->

      <!-- Main row -->
      <div class="row">
        <!-- Left col -->

          <!-- /.box -->
          <div class="row">
            <div class="col-md-6">
              <!-- DIRECT CHAT -->

              <!--/.direct-chat -->
            </div>
            <!-- /.col -->

            <div class="col-md-6">
              <!-- USERS LIST -->

              <!--/.box -->
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->

          <!-- TABLE: LATEST ORDERS -->

          <!-- /.box -->
        </div>
        <!-- /.col -->

        <div class="col-md-4">


          <!-- /.box -->

          <!-- PRODUCT LIST -->

          <!-- /.box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
</section>`).appendTo(this.page.main);

   // generic function.. can be called with div id => function name
    me.render_widget("total_sales");
    me.render_widget("total_collection");
    me.render_widget("due_amount");
    me.render_chart("profit_and_loss_chart");
    me.render_pie_chart("top_10_customer_outstanding");

  },
  
  render_chart: function(chart_id) {
    
    frappe
      .call({
        method: "smallbusiness.small_business_app.page.business_dashboard.business_dashboard." + chart_id
      })
      .then(function(r) {
        if (!r.exc && r.message) {
          let data = r.message;
          if (data) {
            const chart = new Chart({
              parent: "#" + chart_id,
             // title: chart_id.toUpperCase(),
              type: data.type,
              data: data.data,
              colors: ['#7cd6fd','#5e64ff','#743ee2'],
              format_tooltip_x: d => (d + '').toUpperCase(),
              format_tooltip_y: d => d + ' pts'
            });
            $("#"+chart_id+"_title").html(chart_id.toUpperCase());
          }

        }
      });
  },
    
  render_pie_chart_1: function(chart_id) {
    let chart = new Chart(
      {
      parent: "#" + chart_id,
        // or DOM element
      data: {
        labels: ["12am-3am", "3am-6am", "6am-9am", "9am-12pm",
        "12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"],
  
        datasets: [
          {
            label: "Some Data", type: 'bar',
            values: [25, 40, 30, 35, 8, 52, 17, -4]
          },
          {
            label: "Another Set", type: 'bar',
            values: [25, 50, -10, 15, 18, 32, 27, 14]
          },
          {
            label: "Yet Another", type: 'line',
            values: [15, 20, -3, -15, 58, 12, -17, 37]
          }
        ],
  
        yMarkers: [{ label: "Marker", value: 70 }],
        yRegions: [{ label: "Region", start: -10, end: 50 }]
      },
  
      title: "My Awesome Chart",
      type: 'pie', // or 'bar', 'line', 'pie', 'percentage'
      height: 250,
      colors: ['purple', '#ffa3ef', 'red']
    });
    console.log(chart.data)
  },

  render_pie_chart: function(chart_id) {
    
    frappe
      .call({
        method: "erpnext.utilities.page.leaderboard.leaderboard.get_leaderboard",
        args: {
          doctype: "Customer",
          timespan: "Year",
          company: frappe.defaults.get_default('company'),
          field: "outstanding_amount",
        }
      })
      .then(function(r) {
        let results = r.message || [];
        let graph_items = results.slice(0, 5);

        let args = {
        parent: "#" + chart_id,
        data: {
          datasets: [
            {
              values:graph_items.map(d=>d.value) ,
              //type:'pie',
              label: graph_items.map(d=>d.name) 
            }
          ],
          labels: graph_items.map(d=>d.name)
        },
        format_tooltip_x: d=>d["outstanding_amount"],
        type: 'line', // or 'bar', 'line', 'pie', 'percentage'
       // height: 250,
        colors: ['purple', '#ffa3ef', 'red'],
        //maxLegendPoints: 5,    // default: 20
        //maxSlices: 5,         // default: 20
        lineOptions: {
          dotSize: 50,          // default: 4
          hideLine: 0,         // default: 0
          hideDots: 0,         // default: 0
          heatline: 10,         // default: 0
          regionFill: 10        // default: 0
        }
      };
      //graph_items.map(d=>d.name)
      //graph_items.map(d=>d.name)
      //
      //args.data=[300, 210, 500, 375];
      const chart =new Chart(args);
      console.log(args.data)

      });
    },
	render_widget(function_name) {
		var me = this;

		frappe.call({
			method: "smallbusiness.small_business_app.page.business_dashboard.business_dashboard."+function_name,
      })
      .then(function(r) {
        if (!r.exc && r.message) {
          let data = r.message;
          if (data) {
            $("#"+function_name+"_name").html(data[0]);
            $("#"+function_name+"_value").html(data[1]);
          }
        }
      });
	}
});

