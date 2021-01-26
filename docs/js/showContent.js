
class AnimeContent {


    fadeContent($content, span) {
        $content.animate({
            "opacity": 1
        }, span)
    }

    addClass($content){
        const addClassName = $content.attr("add");
        $content.addClass(addClassName);
    }

}



