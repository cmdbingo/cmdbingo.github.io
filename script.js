$(document).ready(function(){
	
	var assetsPath = "assets/";
	src = assetsPath+"snd_flash64.ogg";
	src2 = assetsPath+"mission.ogg";
	createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Sound.registerSound(src);
	createjs.Sound.registerSound(src2);
	var rij1; var rij2; var rij3; var rij4; var rij5;
	if(localStorage.getItem('aantal') !== null ){
		rij1 = parseInt(localStorage.getItem('rij1'));
		rij2 = parseInt(localStorage.getItem('rij2'));
		rij3 = parseInt(localStorage.getItem('rij3'));
		rij4 = parseInt(localStorage.getItem('rij4'));
		rij5 = parseInt(localStorage.getItem('rij5'));
	} else {
		rij1 = Math.floor(Math.random()*5)+1; 
		rij2 = Math.floor(Math.random()*5)+6; 		
		rij3 = Math.floor(Math.random()*5)+11; 		
		rij4 = Math.floor(Math.random()*5)+16; 
		rij5 = Math.floor(Math.random()*5)+21;
		localStorage.setItem('aantal',0);
		localStorage.setItem('rij1', rij1);
		localStorage.setItem('rij2', rij2);
		localStorage.setItem('rij3', rij3);
		localStorage.setItem('rij4', rij4);
		localStorage.setItem('rij5', rij5);
	}

	

let bingoDataArray = [];

async function loadData() {
  try {
    const response = await fetch('woorden.txt');
     if (!response.ok) {
            throw new Error('Fout bij het laden van bestand');
     }
    const text = await response.text();
    const bingoDataArray = text.split('\n').map(woord => woord.trim().toUpperCase());

    // Gebruik de array nu de data is geladen
    gebruikArray(bingoDataArray);
  } catch (error) {
    console.error('Error loading the TXT file:', error);
  }
}

// Roep de functie aan om de data te laden
loadData();

function resizeText(element) {
    const container = element.parentElement;  // De parent container van de .woord span
    const computedStyle = window.getComputedStyle(container);  // Haal de CSS-stijlen op

    // Breedte van de container zonder padding
    const paddingLeft = parseFloat(computedStyle.paddingLeft);  // Linker padding
    const paddingRight = parseFloat(computedStyle.paddingRight);  // Rechter padding
    const containerWidth = container.clientWidth - paddingLeft - paddingRight;  // Beschikbare breedte
	
    // Hoogte van de container zonder rekening te houden met padding (als je verticale padding hebt, kun je dit ook aanpassen)
    const containerHeight = container.clientHeight;  // Je hoeft geen verticale padding af te trekken, tenzij dat specifiek is ingesteld

    let fontSize = 50;  // Start met een grote lettergrootte
    element.style.fontSize = fontSize + "px";  // Stel eerst een grote fontgrootte in

    // Verklein de fontgrootte totdat de tekst binnen de beschikbare breedte en hoogte van de container past
    while (element.scrollWidth > containerWidth || element.scrollHeight > containerHeight) {
        fontSize--;
        element.style.fontSize = fontSize + "px";
    }
}

	
function gebruikArray(bingoDataArray) {
  if (bingoDataArray.length === 0) {
        console.log("Geen woorden geladen.");
        return;
    }

  for(var i=1;i<=25;i++){
		const woord = bingoDataArray[i];
		//console.log(woord);
		switch(i){
		case rij1:
		case rij2:
		case rij3:
		case rij4:
		case rij5:
			$('#bingokaart').append('<span class="bingo-vak" id="img'+i+'"><span class="woord" style="font-size:18px">'+woord+'</span><img src="zwart.png" width="118" height="118" alt="bingo" style="display:block;"> </span>');
			break;
		default:
			$('#bingokaart').append('<span class="bingo-vak bingo" id="img'+i+'"><span class="woord" style="font-size:18px">'+woord+'</span><img src="bingo.png" width="118" height="118" alt="bingo"> </span>');
			//const woordElement = document.querySelector(`#img${i} .woord`);
			//resizeText(woordElement);
			break;
		}
		if(localStorage.getItem('img'+i)){
			$('#img'+i).children('img').css('display','block');
		}

		


	}
	for (let i = 1; i <= 25; i++) {
    	  const woordElement = document.querySelector('#img' + i + ' .woord');
 	  resizeText(woordElement);
	}

		
$('.bingo').on('click', function(){
		$(this).unbind();
		
		$(this).children('img').css('display', 'block');
		if(localStorage.getItem('aantal') == 19){
			createjs.Sound.play(src2);
		} else {
			createjs.Sound.play(src);
		}
		localStorage.setItem($(this).attr('id'),'checked');
		var tmp = parseInt(localStorage.getItem('aantal'));
		localStorage.setItem('aantal', tmp+1);	
		
	});
	$('#reset').on('click', function(){
		localStorage.clear();
		location.reload();
	})
}

});
window.addEventListener('load', () => {
    for (let i = 1; i <= 25; i++) {
        
	const woordElement = document.querySelector('#img' + i + ' .woord');

        if (woordElement) {
            resizeTextWhenReady(woordElement);
        }
    }
});
function resizeTextWhenReady(element) {
	console.log("text ready");
    requestAnimationFrame(() => {
        resizeText(element);
    });
}
function resizeText(element) {
    const container = element.parentElement;  // De parent container van de .woord span
    const computedStyle = window.getComputedStyle(container);  // Haal de CSS-stijlen op

    // Breedte van de container zonder padding
    const paddingLeft = parseFloat(computedStyle.paddingLeft);  // Linker padding
    const paddingRight = parseFloat(computedStyle.paddingRight);  // Rechter padding
    const containerWidth = container.clientWidth - paddingLeft - paddingRight;  // Beschikbare breedte
	
    // Hoogte van de container zonder rekening te houden met padding (als je verticale padding hebt, kun je dit ook aanpassen)
    const containerHeight = container.clientHeight;  // Je hoeft geen verticale padding af te trekken, tenzij dat specifiek is ingesteld

    let fontSize = 50;  // Start met een grote lettergrootte
    element.style.fontSize = fontSize + "px";  // Stel eerst een grote fontgrootte in

    // Verklein de fontgrootte totdat de tekst binnen de beschikbare breedte en hoogte van de container past
    while (element.scrollWidth > containerWidth || element.scrollHeight > containerHeight) {
        fontSize--;
        element.style.fontSize = fontSize + "px";
    }
}
