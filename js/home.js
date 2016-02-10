if (!blogs.gallery) blogs.gallery = {};

blogs.gallery = {
	blogs : null,
	init : function (){
		this.getBlogsData();
		this.attachEvents();
	},
	attachEvents : function (){
		$("#input-holder img").on("click", $.proxy(function(evt){
			if($("#search-box .search-comboBox").val() !="default"){
				$("#blogs-container").html("<span class='loader'>")
				this.loadBlogs();
			}
		}, this));

		$("a#go-to-top").on("click", function(){
			$("html, body").animate({ scrollTop: 0 }, "slow");
		});

		$(window).ready(function(){
			setTimeout(function(){
				$("header#main-subnav").animate({opacity:1}, "swing");
			}, 1000);
		});

		$(window).scroll($.proxy(function(e){
			var win = e.currentTarget;
			if($(win).scrollTop() > 400){
				$("a#go-to-top").fadeIn(1000);
			}else{
				$("a#go-to-top").fadeOut(1000);
			}
		}, this));
	},
	getBlogsData : function (){
		this.blogs = window.myDataBase;
	},
	loadBlogs : function (){
		var source = $("#blog-template").html(),
			template = Handlebars.compile(source);
		setTimeout($.proxy(function(){
			var html = "";
			$.each(this.blogs, function(i, item){
				html = html + template(item);
			});
			$("#blogs-container").html(html);
		}, this), 2000);
	}
};