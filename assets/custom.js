$(document).ready(function(){ 
  ai_ml_manage_before_after("init","#shopify-section-wbm-before-after-comparison","");
});

$(document).on("input change",".ai_ml_before_after_slider", (e)=>{
 
  const sliderPos = e.target.value;
  var parent_container=$(e.target).parents(".ai_ml_ba_comp_cnt");
  var main_column_width=$(parent_container).width();
   console.log(main_column_width);
  // Update the width of the foreground image
  $(parent_container).find('.ai_ml_comp_before_image').css('background-size', main_column_width+"px 100%");
  $(parent_container).find('.ai_ml_comp_before_image').css('width', `${sliderPos}%`)
  // Update the position of the slider button
  $(parent_container).find('.ai_ml_comp_slider_btn').css('left', `calc(${sliderPos}% - 18px)`)
});

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
}

var lastScrollTop = 0, delta = 0.0005;
$(window).scroll(function(){

  if($(document).find("#shopify-section-wbm-before-after-comparison .content-with-ba").length && isScrolledIntoView("#shopify-section-wbm-before-after-comparison .content-with-ba"))
    {
		 var nowScrollTop = $(this).scrollTop();
		 if(Math.abs(lastScrollTop - nowScrollTop) >= delta){ 
   
           var main_column_width=parseInt($(document).find(".ai_ml_ba_comp_cnt").width());
		 	if (nowScrollTop < lastScrollTop){    
                delta++;
                ai_ml_manage_before_after("up","#shopify-section-wbm-before-after-comparison",delta);
		 	} else {
                delta--; 
                ai_ml_manage_before_after("down","#shopify-section-wbm-before-after-comparison",delta);
			}
		 lastScrollTop = nowScrollTop;
		 }  
  }

});

function ai_ml_manage_before_after(action,container,count)
  {
    if(action=="init")
    {
      if($(container).length)
      {
         var main_column_width=parseInt($(document).find(container +" .ai_ml_ba_comp_cnt").width()); 
         console.log(main_column_width);
         $(container +' .ai_ml_comp_before_image').css('background-size', main_column_width+"px 100%");
      }
    }
    if(action=="up")
    {
      if($(container).length)
      {
        const sliderPos = parseInt($(document).find("#shopify-section-wbm-before-after-comparison .ai_ml_before_after_slider").val());        
        var main_column_width=parseInt($(document).find(container +" .ai_ml_ba_comp_cnt").width());        
        $(document).find(container +" #ai_ml_before_after_slider").val(sliderPos+count);
        $(document).find(container +" .ai_ml_comp_before_image").css('background-size', main_column_width+"px 100%");
        $(document).find(container +" .ai_ml_comp_before_image").css('width', `${sliderPos+count}%`);
        $(document).find(container +" .ai_ml_comp_slider_btn").css('left', `calc(${sliderPos+count}% - 18px)`);
      }
    }
    if(action=="down")
    {
      if($(container).length)
      {
        const sliderPos = parseInt($(document).find("#shopify-section-wbm-before-after-comparison .ai_ml_before_after_slider").val());       
        var main_column_width=parseInt($(document).find(container +" .ai_ml_ba_comp_cnt").width());        
        $(document).find(container +" #ai_ml_before_after_slider").val(sliderPos-count);
        $(document).find(container +" .ai_ml_comp_before_image").css('background-size', main_column_width-"px 100%");
        $(document).find(container +" .ai_ml_comp_before_image").css('width', `${sliderPos-count}%`);
        $(document).find(container +" .ai_ml_comp_slider_btn").css('left', `calc(${sliderPos-count}% + 18px)`);
      }
    }    
  }

$(document).on("click",".ai_ml_prod_single_var_cnt input", function(e){

  $(document).find(".ai_ml_prod_var_sel").removeClass("active");
  var main_index=$(document).find(".ai_ml_prod_single_var_cnt input").index(this);
  $(document).parents(".ai_ml_prod_single_var_cnt").find(".ai_ml_prod_var_sel").addClass("active");
  $(document).find("#ProductSelect-bundle-product-details option").removeAttr('selected');
  $(document).find("#ProductSelect-bundle-product-details option").eq(main_index).attr('selected', 'selected');

});

$(document).on("click",".ai_ml_prod_var_addon_sel input", function(e){

  var quantity=0;
  var url ='/cart/change.js';
  if($(this).is(":checked"))
  {
    quantity=1
    url = '/cart/add.js';
  }

var product_id=$(this).val();
      $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                data: {id:product_id,quantity:quantity},
                success: function(){
             
              
                }
            });  

 
});
$(document).on("click",".ai_ml_pd_accord_items li", function(e){

if($(this).find(".ai_ml_pd_accord_content_cnt").hasClass("ai_ml_block"))
{
  $(this).find(".ai_ml_pd_accord_content_cnt").removeClass("ai_ml_block");
  $(this).find("i").removeClass("fa-minus").addClass("fa-plus");
  
}
else
{
  $(this).find(".ai_ml_pd_accord_content_cnt").addClass("ai_ml_block");
  $(this).find("i").addClass("fa-minus").removeClass("fa-plus");
}
  
});

// highligh bundle after clicking
document.addEventListener('DOMContentLoaded', function() {
  const bundles = document.querySelectorAll('.ai_ml_prod_single_var_cnt');

  bundles.forEach(bundle => {
    bundle.addEventListener('click', () => {
      let label = bundle.querySelector('.ai_ml_prod_var_sel');

      initialState();

      bundle.classList.add('active');
      label.click();

    })
  });

  function initialState () {
    bundles.forEach(bundle => {
      bundle.classList.remove('active');
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {

  let additionalProductButton = document.querySelector('.ai_ml_addon_product_inner.ai_ml_show_in_desktop');
  let additionalProductButtonMobile = document.querySelector('.ai_ml_addon_product_inner.ai_ml_show_in_mobile');

  additionalProductButton.addEventListener('click', function(event){
    if(event.target.tagName !== "INPUT") {
      let label = additionalProductButton.querySelector('.ai_ml_prod_var_addon_sel');

      label.click();
      console.log(event.target.tagName)
    }
  })

  additionalProductButtonMobile.addEventListener('click', () => {
    let label = additionalProductButtonMobile.querySelector('.ai_ml_prod_var_addon_sel');
  
    label.click();
  });

  let bundles = document.querySelectorAll('[data-bundle-id-custom]');

  bundles.forEach(bundle => {

    bundle.addEventListener('click', () => {
      let bundleId = bundle.getAttribute("data-bundle-id-custom").trim();
      let mediaProduct = document.querySelector(`[data-media-id-custom="${bundleId}"]`);

      mediaProduct.click();
    });
  });

  let mediaProducts = document.querySelectorAll('[data-media-id-custom]');

  mediaProducts.forEach(media => {

    media.addEventListener('click', () => {
      let mediaId = media.getAttribute("data-media-id-custom").trim();
      let bundle = document.querySelector(`[data-bundle-id-custom="${mediaId}"]`);

      bundle.click();
    });
  });
});



