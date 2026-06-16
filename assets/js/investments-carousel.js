const slider = document.getElementById("slider");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const cards = [...slider.children];

const gap = 30;
const cardWidth = cards[0].offsetWidth + gap;
const total = cards.length;


// duplicar al inicio
cards.forEach(card => {
    slider.insertBefore(
        card.cloneNode(true),
        slider.firstChild
    );
});


// duplicar al final
cards.forEach(card => {
    slider.appendChild(
        card.cloneNode(true)
    );
});


// comenzar en el bloque real (centro)
slider.scrollLeft = total * cardWidth;


function move(direction){

    slider.scrollBy({
        left: direction * cardWidth,
        behavior:"smooth"
    });

}


nextBtn.addEventListener(
    "click",
    ()=>move(1)
);

prevBtn.addEventListener(
    "click",
    ()=>move(-1)
);



let timeout;

slider.addEventListener("scroll",()=>{

    clearTimeout(timeout);

    timeout = setTimeout(()=>{

        const leftBoundary =
        total * cardWidth;

        const rightBoundary =
        total * cardWidth * 2;


        // llegó al bloque izquierdo
        if(
            slider.scrollLeft <
            leftBoundary
        ){

            slider.style.scrollBehavior="auto";

            slider.scrollLeft +=
            total * cardWidth;

            slider.style.scrollBehavior="smooth";
        }


        // llegó al bloque derecho
        if(
            slider.scrollLeft >=
            rightBoundary
        ){

            slider.style.scrollBehavior="auto";

            slider.scrollLeft -=
            total * cardWidth;

            slider.style.scrollBehavior="smooth";
        }

    },100);

});