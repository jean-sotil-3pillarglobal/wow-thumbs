

var gallery = (function(){
	core = {
		blogs : null,
		init : function (){
			this.getBlogsData();
			this.attachEvents();
		},
		attachEvents : function (){

			//Simulation ...Loading event handler 
			this.$blogsContainer = $(".blogs div#blogs__container");
			$(".mainHeader__search__box img#mainHeader__search__box__image").on("click", $.proxy(function(evt){
				if($(".mainHeader__search select#mainHeader__search__select").val() !="default"){
					this.$blogsContainer.html("<span class='blogs__container__loader'>")
					this.loadBlogs();
				}
			}, this));

			//goToTop handler
			this.$goToTop = $(".mainFooter a#mainFooter__goToTop");
			this.$goToTop.on("click", function(){
				$("html, body").animate({ scrollTop: 0 }, "slow");
			});
			$(window).scroll($.proxy(function(e){
				var win = e.currentTarget;
				if($(win).scrollTop() > 400){
					this.$goToTop.fadeIn(1000);
				}else{
					this.$goToTop.fadeOut(1000);
				}
			}, this));

			//Fadein Event
			$(window).ready(function(){
				setTimeout(function(){
					$(".mainHeader").animate({opacity:1}, "swing");
				}, 1000);
			});

		},
		getBlogsData : function (){
			//gets dummy data from ./data/data.js
			this.blogs = window.myDataBase;
		},
		loadBlogs : function (){
			var source = $("#blogTemplate").html(),
				template = Handlebars.compile(source);
			setTimeout($.proxy(function(){
				var html = "";
				$.each(this.blogs, function(i, item){
					html = html + template(item);
				});
				this.$blogsContainer.html(html);
			}, this), 2000);
		}
	}

	//return statement
	return {
		init: function(){
			core.init();
		}
	}
}());